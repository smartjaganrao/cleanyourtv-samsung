"""Regression coverage for token-auth capability responses."""

import contextlib
import importlib.util
import io
import json
from pathlib import Path
import unittest
from unittest.mock import patch


spec = importlib.util.spec_from_file_location(
    "samsung_tv", Path(__file__).resolve().parents[1] / "tools" / "samsung_tv.py"
)
samsung_tv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(samsung_tv)


class TokenAuthSupportTests(unittest.TestCase):
    def test_capability_formats(self):
        for key in ("TokenAuthSupport", "tokenAuthSupport"):
            for value, expected in ((True, True), (False, False),
                                    ("true", True), ("false", False),
                                    ("TRUE", True), ("FALSE", False)):
                for support in ({key: value}, json.dumps({key: value})):
                    with self.subTest(support=support):
                        self.assertIs(samsung_tv.token_auth_support({"isSupport": support}), expected)

    def test_missing_or_invalid_capability_is_unknown(self):
        responses = [{}, {"isSupport": {}}]
        for support in (None, [], 1, "invalid JSON", "null", "[]", "true", "42"):
            responses.append({"isSupport": support})
        for value in (None, 0, 1, [], {}, "", "unsupported"):
            responses.append({"isSupport": {"TokenAuthSupport": value}})
        for data in responses:
            with self.subTest(data=data):
                self.assertIsNone(samsung_tv.token_auth_support(data))

    def test_probe_handles_qn95b_response(self):
        # Minimal sanitized reproduction of the observed response shape.
        data = {
            "device": {"modelName": "QE55QN95BATXXU"},
            "isSupport": '{"TokenAuthSupport":"true"}',
        }
        output = io.StringIO()
        with patch.object(samsung_tv.urllib.request, "urlopen") as urlopen:
            urlopen.return_value.__enter__.return_value.read.return_value = json.dumps(data).encode()
            with patch.object(samsung_tv, "test_port", return_value=True):
                with contextlib.redirect_stdout(output):
                    samsung_tv.probe_tv("192.0.2.1")
        self.assertIn("QE55QN95BATXXU", output.getvalue())
        self.assertIn("Token Auth:      Supported (WSS 8002)", output.getvalue())


if __name__ == "__main__":
    unittest.main()
