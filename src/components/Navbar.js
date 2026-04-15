import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const linkStyle = {
    color: "white", textDecoration: "none", fontWeight: "500",
    fontSize: "0.92rem", padding: "6px 4px", whiteSpace: "nowrap"
  };

  return (
    <>
      <nav style={{
        background: "linear-gradient(to right,#2e7d32,#0288d1)",
        padding: "0 28px", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        height: "60px", position: "sticky", top: 0, zIndex: 1000,
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
      }}>
        {/* Logo */}
        <Link to="/" style={{ ...linkStyle, fontWeight: "800", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
          🌱 Footprint Logger
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }} className="nav-desktop">
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>

          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
              <Link to="/stats" style={linkStyle}>Stats</Link>
              <Link to="/weekly" style={linkStyle}>Weekly</Link>
              <Link to="/leaderboard" style={linkStyle}>Leaderboard</Link>
              <span style={{ ...linkStyle, opacity: 0.85 }}>👤 {name}</span>
              <button onClick={handleLogout} style={{
                background: "rgba(255,255,255,0.2)", color: "white",
                border: "1px solid rgba(255,255,255,0.5)", padding: "6px 16px",
                borderRadius: "20px", cursor: "pointer", fontWeight: "600",
                fontSize: "0.88rem", width: "auto", backdropFilter: "blur(4px)",
                transition: "background 0.2s"
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" style={{
                background: "rgba(255,255,255,0.2)", color: "white",
                padding: "6px 18px", borderRadius: "20px", textDecoration: "none",
                fontWeight: "700", fontSize: "0.88rem",
                border: "1px solid rgba(255,255,255,0.5)"
              }}>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{
            display: "none", background: "transparent", color: "white",
            border: "none", fontSize: "1.5rem", cursor: "pointer",
            width: "auto", padding: "4px 8px"
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          background: "linear-gradient(to bottom,#2e7d32,#0288d1)",
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}>
          {[
            { label: "🏠 Home", path: "/" },
            { label: "ℹ️ About", path: "/about" },
            { label: "📬 Contact", path: "/contact" },
            ...(isLoggedIn ? [
              { label: "📊 Dashboard", path: "/dashboard" },
              { label: "📈 Stats", path: "/stats" },
              { label: "📅 Weekly", path: "/weekly" },
              { label: "🏆 Leaderboard", path: "/leaderboard" },
            ] : [
              { label: "🔑 Login", path: "/login" },
              { label: "📝 Register", path: "/register" },
            ])
          ].map((item, i) => (
            <Link key={i} to={item.path}
              onClick={() => setMenuOpen(false)}
              style={{ ...linkStyle, fontSize: "1rem" }}>
              {item.label}
            </Link>
          ))}
          {isLoggedIn && (
            <button onClick={handleLogout} style={{
              background: "rgba(255,255,255,0.2)", color: "white",
              border: "1px solid rgba(255,255,255,0.4)", padding: "10px",
              borderRadius: "8px", cursor: "pointer", fontWeight: "600",
              fontSize: "0.95rem", width: "100%"
            }}>
              Logout
            </button>
          )}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
