import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    API.get(`/activities/${userId}`)
      .then(res => {
        setData(res.data);
        const sum = res.data.reduce((acc, a) => acc + a.emissions, 0);
        setTotal(sum.toFixed(2));
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard error:", err);
        setError("Failed to load activities");
        setLoading(false);
      });
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getEmissionColor = (emissions) => {
    if (emissions < 1) return "green";
    if (emissions < 5) return "orange";
    return "red";
  };

  return (
    <div className="container">

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem"
      }}>
        <h2>Welcome, {name} 👋</h2>
        <button
          onClick={handleLogout}
          style={{ background: "#ef4444", color: "white", border: "none",
            padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <div className="card" style={{ textAlign: "center" }}>
          <h3 style={{ color: "#16a34a" }}>🌍 Total</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{total} kg</p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>CO₂ Emissions</p>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <h3 style={{ color: "#2563eb" }}>📋 Activities</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{data.length}</p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>Logged</p>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <h3 style={{ color: "#d97706" }}>📊 Average</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {data.length > 0 ? (total / data.length).toFixed(2) : "0"} kg
          </p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>Per Activity</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap"
      }}>
        <button onClick={() => navigate("/add-activity")}
          style={{ background: "#16a34a", color: "white", border: "none",
            padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
          + Log New Activity
        </button>

        <button onClick={() => navigate("/stats")}
          style={{ background: "#2563eb", color: "white", border: "none",
            padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
          📊 My Stats
        </button>

        <button onClick={() => navigate("/weekly")}
          style={{ background: "#7c3aed", color: "white", border: "none",
            padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
          📅 Weekly Summary
        </button>

        <button onClick={() => navigate("/leaderboard")}
          style={{ background: "#d97706", color: "white", border: "none",
            padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
          🏆 Leaderboard
        </button>
      </div>

      {/* Activities List */}
      <div className="card">
        <h3>Recent Activities</h3>

        {loading && <p>Loading activities...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && data.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ fontSize: "2rem" }}>🌱</p>
            <p>No activities logged yet.</p>
            <button
              onClick={() => navigate("/add-activity")}
              style={{ background: "#16a34a", color: "white", border: "none",
                padding: "10px 20px", borderRadius: "8px", cursor: "pointer",
                marginTop: "1rem" }}>
              Log Your First Activity
            </button>
          </div>
        )}

        {data.map(a => (
          <div key={a._id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderBottom: "1px solid #e5e7eb",
            borderRadius: "8px",
            marginBottom: "8px"
          }}>
            <div>
              <p style={{ fontWeight: "bold", margin: 0 }}>
                {a.type === "car" ? "🚗 Car Trip" :
                 a.type === "flight" ? "✈️ Flight" :
                 a.type === "bus" ? "🚌 Bus" :
                 a.type === "electricity" ? "🔥 Electricity" :
                 a.type === "meat" ? "🍔 Meat Meal" : a.type}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#666", margin: 0 }}>
                {new Date(a.date).toLocaleDateString()}
              </p>
            </div>
            <span style={{
              fontWeight: "bold",
              color: getEmissionColor(a.emissions)
            }}>
              {a.emissions} kg CO₂
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}