"""Exercise Docker orchestration without contacting a TV or invoking real Docker."""
import importlib.util
import os
from pathlib import Path
import pty
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]

DOCKER = r'''
import os, pathlib, shutil, sys, tempfile, zipfile
args = sys.argv[1:]
with open(os.environ['DOCKER_CALLS'], 'a') as log:
    log.write(repr(args) + '\n')
if args[0] == 'info':
    pass
elif args[0] == 'inspect':
    print('true')
elif args[0] == 'cp':
    src, dst = args[1:]
    src = src.split(':', 1)[-1] if src.startswith('cleanyourtv-certificates:') else src
    dst = dst.split(':', 1)[-1] if dst.startswith('cleanyourtv-certificates:') else dst
    shutil.copyfile(src, dst)
elif args[0] == 'exec':
    if 'receive-widget' in args:
        (pathlib.Path(args[-1])/'input.wgt').write_bytes(sys.stdin.buffer.read())
    elif 'cat' in args:
        sys.stdout.buffer.write(pathlib.Path(args[-1]).read_bytes())
    elif '-i' in args:
        sys.stdin.read()  # Certificate inspection/profile password reset: no secrets needed.
    elif 'mktemp' in args:
        print(tempfile.mkdtemp(prefix='cleanhub-deploy.'))
    elif 'rm' in args:
        shutil.rmtree(args[-1])
    elif 'sign-widget' in args:
        work = pathlib.Path(args[-2])
        if os.environ.get('FAIL_SIGN'):
            sys.exit(1)  # The script's test -s rejects a silent signer.
        (work/'signed').mkdir()
        with zipfile.ZipFile(work/'input.wgt') as src:
            with zipfile.ZipFile(work/'signed/app.wgt', 'w') as dst:
                for name in src.namelist():
                    payload = b'old payload' if os.environ.get('WRONG_PAYLOAD') and name == 'index.html' else src.read(name)
                    dst.writestr(name, payload)
                if not os.environ.get('MISSING_SIGNATURES'):
                    dst.writestr('author-signature.xml', '<signature/>')
                    dst.writestr('signature1.xml', '<signature/>')
    else:
        print('Tizen CLI fixture')
elif args[0] == 'run':
    if 'backup-apps' in args:
        print('Application List for user 5001')
    elif 'install-widget' in args:
        if not os.environ.get('FAIL_INSTALL'):
            print('Tizen application is successfully installed.')
        if not os.environ.get('MISSING_REGISTRATION'):
            print("'CleanHub TV' 'VIBEHACK01.CleanYourTV'")
    else:
        print('SDK and SDB fixture')
else:
    sys.exit('Unexpected Docker invocation')
'''

PYTHON = r'''
import json, os, pathlib, sys
args = sys.argv[1:]
if args and args[0].endswith('/tools/samsung_tv.py'):
    print('Probe fixture')
elif args and args[0].endswith('/tools/backup.py'):
    folder = pathlib.Path(args[args.index('--output-dir')+1])
    folder.mkdir(parents=True, exist_ok=True)
    if not os.environ.get('FAIL_BACKUP'):
        (folder/'device_info.json').write_text('{}')
elif args and args[0] == '-':
    source = sys.stdin.read()
    if 'socket.create_connection' not in source:
        sys.argv = ['-'] + args[1:]
        exec(compile(source, '<script>', 'exec'), {'__name__': '__main__'})
else:
    os.execv(os.environ['REAL_PYTHON'], [os.environ['REAL_PYTHON']] + args)
'''


class DockerInstallTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name)/'checkout with spaces'
        (self.repo/'tools').mkdir(parents=True)
        (self.repo/'launcher').mkdir()
        for file in ('tv-install.sh', 'package_wgt.py'):
            shutil.copyfile(ROOT/'tools'/file, self.repo/'tools'/file)
        (self.repo/'launcher/config.xml').write_text(
            '<widget xmlns="http://www.w3.org/ns/widgets" '
            'xmlns:tizen="http://tizen.org/ns/widgets">'
            '<tizen:application id="VIBEHACK01.CleanYourTV"/></widget>')
        (self.repo/'launcher/index.html').write_text('<p>fixture</p>')
        self.bin = Path(self.temp.name)/'bin'
        self.bin.mkdir()
        for name, script in (('docker', DOCKER), ('python3', PYTHON)):
            file = self.bin/name
            file.write_text('#!'+sys.executable+'\n'+script)
            file.chmod(0o755)
        self.calls = Path(self.temp.name)/'docker-calls'
        self.env = dict(os.environ, PATH=str(self.bin)+':'+os.environ['PATH'],
                        DOCKER_CALLS=str(self.calls), REAL_PYTHON=sys.executable)

    def run_script(self, command, **overrides):
        primary, secondary = pty.openpty()
        try:
            return subprocess.run(
                ['bash', str(self.repo/'tools/tv-install.sh'), command, '192.0.2.1'],
                stdin=secondary, stdout=secondary, stderr=secondary,
                env=dict(self.env, **overrides), timeout=20).returncode
        finally:
            os.close(primary)
            os.close(secondary)

    def test_doctor_does_not_install_or_change_passwords(self):
        self.assertEqual(self.run_script('doctor'), 0)
        self.assertNotIn('install-widget', self.calls.read_text())
        self.assertNotIn('sign-widget', self.calls.read_text())

    def test_deploy_builds_signs_and_checks_registration(self):
        self.assertEqual(self.run_script('deploy'), 0)
        self.assertTrue((self.repo/'cleanhub-tv-samsung-signed.wgt').is_file())
        calls = self.calls.read_text()
        self.assertLess(calls.index('backup-apps'), calls.index('sign-widget'))
        self.assertLess(calls.index('sign-widget'), calls.index('install-widget'))

    def test_failed_device_backup_prevents_signing_and_installation(self):
        self.assertNotEqual(self.run_script('deploy', FAIL_BACKUP='1'), 0)
        self.assertNotIn('sign-widget', self.calls.read_text())
        self.assertNotIn('install-widget', self.calls.read_text())

    def test_stale_signed_file_cannot_hide_signing_failure(self):
        artifact = self.repo/'cleanhub-tv-samsung-signed.wgt'
        artifact.write_bytes(b'old output')
        self.assertNotEqual(self.run_script('deploy', FAIL_SIGN='1'), 0)
        self.assertEqual(artifact.read_bytes(), b'old output')
        self.assertNotIn('install-widget', self.calls.read_text())

    def test_read_only_previous_artifact_is_atomically_replaced(self):
        artifact = self.repo/'cleanhub-tv-samsung-signed.wgt'
        artifact.write_bytes(b'old output')
        artifact.chmod(0o444)
        previous_inode = artifact.stat().st_ino
        self.assertEqual(self.run_script('deploy'), 0)
        self.assertNotEqual(artifact.stat().st_ino, previous_inode)
        self.assertNotEqual(artifact.read_bytes(), b'old output')
        self.assertEqual(list(self.repo.glob('.cleanhub-signed-*')), [])

    def test_unsigned_output_prevents_installation(self):
        self.assertNotEqual(self.run_script('deploy', MISSING_SIGNATURES='1'), 0)
        self.assertNotIn('install-widget', self.calls.read_text())

    def test_exit_zero_without_install_success_is_failure(self):
        self.assertNotEqual(self.run_script('deploy', FAIL_INSTALL='1'), 0)

    def test_signed_package_with_wrong_payload_is_rejected(self):
        self.assertNotEqual(self.run_script('deploy', WRONG_PAYLOAD='1'), 0)
        self.assertNotIn('install-widget', self.calls.read_text())

    def test_install_success_without_app_registration_is_failure(self):
        self.assertNotEqual(self.run_script('deploy', MISSING_REGISTRATION='1'), 0)

    def test_python_guide_preserves_option_order_and_uses_tizen(self):
        spec = importlib.util.spec_from_file_location('installer', ROOT/'tools/sdb_install.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        import contextlib
        import io
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            module.show_tizen_guide('192.0.2.1', '/tmp/widget folder/app.wgt')
        text = output.getvalue()
        self.assertLess(text.index('Option 1:'), text.index('Option 2:'))
        self.assertLess(text.index('Option 2:'), text.index('Option 3:'))
        self.assertIn('tizen install -s 192.0.2.1:26101', text)
        self.assertNotIn('sdb install', text)


if __name__ == '__main__':
    unittest.main()
