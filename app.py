from flask import Flask, request, render_template, redirect, url_for
import datetime
import pytz
import os

app = Flask(__name__)

# In-memory store (demo). For production, use a database.
attendance_records = []
current_code = None

# Set timezone (India example)
IST = pytz.timezone("Asia/Kolkata")

@app.route("/")
def home():
    return render_template("index.html", code=current_code)

# Teacher sets the current class code
@app.route("/set_code", methods=["POST"])
def set_code():
    global current_code
    current_code = request.form["code"].strip()
    return redirect(url_for("home"))

# Student submits attendance
@app.route("/submit", methods=["POST"])
def submit():
    global attendance_records, current_code
    name = request.form["name"].strip()
    roll = request.form["roll"].strip()
    code = request.form["code"].strip()

    now = datetime.datetime.now(IST).strftime("%Y-%m-%d %H:%M:%S")

    if code and current_code and code == current_code:
        attendance_records.append({"name": name, "roll": roll, "time": now})
        msg = "✅ Attendance marked!"
    else:
        msg = "❌ Invalid Code!"

    return render_template("index.html", code=current_code, message=msg)

# Teacher checks list
@app.route("/list")
def list_attendance():
    return render_template("list.html", records=attendance_records)

if __name__ == "__main__":
    # Important for Railway/Render: bind to the port provided by the platform
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
