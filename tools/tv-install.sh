#!/usr/bin/env bash
# Docker-only signing/deployment. Never run with bash -x: signing is interactive.
set -euo pipefail
umask 077

repo=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
cd -- "$repo"
image=${TV_INSTALL_IMAGE:-ghcr.io/shaka-project/tizen-studio@sha256:de88809d211fe1a2299e2f67b902620bc5db914f55af6428ead0c56518f9e7bf}
container=${TV_CERT_CONTAINER:-cleanyourtv-certificates}
profile=${TV_CERT_PROFILE:-CleanHubTV-Samsung}
docker_cmd=(docker)
die() { printf 'Error: %s\n' "$*" >&2; exit 1; }
phase() { printf '\n=== %s ===\n\n' "$1"; }
usage() {
    cat <<'EOF'
Usage: tools/tv-install.sh doctor|deploy TV_IP

doctor  Check Docker, certificate profile, original SDK tools and TV connection.
deploy  Probe, back up, build, sign interactively, install and verify registration.

Requires the one-time certificate setup in docs/DOCKER_INSTALL.md.
Overrides: TV_INSTALL_IMAGE, TV_CERT_CONTAINER, TV_CERT_PROFILE.
EOF
}
[[ $# == 1 && ($1 == --help || $1 == -h) ]] && { usage; exit 0; }
[[ $# == 2 ]] || { usage >&2; exit 2; }
action=$1
ip=$2
[[ $action == doctor || $action == deploy ]] || die 'Unknown command.'
command -v python3 >/dev/null || die 'python3 is required.'
command -v docker >/dev/null || die 'Docker is required.'
python3 - "$ip" <<'PY'
import ipaddress, sys
ipaddress.ip_address(sys.argv[1])
PY
serial="$ip:26101"
phase 'Check Docker and certificate tools'
if ! docker info >/dev/null 2>&1; then
    command -v sudo >/dev/null || die 'Docker is unavailable and sudo is not installed.'
    docker_cmd=(sudo docker)
    "${docker_cmd[@]}" info >/dev/null || die 'Cannot access the Docker daemon.'
fi
[[ $("${docker_cmd[@]}" inspect --format '{{.State.Running}}' "$container") == true ]] ||
    die "Start the certificate container: docker start $container"
"${docker_cmd[@]}" exec "$container" sh -c 'tizen version && command -v python3 && command -v unzip'
"${docker_cmd[@]}" exec -i "$container" python3 - "$profile" <<'PY'
import os, sys, xml.etree.ElementTree as ET
root = ET.parse('/home/tizen/tizen-studio-data/profile/profiles.xml').getroot()
profiles = [p for p in root.findall('profile') if p.get('name') == sys.argv[1]]
if len(profiles) != 1:
    sys.exit('Certificate profile missing; see docs/DOCKER_INSTALL.md.')
items = [p for p in profiles[0].findall('profileitem') if p.get('key')]
if len(items) != 2 or any(not os.path.isfile(p.get('key')) for p in items):
    sys.exit('Expected existing author and distributor certificate files.')
if any('/SamsungCertificate/' not in p.get('key') for p in items):
    sys.exit('Expected your Samsung certificates, not the bundled sample certificates.')
print('Samsung profile and certificate files found (passwords and DUID not validated).')
PY
"${docker_cmd[@]}" run --rm "$image" sh -c 'sdb version && tizen version'
phase 'Probe TV and verify SDB connection'
python3 ./tools/samsung_tv.py --probe "$ip"
# The existing probe reports failures but exits zero; enforce SDB reachability.
python3 - "$ip" <<'PY'
import socket, sys
with socket.create_connection((sys.argv[1], 26101), timeout=5):
    pass
PY
connect_script='sdb connect "$1" >&2; sdb devices | grep -F "$1" | grep -q "[[:space:]]device[[:space:]]"'
"${docker_cmd[@]}" run --rm "$image" sh -c "$connect_script" check-tv "$serial"
if [[ $action == doctor ]]; then
    printf '\nDoctor checks passed. Certificate passwords, DUID authorization and app runtime remain untested.\n'
    exit 0
fi
[[ -t 0 && -t 1 ]] || die 'Deploy requires an interactive terminal for certificate passwords.'
work=$(mktemp -d)
remote_work=''
cleanup() {
    if [[ $remote_work == /tmp/cleanhub-deploy.* ]]; then
        "${docker_cmd[@]}" exec "$container" rm -rf -- "$remote_work" >/dev/null 2>&1 || true
    fi
    rm -rf -- "$work"
}
trap cleanup EXIT

# Run the repository backup before any deployment. Require a fresh device profile,
# and back up the full app list via SDB because many TVs reject the REST app-list API.
phase 'Back up device information and installed apps'
mkdir -p ./backups
backup_dir=$(mktemp -d "./backups/samsung_${ip}_$(date +%Y%m%d_%H%M%S).XXXXXXXX")
python3 ./tools/backup.py "$ip" --output-dir "$backup_dir" --device-only ||
    die 'Device backup failed; deployment stopped.'
test -s "$backup_dir/device_info.json" || die 'Device backup missing; deployment stopped.'
"${docker_cmd[@]}" run --rm "$image" sh -c '
    sdb connect "$1" >&2
    sdb -s "$1" shell 0 applist
' backup-apps "$serial" > "$backup_dir/installed-apps.txt"
grep -q 'Application List' "$backup_dir/installed-apps.txt" || die 'App-list backup failed; deployment stopped.'
printf 'Backup complete (device info + full SDB app list): %s\n' "$backup_dir"
phase 'Build unsigned widget'
python3 ./tools/package_wgt.py --output "$work/unsigned.wgt"
phase 'Sign widget with Samsung certificates'
remote_work=$("${docker_cmd[@]}" exec "$container" mktemp -d /tmp/cleanhub-deploy.XXXXXXXX)
[[ $remote_work == /tmp/cleanhub-deploy.* && $remote_work != *$'\n'* ]] || die 'Invalid container temporary path.'
# Stream as the container user: sudo docker cp would create a root-owned 0600
# file that the non-root signer cannot read.
"${docker_cmd[@]}" exec -i "$container" sh -c 'umask 077; cat > "$1/input.wgt"' \
    receive-widget "$remote_work" < "$work/unsigned.wgt"
# Empty saved password fields in this profile only. The GUI/CLI keyring storage in
# this image can cause silent "Invaild password" failures. Never print their values.
"${docker_cmd[@]}" exec -i "$container" python3 - "$profile" <<'PY'
import os, sys, xml.etree.ElementTree as ET
path = '/home/tizen/tizen-studio-data/profile/profiles.xml'
tree = ET.parse(path)
for profile in tree.getroot().findall('profile'):
    if profile.get('name') == sys.argv[1]:
        for item in profile.findall('profileitem'):
            item.set('password', '')
os.chmod(path, 0o600)
tree.write(path, encoding='UTF-8', xml_declaration=True)
PY
printf 'Enter your certificate passwords when prompted. Choose Y when asked to save them.\n'
printf 'Saved profile password fields are cleared before each deployment.\n'
if ! "${docker_cmd[@]}" exec -it "$container" sh -c '
    set -eu
    mkdir "$1/input" "$1/signed"
    cp "$1/input.wgt" "$1/input/app.wgt"
    tizen cli-config "profiles.path=/home/tizen/tizen-studio-data/profile/profiles.xml"
    tizen package -t wgt -s "$2" -o "$1/signed" -- "$1/input/app.wgt"
    if ! test -s "$1/signed/app.wgt"; then
        echo "The Tizen CLI returned without creating a signed widget." >&2
        exit 1
    fi
' sign-widget "$remote_work" "$profile"; then
    die "Signing failed; nothing installed. Inspect /home/tizen/tizen-studio-data/cli/logs/cli.log inside $container (logs may contain secrets)."
fi
phase 'Verify signed widget and save artifact'
"${docker_cmd[@]}" exec "$container" cat "$remote_work/signed/app.wgt" > "$work/signed.wgt"
app_id=$(python3 - "$work/unsigned.wgt" "$work/signed.wgt" <<'PY'
import sys, xml.etree.ElementTree as ET, zipfile
with zipfile.ZipFile(sys.argv[1]) as unsigned, zipfile.ZipFile(sys.argv[2]) as signed:
    if signed.testzip() or not {'author-signature.xml', 'signature1.xml'} <= set(signed.namelist()):
        sys.exit('Signing produced an invalid archive or missing signatures.')
    # Confirm this is the newly built payload, not an older signed artifact.
    for name in unsigned.namelist():
        if name == 'config.xml':
            if ET.tostring(ET.fromstring(unsigned.read(name))) != ET.tostring(ET.fromstring(signed.read(name))):
                sys.exit('Signed manifest does not match this build.')
        elif unsigned.read(name) != signed.read(name):
            sys.exit('Signed payload differs from this build: ' + name)
    root = ET.fromstring(signed.read('config.xml'))
    app = root.find('{http://tizen.org/ns/widgets}application')
    if app is None or not app.get('id'):
        sys.exit('Signed widget has no Tizen application ID.')
    print(app.get('id'))
PY
)
# Replace the directory entry rather than opening an older sudo-owned file.
# Stage on the same filesystem so replacement is atomic and needs no sudo.
python3 - "$work/signed.wgt" <<'PY'
import os, shutil, sys, tempfile
fd, staging = tempfile.mkstemp(prefix='.cleanhub-signed-', suffix='.wgt', dir='.')
try:
    with os.fdopen(fd, 'wb') as output, open(sys.argv[1], 'rb') as source:
        shutil.copyfileobj(source, output)
    os.replace(staging, 'cleanhub-tv-samsung-signed.wgt')
finally:
    if os.path.exists(staging):
        os.unlink(staging)
PY
printf 'Saved ./cleanhub-tv-samsung-signed.wgt\n'
# The non-root installation container may have a different UID from the host.
# The containing host temporary directory remains private (0700).
chmod 0444 "$work/signed.wgt"
phase 'Install signed widget on TV'
"${docker_cmd[@]}" run --rm -v "$work/signed.wgt:/workspace/app.wgt:ro" "$image" sh -c '
    set -eu
    package_dir=$(mktemp -d)
    trap '\''rm -rf "$package_dir"'\'' EXIT
    cp /workspace/app.wgt "$package_dir/app.wgt"
    sdb connect "$1"
    sdb devices | grep -F "$1" | grep -q "[[:space:]]device[[:space:]]"
    tizen install -s "$1" -n app.wgt -- "$package_dir"
    printf "\n=== Verify installed app ===\n\n"
    sdb -s "$1" shell 0 applist > "$package_dir/apps.txt"
    grep -F "$2" "$package_dir/apps.txt"
' install-widget "$serial" "$app_id" | tee "$backup_dir/install.log"
grep -Fq 'Tizen application is successfully installed.' "$backup_dir/install.log" || die 'TV did not confirm installation.'
grep -Fq "'$app_id'" "$backup_dir/install.log" || die 'App was not found in the installed-app list.'
printf '\nInstalled and registered %s.\n' "$app_id"
printf 'Backup and installation log: %s\n' "$backup_dir"
printf 'Open CleanHub TV in My Apps to verify runtime behavior.\n'
