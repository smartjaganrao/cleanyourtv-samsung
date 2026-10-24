#!/usr/bin/env python3
"""Samsung Smart TV (Tizen OS) Command Line Utility

Connects over Wi-Fi without any dongles or extra hardware.
Supports TV auto-detection, info probing, token pairing, remote control key sending,
listing installed apps, and launching streaming services directly.

Usage:
    python3 tools/samsung_tv.py --probe <TV_IP>
    python3 tools/samsung_tv.py --pair <TV_IP>
    python3 tools/samsung_tv.py --apps <TV_IP>
    python3 tools/samsung_tv.py --launch <TV_IP> <APP_ID>
    python3 tools/samsung_tv.py --key <TV_IP> <KEY_NAME>
"""

import os
import sys
import json
import base64
import socket
import ssl
import time
import urllib.request
import urllib.error
import argparse

TOKEN_FILE = os.path.join(os.path.dirname(__file__), ".samsung_token")

def probe_tv(ip):
    print(f"🔍 Probing Samsung TV at {ip}...")
    url = f"http://{ip}:8001/api/v2/"
    
    # 1. Check REST API (port 8001)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CleanYourTV/1.0"})
        with urllib.request.urlopen(req, timeout=4.0) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            device = data.get("device", {})
            name = device.get("name", "Unknown Samsung TV")
            model = device.get("modelName", device.get("model", "Unknown Model"))
            os_type = device.get("os", "Tizen OS")
            wifi_mac = device.get("wifiMac", "N/A")
            token_auth = data.get("isSupport", {}).get("tokenAuthSupport", False)
            
            print(f"✅ Found Samsung Smart TV!")
            print(f"   • Device Name:     {name}")
            print(f"   • Model Number:    {model}")
            print(f"   • Operating System: {os_type}")
            print(f"   • Wi-Fi MAC:       {wifi_mac}")
            print(f"   • Token Auth:      {'Supported (WSS 8002)' if token_auth else 'Legacy (WS 8001)'}")
            
    except urllib.error.URLError as e:
        print(f"⚠️  Could not reach REST API on port 8001 ({e}). The TV might be off or on a different IP.")
        
    # 2. Check SDB Developer Port (26101)
    sdb_open = test_port(ip, 26101)
    print(f"   • SDB Developer Port (26101): {'🟢 OPEN (Developer Mode Active)' if sdb_open else '⚪ CLOSED (Turn on Developer Mode in Apps menu)'}")

def test_port(ip, port, timeout=2.0):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(timeout)
            return s.connect_ex((ip, port)) == 0
    except Exception:
        return False

def get_saved_token(ip):
    if os.path.exists(TOKEN_FILE):
        try:
            with open(TOKEN_FILE, "r") as f:
                tokens = json.load(f)
                return tokens.get(ip)
        except Exception:
            pass
    return None

def save_token(ip, token):
    tokens = {}
    if os.path.exists(TOKEN_FILE):
        try:
            with open(TOKEN_FILE, "r") as f:
                tokens = json.load(f)
        except Exception:
            pass
    tokens[ip] = token
    with open(TOKEN_FILE, "w") as f:
        json.dump(tokens, f, indent=2)
    print(f"💾 Saved pairing token to {TOKEN_FILE}")

def send_ws_handshake(sock, host, port, path):
    key = base64.b64encode(os.urandom(16)).decode('utf-8')
    req = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {host}:{port}\r\n"
        f"Upgrade: websocket\r\n"
        f"Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        f"Sec-WebSocket-Version: 13\r\n\r\n"
    )
    sock.sendall(req.encode('utf-8'))
    resp = sock.recv(4096).decode('utf-8', errors='ignore')
    return "101 Switching Protocols" in resp

def encode_ws_frame(payload_str):
    data = payload_str.encode('utf-8')
    length = len(data)
    frame = bytearray([0x81])
    mask = os.urandom(4)
    if length <= 125:
        frame.append(0x80 | length)
    elif length <= 65535:
        frame.append(0x80 | 126)
        frame.extend(length.to_bytes(2, 'big'))
    else:
        frame.append(0x80 | 127)
        frame.extend(length.to_bytes(8, 'big'))
    frame.extend(mask)
    masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(data))
    frame.extend(masked)
    return frame

def decode_ws_frame(sock):
    header = sock.recv(2)
    if len(header) < 2:
        return None
    b1, b2 = header[0], header[1]
    masked = bool(b2 & 0x80)
    length = b2 & 0x7F
    if length == 126:
        length = int.from_bytes(sock.recv(2), 'big')
    elif length == 127:
        length = int.from_bytes(sock.recv(8), 'big')
    if masked:
        mask = sock.recv(4)
    data = bytearray()
    while len(data) < length:
        chunk = sock.recv(min(4096, length - len(data)))
        if not chunk:
            break
        data.extend(chunk)
    if masked:
        data = bytearray(b ^ mask[i % 4] for i, b in enumerate(data))
    return data.decode('utf-8', errors='ignore')

