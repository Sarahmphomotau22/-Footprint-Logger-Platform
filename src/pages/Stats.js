import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Stats() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    API.get(`/activities/${userId}`)
      .then(res => { setActivities(res.data); setLoading(false); })
      .catch(() => { setError("Failed to load stats"); setLoading(false); });
  }, [userId, navigate]);

  const total = activities.reduce((sum, a) => sum + a.emissions, 0);
  const average = activities.length > 0 ? (total / activities.length).toFixed(2) : 0;
  const highest = activities.length > 0 ? Math.max(...activities.map(a => a.emissions)).toFixed(2) : 0;
  const lowest = activities.length > 0 ? Math.min(...activities.map(a => a.emissions)).toFixed(2) : 0;

  const getLabel = (type) => ({
    car: "🚗 Car Trip", flight: "✈️ Flight", bus: "🚌 Bus",
    electricity: "🔥 Electricity", meat: "🍔 Meat Meal"
  })[type] || type;

  const stats = [
    { label: "Total Emissions", value: `${total.toFixed(2)} kg`, icon: "🌍", color: "#2e7d32" },
    { label: "Activities", value: activities.length, icon: "📋", color: "#0288d1" },
    { label: "Average", value: `${average} kg`, icon: "📈", color: "#d97706" },
    { label: "Highest", value: `${highest} kg`, icon: "⬆️", color: "#dc2626" },
    { label: "Lowest", value: `${lowest} kg`, icon: "⬇️", color: "#16a34a" },
  ];

  return (
    <div style={{ padding: "30px 40px", maxWidth: "900px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.95)", borderRadius: "16px",
        padding: "24px 30px", marginBottom: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderLeft: "6px solid #2e7d32"
      }}>
        <h2 style={{ color: "#2e7d32", margin: 0 }}>📊 My Emissions Stats</h2>
        <p style={{ color: "#888", marginTop: "6px" }}>
          Your full carbon footprint breakdown
        </p>
      </div>

      {loading && <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>}
      {error && <p className="alert-error">{error}</p>}

      {/* Stats Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px", marginBottom: "24px"
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.95)", borderRadius: "14px",
            padding: "20px", textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            borderTop: `4px solid ${s.color}`
          }}>
            <div style={{ fontSize: "1.8rem" }}>{s.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: s.color, margin: "8px 0" }}>
              {s.value}
            </div>
            <div style={{ color: "#888", fontSize: "0.82rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Activities Breakdown */}
      <div style={{
        background: "rgba(255,255,255,0.95)", borderRadius: "16px",
        padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#2e7d32", marginBottom: "16px" }}>All Activities</h3>

        {!loading && activities.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "#888" }}>No activities yet.</p>
            <button onClick={() => navigate("/add-activity")} style={{
              width: "auto", padding: "10px 24px", marginTop: "12px", borderRadius: "8px"
            }}>
              Log Activity
            </button>
          </div>
        )}

        {activities.map(a => (
          <div key={a._id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 16px", borderRadius: "10px", marginBottom: "8px",
            background: "#f9fafb", border: "1px solid #e5e7eb"
          }}>
            <div>
              <p style={{ fontWeight: "600", margin: 0 }}>{getLabel(a.type)}</p>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: "2px 0 0" }}>
                {new Date(a.date).toLocaleDateString()}
              </p>
            </div>
            <span style={{
              fontWeight: "bold",
              color: a.emissions > 5 ? "#dc2626" : a.emissions > 1 ? "#d97706" : "#16a34a",
              background: a.emissions > 5 ? "#fee2e2" : a.emissions > 1 ? "#ffedd5" : "#dcfce7",
              padding: "4px 12px", borderRadius: "20px", fontSize: "0.9rem"
            }}>
              {a.emissions} kg CO₂
            </span>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/dashboard")} style={{
        width: "auto", marginTop: "20px", padding: "10px 24px",
        background: "linear-gradient(to right, #6b7280, #4b5563)", borderRadius: "8px"
      }}>
        ← Back to Dashboard
      </button>
    </div>
  );
}