import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Weekly() {
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

    // ✅ Pass userId as query parameter
    API.get(`/activities/weekly/summary?userId=${userId}`)
      .then(res => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Weekly error:", err);
        setError(err.response?.data?.message || "Failed to load weekly data");
        setLoading(false);
      });
  }, [userId, navigate]);

  const total = activities.reduce((sum, a) => sum + a.emissions, 0);

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
      <h2>📅 Weekly Summary</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h3>Total This Week</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#16a34a" }}>
          {total.toFixed(2)} kg CO₂
        </p>
      </div>

      <div className="card">
        <h3>This Week's Activities</h3>

        {!loading && activities.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>No activities logged this week.</p>
            <button
              onClick={() => navigate("/add-activity")}
              style={{
                background: "#16a34a", color: "white", border: "none",
                padding: "10px 20px", borderRadius: "8px", cursor: "pointer"
              }}>
              Log Activity
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