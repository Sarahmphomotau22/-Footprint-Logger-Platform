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
    if (!userId) {
      navigate("/login");
      return;
    }

    API.get(`/activities/${userId}`)
      .then(res => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Stats error:", err);
        setError(err.response?.data?.message || "Failed to load stats");
        setLoading(false);
      });
  }, [userId, navigate]);

  const total = activities.reduce((sum, a) => sum + a.emissions, 0);
  const average = activities.length > 0 ? (total / activities.length).toFixed(2) : 0;
  const highest = activities.length > 0 ? Math.max(...activities.map(a => a.emissions)).toFixed(2) : 0;
  const lowest = activities.length > 0 ? Math.min(...activities.map(a => a.emissions)).toFixed(2) : 0;

  const getActivityLabel = (type) => {
    const labels = {
      car: "🚗 Car Trip",
      flight: "✈️ Flight",
      bus: "🚌 Bus",
      electricity: "🔥 Electricity",
      meat: "🍔 Meat Meal"
    };
    return labels[type] || type;
  };

  return (
    <div className="container">
      <h2>📊 My Stats</h2>

      {loading && <p>Loading stats...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Summary Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <div className="card" style={{ textAlign: "center" }}>
          <h3>🌍 Total</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#16a34a" }}>
            {total.toFixed(2)} kg
          </p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>CO₂ Emissions</p>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <h3>📋 Activities</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
            {activities.length}
          </p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>Total Logged</p>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <h3>📈 Average</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#d97706" }}>
            {average} kg
          </p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>Per Activity</p>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <h3>⬆️ Highest</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ef4444" }}>
            {highest} kg
          </p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>Single Activity</p>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <h3>⬇️ Lowest</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#16a34a" }}>
            {lowest} kg
          </p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>Single Activity</p>
        </div>
      </div>

      {/* Activities Breakdown */}
      <div className="card">
        <h3>Activities Breakdown</h3>

        {!loading && activities.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>No activities logged yet.</p>
            <button
              onClick={() => navigate("/add-activity")}
              style={{
                background: "#16a34a", color: "white", border: "none",
                padding: "10px 20px", borderRadius: "8px", cursor: "pointer"
              }}>
              Log Your First Activity
            </button>
          </div>
        )}

        {activities.map(a => (
          <div key={a._id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <div>
              <p style={{ fontWeight: "bold", margin: 0 }}>
                {getActivityLabel(a.type)}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#666", margin: 0 }}>
                {new Date(a.date).toLocaleDateString()}
              </p>
            </div>
            <span style={{
              fontWeight: "bold",
              color: a.emissions > 5 ? "red" : a.emissions > 1 ? "orange" : "green"
            }}>
              {a.emissions} kg CO₂
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "1rem", background: "#6b7280", color: "white",
          border: "none", padding: "10px 20px",
          borderRadius: "8px", cursor: "pointer"
        }}>
        ← Back to Dashboard
      </button>
    </div>
  );
}