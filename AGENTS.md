# Instructions for AI Coding Assistants (Gemini, Claude, Codex)

When assisting a user with this repository:

1. **Safety First:**  
   Samsung Smart TV firmware partitions are read-only. Never attempt root hacks or destructive service-mode flashing. Everything in this project operates 100% within user-space through Developer Mode (`1-2-3-4-5`), SDB, and native TV settings.

2. **Step-by-Step Execution:**  
   Always follow [`PROMPT.md`](PROMPT.md). Run `python3 tools/backup.py <TV_IP>` before applying changes.

3. **Verify Every Step:**  
   Use `python3 tools/samsung_tv.py --probe <TV_IP>` to check connection health and port availability.
