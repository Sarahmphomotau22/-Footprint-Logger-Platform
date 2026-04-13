import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="navbar" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "#16a34a",
      color: "white"
    }}>
      {/* Logo */}
      <Link to="/" style={{ color: "white", textDecoration: "none",
        fontWeight: "bold", fontSize: "1.2rem" }}>
        🌱 Footprint Logger
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
              Dashboard
            </Link>
            <Link to="/stats" style={{ color: "white", textDecoration: "none" }}>
              Stats
            </Link>
            <Link to="/weekly" style={{ color: "white", textDecoration: "none" }}>
              Weekly
            </Link>
            <Link to="/leaderboard" style={{ color: "white", textDecoration: "none" }}>
              Leaderboard
            </Link>
            <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
              👤 {name}
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#16a34a",
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{
              background: "white",
              color: "#16a34a",
              padding: "6px 14px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}