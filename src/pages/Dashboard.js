import { useEffect, useState } from "react";
import API from "../api";

import { useNavigate } from "react-router-dom";

export default function Dashboard({ setIsLoggedIn }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    API.get(`/activities/${userId}`)
      .then(res => { setData(res.data); setLoading(false); })
      .catch(() => { setError("Failed to load activities"); setLoading(false); });
  }, [userId, navigate]);

  const total = data.reduce((sum, a) => sum + a.emissions, 0);
  const average = data.length > 0 ? (total / data.length).toFixed(2) : 0;

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getLabel = (type) => ({
    car: "🚗 Car Trip", flight: "✈️ Flight", bus: "🚌 Bus",
    electricity: "🔥 Electricity", meat: "🍔 Meat Meal"
  })[type] || type;

  const getColor = (e) => e < 1 ? "#16a34a" : e < 5 ? "#d97706" : "#dc2626";

  return (
    <div style={{ padding: "30px 40px", maxWidth: "960px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(255,255,255,0.95)", borderRadius: "16px",
        padding: "24px 30px", marginBottom: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <div>
          <h2 style={{ color: "#2e7d32", fontSize: "1.8rem", margin: 0 }}>
            Welcome back, {name} 👋
          </h2>
          <p style={{ color: "#666", marginTop: "4px" }}>
            Track your carbon footprint and make a difference
          </p>
        </div>
        <button onClick={handleLogout} style={{
          width: "auto", padding: "10px 20px",
          background: "linear-gradient(to right, #ef4444, #dc2626)",
          borderRadius: "8px", fontSize: "0.9rem"
        }}>
          Logout
        </button>
      </div>

      {/* Stats Row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px", marginBottom: "24px"
      }}>
        {[
          { label: "Total Emissions", value: `${total.toFixed(2)} kg`, icon: "🌍", color: "#2e7d32" },
          { label: "Activities Logged", value: data.length, icon: "📋", color: "#0288d1" },
          { label: "Avg per Activity", value: `${average} kg`, icon: "📊", color: "#d97706" }
        ].map((stat, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.95)", borderRadius: "14px",
            padding: "22px", textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            borderTop: `4px solid ${stat.color}`
          }}>
            <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: stat.color, margin: "8px 0" }}>
              {stat.value}
            </div>
            <div style={{ color: "#888", fontSize: "0.85rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap"
      }}>
        {[
          { label: "+ Log Activity", path: "/add-activity", color: "linear-gradient(to right, #2e7d32, #388e3c)" },
          { label: "📊 My Stats", path: "/stats", color: "linear-gradient(to right, #0288d1, #0277bd)" },
          { label: "📅 Weekly", path: "/weekly", color: "linear-gradient(to right, #7c3aed, #6d28d9)" },
          { label: "🏆 Leaderboard", path: "/leaderboard", color: "linear-gradient(to right, #d97706, #b45309)" },
        ].map((btn, i) => (
          <button key={i} onClick={() => navigate(btn.path)} style={{
            width: "auto", padding: "10px 20px", background: btn.color,
            borderRadius: "8px", fontSize: "0.9rem", fontWeight: "600"
          }}>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div style={{
        background: "rgba(255,255,255,0.95)", borderRadius: "16px",
        padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#2e7d32", marginBottom: "16px", fontSize: "1.2rem" }}>
          🌿 Recent Activities
        </h3>

        {loading && <p style={{ color: "#888", textAlign: "center" }}>Loading...</p>}
        {error && <p className="alert-error">{error}</p>}

        {!loading && data.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "3rem" }}>🌱</div>
            <p style={{ color: "#888", margin: "12px 0" }}>No activities logged yet</p>
            <button onClick={() => navigate("/add-activity")} style={{
              width: "auto", padding: "10px 24px", borderRadius: "8px"
            }}>
              Log Your First Activity
            </button>
          </div>
        )}

        {data.map(a => (
          <div key={a._id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 16px", borderRadius: "10px", marginBottom: "8px",
            background: "#f9fafb", border: "1px solid #e5e7eb",
            transition: "background 0.2s"
          }}>
            <div>
              <p style={{ fontWeight: "600", margin: 0, color: "#1f2937" }}>
                {getLabel(a.type)}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: "2px 0 0" }}>
                {new Date(a.date).toLocaleDateString()}
              </p>
            </div>
            <span style={{
              fontWeight: "bold", color: getColor(a.emissions),
              background: getColor(a.emissions) + "18",
              padding: "4px 12px", borderRadius: "20px", fontSize: "0.9rem"
            }}>
              {a.emissions} kg CO₂
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}