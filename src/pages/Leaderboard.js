import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/activities/leaderboard/all")
      .then(res => { setUsers(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ padding: "30px 40px", maxWidth: "700px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.95)", borderRadius: "16px",
        padding: "24px 30px", marginBottom: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderLeft: "6px solid #d97706", textAlign: "center"
      }}>
        <h2 style={{ color: "#2e7d32", margin: 0, fontSize: "1.8rem" }}>
          🏆 Leaderboard
        </h2>
        <p style={{ color: "#888", marginTop: "6px" }}>
          Users with the lowest carbon footprint win!
        </p>
      </div>

      {loading && <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>}

      {/* Leaderboard List */}
      <div style={{
        background: "rgba(255,255,255,0.95)", borderRadius: "16px",
        padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        {users.length === 0 && !loading && (
          <p style={{ textAlign: "center", color: "#888", padding: "40px 0" }}>
            No users yet.
          </p>
        )}

        {users.map((u, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 20px", borderRadius: "12px", marginBottom: "10px",
            background: i === 0 ? "linear-gradient(to right, #fef9c3, #fef08a)"
                       : i === 1 ? "linear-gradient(to right, #f1f5f9, #e2e8f0)"
                       : i === 2 ? "linear-gradient(to right, #fff7ed, #fed7aa)"
                       : "#f9fafb",
            border: i < 3 ? "1px solid #e5e7eb" : "1px solid #f3f4f6",
            boxShadow: i < 3 ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
            transition: "transform 0.2s"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "1.5rem", minWidth: "32px" }}>
                {medals[i] || `#${i + 1}`}
              </span>
              <div>
                <p style={{ fontWeight: "700", margin: 0, color: "#1f2937" }}>
                  {u.name} {u.surname || ""}
                </p>
                <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: "2px 0 0" }}>
                  Rank #{i + 1}
                </p>
              </div>
            </div>
            <span style={{
              fontWeight: "bold", fontSize: "1rem",
              color: u.totalEmissions < 10 ? "#16a34a" : u.totalEmissions < 50 ? "#d97706" : "#dc2626",
              background: u.totalEmissions < 10 ? "#dcfce7" : u.totalEmissions < 50 ? "#ffedd5" : "#fee2e2",
              padding: "6px 14px", borderRadius: "20px"
            }}>
              {u.totalEmissions?.toFixed(2) || "0.00"} kg CO₂
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