import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userId", res.data.userId);

      setIsLoggedIn(true);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{
      minHeight: "85vh", display: "flex",
      justifyContent: "center", alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.97)",
        width: "100%", maxWidth: "420px",
        padding: "40px 36px", borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
      }}>

        {/* Logo / Icon */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "linear-gradient(135deg,#2e7d32,#0288d1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px", fontSize: "1.8rem"
          }}>
            🌱
          </div>
          <h2 style={{
            color: "#2e7d32", margin: 0, fontSize: "1.7rem", fontWeight: "800"
          }}>
            Welcome Back
          </h2>
          <p style={{ color: "#9ca3af", marginTop: "6px", fontSize: "0.9rem" }}>
            Sign in to your Footprint Logger account
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

        {/* Fields */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
            Email Address
          </label>
          <input
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ margin: 0 }}
          />
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ margin: 0 }}
          />
        </div>

        <p className="link" onClick={() => navigate("/reset")} style={{ textAlign: "right", marginBottom: "20px" }}>
          Forgot Password?
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            background: loading ? "#9ca3af" : "linear-gradient(to right,#2e7d32,#0288d1)",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem", fontWeight: "700", letterSpacing: "0.02em"
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#2e7d32", fontWeight: "700", cursor: "pointer" }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
