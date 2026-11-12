import contextlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('backup', Path(__file__).resolve().parents[1]/'tools/backup.py')
backup = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backup)


class BackupTests(unittest.TestCase):
    def test_device_only_skips_rest_app_list(self):
        with tempfile.TemporaryDirectory() as folder, patch.object(backup.urllib.request, 'urlopen') as request:
            request.return_value.__enter__.return_value.read.return_value = b'{"device": {}}'
            with contextlib.redirect_stdout(io.StringIO()):
                self.assertTrue(backup.backup_tv('192.0.2.1', folder, True))
            self.assertEqual(request.call_count, 1)
            self.assertEqual(json.loads((Path(folder)/'device_info.json').read_text()), {'device': {}})
            self.assertFalse((Path(folder)/'installed_apps.json').exists())

    def test_failed_backup_does_not_claim_completion(self):
        with tempfile.TemporaryDirectory() as folder, patch.object(backup.urllib.request, 'urlopen', side_effect=OSError('offline')):
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                self.assertFalse(backup.backup_tv('192.0.2.1', folder))
            self.assertIn('Backup incomplete', output.getvalue())
            self.assertNotIn('Backup complete:', output.getvalue())
