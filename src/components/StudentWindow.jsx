import React, { useState } from "react";

const StudentWindow = () => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("roll", roll);
    formData.append("code", code);
    const res = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    const text = await res.text();
    // Parse message from returned HTML
    const msgMatch = text.match(/<div[^>]*message[^>]*>(.*?)<\/div>/);
    if (msgMatch) {
      setMessage(msgMatch[1]);
    } else {
      // fallback: try to extract from <p> or just show generic
      setMessage(text.includes("Attendance marked") ? "✅ Attendance marked!" : "❌ Error or invalid code!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Roll No:</label>
          <input type="text" value={roll} onChange={e => setRoll(e.target.value)} required />
        </div>
        <div>
          <label>Attendance Code:</label>
          <input type="text" value={code} onChange={e => setCode(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>Submit Attendance</button>
      </form>
      {message && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</div>
      )}
    </div>
  );
};

export default StudentWindow;