def pair_tv(ip):
    print(f"🤝 Connecting to Samsung TV at {ip}:8002 (WSS)...")
    print("👉 Look at your TV screen! If prompted, select 'Allow' using your remote.")
    
    app_name_b64 = base64.b64encode(b"CleanYourTV").decode('utf-8')
    token = get_saved_token(ip)
    token_param = f"&token={token}" if token else ""
    path = f"/api/v2/channels/samsung.remote.control?name={app_name_b64}{token_param}"

    raw_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    raw_sock.settimeout(15.0)
    raw_sock.connect((ip, 8002))

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    ws = ctx.wrap_socket(raw_sock, server_hostname=ip)

    if not send_ws_handshake(ws, ip, 8002, path):
        sys.exit("❌ WebSocket handshake failed.")

    start_time = time.time()
    paired = False
    while time.time() - start_time < 20:
        frame_text = decode_ws_frame(ws)
        if not frame_text:
            continue
        try:
            msg = json.loads(frame_text)
            event = msg.get("event")
            if event == "ms.channel.connect":
                data = msg.get("data", {})
                new_token = data.get("token")
                if new_token:
                    save_token(ip, new_token)
                print("🎉 Successfully paired with Samsung TV!")
                paired = True
                break
            elif event == "ms.channel.unauthorized":
                sys.exit("❌ Pairing rejected on TV screen.")
        except Exception:
            pass

    ws.close()
    if not paired:
        print("⚠️ Pairing timed out. Make sure the TV is on and on the same Wi-Fi network.")

def send_key(ip, key_name):
    print(f"📡 Sending key '{key_name}' to Samsung TV...")
    token = get_saved_token(ip)
    app_name_b64 = base64.b64encode(b"CleanYourTV").decode('utf-8')
    token_param = f"&token={token}" if token else ""
    path = f"/api/v2/channels/samsung.remote.control?name={app_name_b64}{token_param}"

    raw_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    raw_sock.settimeout(6.0)
    raw_sock.connect((ip, 8002))

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    ws = ctx.wrap_socket(raw_sock, server_hostname=ip)

    if not send_ws_handshake(ws, ip, 8002, path):
        sys.exit("❌ Connection failed.")

    key_payload = {
        "method": "ms.remote.control",
        "params": {
            "Cmd": "Click",
            "DataOfCmd": key_name,
            "Option": "false",
            "TypeOfRemote": "SendRemoteKey"
        }
    }
    ws.sendall(encode_ws_frame(json.dumps(key_payload)))
    time.sleep(0.2)
    ws.close()
    print("✅ Key sent successfully.")

def list_installed_apps(ip):
    print(f"📱 Querying installed apps from {ip}...")
    url = f"http://{ip}:8001/api/v2/applications"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CleanYourTV/1.0"})
        with urllib.request.urlopen(req, timeout=5.0) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("Installed Tizen Applications:")
            for app in data:
                print(f"   • {app.get('name', 'App')}: ID = {app.get('appId')}")
    except Exception as e:
        print(f"Note: Direct application listing over HTTP returned: {e}")
        print("Using Tizen catalog fallback (common Samsung App IDs):")
        common = [
            ("Netflix", "11101200001"),
            ("YouTube", "111299001912"),
            ("Prime Video", "3201512006785"),
            ("Disney+", "3201907018807"),
            ("Apple TV", "3201807016597"),
            ("Plex", "3201512006963"),
            ("Spotify", "3201606009684")
        ]
        for name, aid in common:
            print(f"   • {name:15}: {aid}")

def launch_app(ip, app_id):
    print(f"🚀 Launching App ID '{app_id}' on TV...")
    url = f"http://{ip}:8001/api/v2/applications/{app_id}"
    try:
        req = urllib.request.Request(url, data=b"", headers={"User-Agent": "CleanYourTV/1.0"}, method="POST")
        with urllib.request.urlopen(req, timeout=5.0) as resp:
            print(f"✅ App launched successfully (HTTP {resp.status}).")
    except urllib.error.HTTPError as e:
        print(f"Launch response: {e.code} ({e.reason})")
    except Exception as e:
        print(f"Error launching app: {e}")

def main():
    parser = argparse.ArgumentParser(description="Samsung Tizen TV Remote Control and Management Utility")
    parser.add_argument("ip", help="Samsung TV IP address")
    parser.add_argument("--probe", action="store_true", help="Probe TV status and info")
    parser.add_argument("--pair", action="store_true", help="Pair with TV and save authorization token")
    parser.add_argument("--key", help="Send remote key (KEY_HOME, KEY_ENTER, KEY_VOLUP, etc.)")
    parser.add_argument("--apps", action="store_true", help="List installed apps")
    parser.add_argument("--launch", help="Launch app by ID (e.g. 11101200001 for Netflix)")
    args = parser.parse_args()

    if args.probe:
        probe_tv(args.ip)
    elif args.pair:
        pair_tv(args.ip)
    elif args.apps:
        list_installed_apps(args.ip)
    elif args.launch:
        launch_app(args.ip, args.launch)
    elif args.key:
        send_key(args.ip, args.key)
    else:
        probe_tv(args.ip)

if __name__ == "__main__":
    main()
