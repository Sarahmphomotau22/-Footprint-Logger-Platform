import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", surname: "", email: "", password: "", confirm: ""
  });

  const handleRegister = async () => {
    try {
      setError("");

      if (!form.name || !form.surname || !form.email || !form.password) {
        setError("Please fill in all fields");
        return;
      }

      if (form.password !== form.confirm) {
        setError("Passwords do not match");
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      setLoading(true);
      await API.post("/auth/register", form);
      alert("Account created successfully! Please sign in.");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const field = (label, placeholder, key, type = "text") => (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        style={{ margin: 0 }}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: "85vh", display: "flex",
      justifyContent: "center", alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.97)",
        width: "100%", maxWidth: "440px",
        padding: "40px 36px", borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "linear-gradient(135deg,#2e7d32,#0288d1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px", fontSize: "1.8rem"
          }}>
            🌿
          </div>
          <h2 style={{ color: "#2e7d32", margin: 0, fontSize: "1.7rem", fontWeight: "800" }}>
            Create Account
          </h2>
          <p style={{ color: "#9ca3af", marginTop: "6px", fontSize: "0.9rem" }}>
            Join Footprint Logger and start tracking today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#fee2e2", color: "#dc2626", padding: "12px 14px",
            borderRadius: "8px", marginBottom: "16px", fontSize: "0.88rem",
            borderLeft: "4px solid #dc2626"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Two columns for name/surname */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              First Name
            </label>
            <input placeholder="Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} style={{ margin: 0 }} />
          </div>
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              Surname
            </label>
            <input placeholder="Surname" value={form.surname}
              onChange={e => setForm({ ...form, surname: e.target.value })} style={{ margin: 0 }} />
          </div>
        </div>

        <div style={{ marginTop: "14px" }}>
          {field("Email Address", "you@example.com", "email", "email")}
          {field("Password", "Min. 6 characters", "password", "password")}
          {field("Confirm Password", "Repeat your password", "confirm", "password")}
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            marginTop: "4px",
            background: loading ? "#9ca3af" : "linear-gradient(to right,#2e7d32,#0288d1)",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem", fontWeight: "700"
          }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#2e7d32", fontWeight: "700", cursor: "pointer" }}
          >
            Sign in here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
