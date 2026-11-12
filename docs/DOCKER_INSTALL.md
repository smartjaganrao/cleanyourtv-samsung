# Build, sign and install with Docker

No Tizen SDK is installed on the host. You need Bash, Python 3, Docker, a Samsung
account, and a TV in Developer Mode on your LAN. The desktop enrollment steps
below were exercised on Linux Mint with X11 and a Samsung QE55QN95BATXXU.
Wayland, macOS, Windows and ARM hosts are not validated by this guide.

Set Developer Mode's Host PC IP to your computer's LAN address, then restart the
TV. On Linux, `ip route get <TV_IP>` shows the address after `src`.

## Repeatable deployment

After the one-time setup below, from the repository root:

```bash
./tools/tv-install.sh doctor 192.168.0.130
./tools/tv-install.sh deploy 192.168.0.130
```

The script uses Docker directly where permitted, otherwise sudo. `doctor` checks
the container, certificate paths, SDK tools, TV probe and SDB connection; it does
not validate passwords, certificate expiration or the distributor's DUID.

`deploy` requires an interactive terminal. It runs the repository probe and
backup tools, requires a fresh device backup, and saves an SDB app-list backup
before changing the TV. Both are stored in one timestamped directory under
`./backups/`; deployment skips the unsupported REST app-list endpoint and uses
SDB directly. Installation output is retained there as `install.log`, while the
terminal shows only the matching application entry instead of the full app list.
These are device metadata backups, not firmware or a
complete restore image. Failed backups stop deployment.

It builds into temporary storage, signs using your Samsung profile, checks archive
integrity, signature-file presence and payload identity, then installs and checks
registration. Structural checks do not independently validate the cryptographic
signatures: the TV performs certificate validation. A zero CLI exit status alone
is insufficient; the Tizen CLI can fail silently. Unique temporary output prevents
an old signed package from being mistaken for the current build.

Enter certificate passwords at the prompts and choose **Y** when asked to save
them. This is the choice that succeeded in the tested container; choosing **N**
was followed by another `Invaild password` failure. The script clears saved
password fields in the selected profile before
signing, because this container's password storage caused silent `Invaild password`
errors. It never asks for your Samsung account password itself. Do not run it with
shell tracing. The verified signed artifact is saved as
`cleanhub-tv-samsung-signed.wgt` (ignored by Git).
The save question controls reuse by future signing commands, not certificate
creation or password changes. Our workflow deliberately prompts on each deploy;
the use of **Y** is a tested workaround, not a general Samsung requirement.
The script resolves its checkout from its own location and uses repository-relative
paths, so no user-specific checkout path is configured. Artifact replacement is
atomic, including when an older artifact was created by `sudo docker cp` and is
not writable by your user (the repository directory must be writable).

The installation image is pinned to the Shaka image digest tested during setup.
It is third-party software, not a Samsung-published image. The signing container
uses the persistent updated SDK; installation uses the original image without that
volume because SDK updates installed an SDB requiring GLIBC_2.28, unavailable in
the Ubuntu 18.04 base. Do not mount the updated SDK volume into the installation
container or try to replace system glibc.

Overrides: `TV_CERT_CONTAINER` (default `cleanyourtv-certificates`),
`TV_CERT_PROFILE` (default `CleanHubTV-Samsung`), and `TV_INSTALL_IMAGE`.

## One-time certificate setup

Keep certificates private and preserve the author certificate for app updates.
Do not commit `.p12` files, profile XML, passwords, cookies or SDK logs. The named
volume contains credentials; the container layer contains installed Linux packages.
Retain both. Avoid `docker volume rm` or `docker system prune --volumes` for this
volume. Back it up securely before deleting or recreating your environment.

### Create the certificate container

On the host:

```bash
sudo docker run -it --name cleanyourtv-certificates \
  -e DISPLAY="$DISPLAY" \
  -v /tmp/.X11-unix:/tmp/.X11-unix:ro \
  -v cleanyourtv-shaka-home:/home/tizen \
  ghcr.io/shaka-project/tizen-studio@sha256:de88809d211fe1a2299e2f67b902620bc5db914f55af6428ead0c56518f9e7bf \
  bash
```

