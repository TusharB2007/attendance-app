# Attendance App (Flask, Railway-ready)

A super simple demo attendance system:
- Teacher sets a code
- Students submit Name + Roll + Code
- Teacher views the list at `/list`

## Files
- `app.py` — Flask app (binds to `$PORT` automatically for Railway/Render)
- `requirements.txt` — Python dependencies
- `templates/index.html` — Home (set code + submit)
- `templates/list.html` — Attendance list

## Quick Deploy on Railway (Free Credits)
1. Push this folder to a GitHub repo (e.g., `attendance-app`).
2. Go to https://railway.app → Sign in with GitHub → New Project → Deploy from GitHub.
3. Select your repo.
4. Set **Start Command**: `python app.py`.
5. Deploy → open your public URL.

## Local Run
```
pip install -r requirements.txt
python app.py
```
Then open http://localhost:5000
