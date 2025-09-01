import React, { useState, useEffect } from "react";

const TeacherWindow = () => {
  const [code, setCode] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);
  const [timer, setTimer] = useState(0);

  // Generate code handler
  const handleGenerateCode = async () => {
    const res = await fetch("http://localhost:5000/generate_code", { method: "POST" });
    const data = await res.json();
    setCode(data.code);
    setExpiresAt(new Date(data.expires_at.replace(" ", "T")));
  };

  // Timer countdown
  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setTimer(diff);
      if (diff === 0) {
        setCode("");
        setExpiresAt(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <button onClick={handleGenerateCode} disabled={!!code}>
        Generate Code
      </button>
      {code && (
        <div style={{ marginTop: "20px" }}>
          <h2>Attendance Code: <span style={{ color: "green" }}>{code}</span></h2>
          <p>Expires in: <b>{timer}</b> seconds</p>
        </div>
      )}
    </div>
  );
};

export default TeacherWindow;