Inside the container:

```bash
sudo apt-get update
sudo apt-get install -y pciutils libkf5itemmodels5 libkf5kiowidgets5 libkchart2 \
  xauth xdg-utils firefox
~/tizen-studio/package-manager/package-manager-cli.bin \
  --no-java-check --accept-license install Certificate-Manager cert-add-on
```

This accepts the SDK package licenses. `pciutils` supplies `lspci`. Both certificate
packages should show `i` in `package-manager-cli.bin --no-java-check show-pkgs`.
Do not use `--rm`: the container's Linux dependencies must persist too.

### Open Certificate Manager

In a separate host terminal with `xauth` installed:

```bash
xauth nlist "$DISPLAY" | sed 's/^..../ffff/' |
  sudo docker exec -i cleanyourtv-certificates \
    sh -c 'umask 077; xauth -f /home/tizen/.Xauthority nmerge -'
```

This grants the container access to your current X11 desktop. Do not use
`xhost +`. A first-run message that `.Xauthority` does not exist is normal if the
cookie is then imported. If the desktop session changes, refresh authorization.

Inside the container:

```bash
export XAUTHORITY=/home/tizen/.Xauthority
~/tizen-studio/tools/certificate-manager/certificate-manager
```

Choose **+ → Samsung → TV**, create a profile named **CleanHubTV**, and create an author certificate.
Complete Samsung login in the container's Firefox browser. Record the certificate
password privately. If login fails with `Address already in use`, close Certificate
Manager completely and reopen it before retrying.

Create a **Public** distributor certificate and include your TV's DUID. Retrieve
the DUID from the host using the original image's compatible SDB:

```bash
sudo docker run --rm ghcr.io/shaka-project/tizen-studio \
  sh -c 'sdb connect "$1" && sdb -s "$1" shell 0 getduid' \
  read-duid 192.168.0.130:26101
```

Add the returned identifier manually. It is not the TV IP, MAC or REST UUID.
Record the distributor certificate password separately; do not assume it matches
the author password or your Samsung account password.

### Register a CLI signing profile

Inside the container's Bash terminal, run each `read` command separately and type
the password before pasting the next command. Pasting subsequent commands into an
active password prompt can consume them as the password.

```bash
read -r -s -p "Author certificate password: " author_password; echo
```

```bash
read -r -s -p "Distributor certificate password: " distributor_password; echo
```

Then run (adjust certificate paths if you chose another GUI profile name):

```bash
tizen security-profiles add -n CleanHubTV-Samsung -A \
  -a /home/tizen/SamsungCertificate/CleanHubTV/author.p12 -p "$author_password" \
  -d /home/tizen/SamsungCertificate/CleanHubTV/distributor.p12 -dp "$distributor_password"
unset author_password distributor_password
tizen cli-config "profiles.path=/home/tizen/tizen-studio-data/profile/profiles.xml"
```

Variable expansion keeps passwords out of shell history, but CLI arguments can be
visible to processes with sufficient access. Use this on your own trusted machine.
`deploy` uses interactive signing instead. Never use the image's bundled `author`
profile to sign for your TV.

For later sessions, start the retained container with
`sudo docker start cleanyourtv-certificates`, then use `doctor` and `deploy`.

## Confirm success and troubleshoot

Installation must report `Tizen application is successfully installed.` and show
the application ID in `applist`. Open **Home → Apps → My Apps → CleanHub TV**.
Registration does not prove every launcher feature works.

- Connection failure: TV on, current IP, Developer Mode Host PC IP, reboot, firewall.
- `Load archive info fail`: verify the widget manifest; the repository manifest
  correction supplies the Tizen widget namespace, application version and TV profile.
- `ConfigXMLUtil.getAppID` exception: install from writable container temporary
  storage, not directly beside a read-only mount. The script handles this.
- Certificate error: check expiration and TV DUID registration in the Samsung profile.
- Silent signing failure: inspect CLI logs privately for `Invaild password`; do not
  trust exit status zero or reuse an old output. The script requires fresh output.

Official certificate enrollment reference:
https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/creating-certificates.html
