from flask import Flask, request, render_template, redirect, url_for, jsonify
import datetime
import pytz
import os
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory store (demo). For production, use a database.
attendance_records = []
current_code = None
code_expiry = None
student_submissions = set()  # Track (roll, code) pairs

# Set timezone (India example)
IST = pytz.timezone("Asia/Kolkata")

@app.route("/")
def home():
    return render_template("index.html", code=current_code)


# Teacher generates a random code (valid for 1 minute)
@app.route("/generate_code", methods=["POST"])
def generate_code():
    global current_code, code_expiry, student_submissions
    # Generate a random 3-digit code
    current_code = str(random.randint(100, 999))
    now = datetime.datetime.now(IST)
    code_expiry = now + datetime.timedelta(minutes=1)
    student_submissions = set()  # Reset submissions for new code
    return jsonify({"code": current_code, "expires_at": code_expiry.strftime("%Y-%m-%d %H:%M:%S")})


# Student submits attendance
@app.route("/submit", methods=["POST"])
def submit():
    global attendance_records, current_code, code_expiry, student_submissions
    name = request.form["name"].strip()
    roll = request.form["roll"].strip()
    code = request.form["code"].strip()

    now = datetime.datetime.now(IST)
    msg = ""

    # Check code validity and expiry
    if not current_code or not code_expiry:
        msg = "❌ No active code."
    elif code != current_code:
        msg = "❌ Invalid Code!"
    elif now > code_expiry:
        msg = "❌ Code expired!"
    elif (roll, code) in student_submissions:
        msg = "❌ Already submitted!"
    else:
        attendance_records.append({"name": name, "roll": roll, "time": now.strftime("%Y-%m-%d %H:%M:%S")})
        student_submissions.add((roll, code))
        msg = "✅ Attendance marked!"

    return render_template("index.html", code=current_code, message=msg)


# Teacher checks list
@app.route("/list")
def list_attendance():
    return render_template("list.html", records=attendance_records)

if __name__ == "__main__":
    # Important for Railway/Render: bind to the port provided by the platform
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
