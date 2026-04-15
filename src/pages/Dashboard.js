import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const TIPS = {
  car: ["🚗 Try carpooling or public transport", "🚲 Consider cycling for short trips", "⚡ Look into electric vehicles"],
  flight: ["✈️ Consider train travel for short distances", "🌍 Purchase carbon offsets for flights", "📹 Use video calls instead of business travel"],
  electricity: ["💡 Switch to LED bulbs", "🌞 Consider solar panels", "🔌 Unplug devices when not in use"],
  meat: ["🥗 Try Meatless Mondays", "🌱 Explore plant-based proteins", "🐟 Replace red meat with fish or chicken"],
  bus: ["👍 Great choice! Public transport is eco-friendly", "🚶 Walk for very short trips"]
};

const LABELS = {
  car: "🚗 Car Trip", flight: "✈️ Flight", bus: "🚌 Bus",
  electricity: "🔥 Electricity", meat: "🍔 Meat Meal"
};

export default function Dashboard({ setIsLoggedIn }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weeklyGoal] = useState(50);
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    API.get(`/activities/${userId}`)
      .then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userId, navigate]);

  // Calculations
  const total = data.reduce((sum, a) => sum + a.emissions, 0);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyData = data.filter(a => new Date(a.date) >= oneWeekAgo);
  const weeklyTotal = weeklyData.reduce((sum, a) => sum + a.emissions, 0);
  const weeklyProgress = Math.min((weeklyTotal / weeklyGoal) * 100, 100);

  // Top emission category
  const categoryTotals = data.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + a.emissions;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  // Community average (mock)
  const communityAvg = 45.5;

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const s = {
    page: { padding: "28px 24px", maxWidth: "960px", margin: "0 auto" },
    header: {
      background: "rgba(255,255,255,0.96)", borderRadius: "16px",
      padding: "24px 28px", marginBottom: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "12px"
    },
    sectionTitle: {
      color: "#2e7d32", fontSize: "1rem", fontWeight: "700",
      textTransform: "uppercase", letterSpacing: "0.05em",
      marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px"
    },
    card: {
      background: "rgba(255,255,255,0.96)", borderRadius: "14px",
      padding: "20px 22px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
    },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "20px" },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginBottom: "20px" },
    statCard: (color) => ({
      background: "rgba(255,255,255,0.96)", borderRadius: "14px",
      padding: "20px", textAlign: "center",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      borderTop: `4px solid ${color}`
    }),
    actionBtn: (bg) => ({
      padding: "10px 18px", background: bg, color: "white",
      border: "none", borderRadius: "8px", cursor: "pointer",
      fontWeight: "600", fontSize: "0.88rem", width: "auto"
    }),
    activityRow: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 14px", borderRadius: "10px", marginBottom: "8px",
      background: "#f9fafb", border: "1px solid #e5e7eb"
    },
    badge: (e) => ({
      fontWeight: "bold",
      color: e > 5 ? "#dc2626" : e > 1 ? "#d97706" : "#16a34a",
      background: e > 5 ? "#fee2e2" : e > 1 ? "#ffedd5" : "#dcfce7",
      padding: "4px 12px", borderRadius: "20px", fontSize: "0.85rem"
    })
  };

  return (
    <div style={s.page}>

      {/* ── Header ── */}
      <div style={s.header}>
        <div>
          <h2 style={{ color: "#2e7d32", margin: 0, fontSize: "1.6rem" }}>
            Welcome back, {name} 👋
          </h2>
          <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "0.9rem" }}>
            Here's your carbon footprint overview
          </p>
        </div>
        <button onClick={handleLogout} style={s.actionBtn("linear-gradient(to right,#ef4444,#dc2626)")}>
          Logout
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div style={s.grid3}>
        {[
          { label: "Total Emissions", value: `${total.toFixed(2)} kg`, icon: "🌍", color: "#2e7d32" },
          { label: "This Week", value: `${weeklyTotal.toFixed(2)} kg`, icon: "📅", color: "#0288d1" },
          { label: "Activities Logged", value: data.length, icon: "📋", color: "#7c3aed" },
          { label: "Community Avg", value: `${communityAvg} kg`, icon: "👥", color: "#d97706" },
        ].map((stat, i) => (
          <div key={i} style={s.statCard(stat.color)}>
            <div style={{ fontSize: "1.8rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: "800", color: stat.color, margin: "6px 0" }}>
              {stat.value}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "0.8rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Action Buttons ── */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        {[
          { label: "+ Log Activity", path: "/add-activity", bg: "linear-gradient(to right,#2e7d32,#388e3c)" },
          { label: "📊 Stats", path: "/stats", bg: "linear-gradient(to right,#0288d1,#0277bd)" },
          { label: "📅 Weekly", path: "/weekly", bg: "linear-gradient(to right,#7c3aed,#6d28d9)" },
          { label: "🏆 Leaderboard", path: "/leaderboard", bg: "linear-gradient(to right,#d97706,#b45309)" },
        ].map((b, i) => (
          <button key={i} onClick={() => navigate(b.path)} style={s.actionBtn(b.bg)}>{b.label}</button>
        ))}
      </div>

      <div style={s.grid2}>

        {/* ── Weekly Progress ── */}
        <div style={s.card}>
          <div style={s.sectionTitle}>📈 Weekly Goal Progress</div>
          <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: "10px" }}>
            Goal: {weeklyGoal} kg CO₂ this week
          </p>
          <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "12px", overflow: "hidden" }}>
            <div style={{
              width: `${weeklyProgress}%`, height: "100%", borderRadius: "99px",
              background: weeklyProgress > 80 ? "linear-gradient(to right,#ef4444,#dc2626)"
                        : weeklyProgress > 50 ? "linear-gradient(to right,#f59e0b,#d97706)"
                        : "linear-gradient(to right,#2e7d32,#16a34a)",
              transition: "width 0.6s ease"
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>{weeklyTotal.toFixed(2)} kg used</span>
            <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>{weeklyProgress.toFixed(0)}%</span>
          </div>
          <p style={{
            marginTop: "12px", fontSize: "0.85rem", fontWeight: "600",
            color: weeklyProgress > 80 ? "#dc2626" : weeklyProgress > 50 ? "#d97706" : "#16a34a"
          }}>
            {weeklyProgress > 80 ? "⚠️ Approaching your weekly limit!"
             : weeklyProgress > 50 ? "🔶 Halfway through your goal"
             : "✅ You're doing great this week!"}
          </p>
        </div>

        {/* ── Insight Engine ── */}
        <div style={s.card}>
          <div style={s.sectionTitle}>💡 Insights & Tips</div>
          {topCategory ? (
            <>
              <div style={{
                background: "#fef3c7", borderRadius: "10px", padding: "12px 14px",
                marginBottom: "12px", borderLeft: "4px solid #d97706"
              }}>
                <p style={{ fontWeight: "700", color: "#92400e", margin: 0, fontSize: "0.9rem" }}>
                  🔥 Top Emission: {LABELS[topCategory[0]] || topCategory[0]}
                </p>
                <p style={{ color: "#b45309", margin: "4px 0 0", fontSize: "0.82rem" }}>
                  {topCategory[1].toFixed(2)} kg CO₂ total
                </p>
              </div>
              <p style={{ fontWeight: "600", color: "#374151", fontSize: "0.88rem", marginBottom: "8px" }}>
                Suggestions:
              </p>
              {(TIPS[topCategory[0]] || ["🌱 Keep tracking your emissions!"]).map((tip, i) => (
                <div key={i} style={{
                  padding: "8px 12px", borderRadius: "8px", marginBottom: "6px",
                  background: "#f0fdf4", fontSize: "0.84rem", color: "#166534"
                }}>
                  {tip}
                </div>
              ))}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0", color: "#9ca3af" }}>
              <p style={{ fontSize: "2rem" }}>🌱</p>
              <p>Log activities to get personalized tips!</p>
            </div>
          )}
        </div>
      </div>

      {/* ── You vs Community ── */}
      <div style={{ ...s.card, marginBottom: "20px" }}>
        <div style={s.sectionTitle}>👥 You vs Community Average</div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.82rem", color: "#6b7280", marginBottom: "6px" }}>Your Total</p>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "10px" }}>
              <div style={{
                width: `${Math.min((total / (communityAvg * 3)) * 100, 100)}%`,
                height: "100%", borderRadius: "99px",
                background: "linear-gradient(to right,#2e7d32,#16a34a)"
              }} />
            </div>
            <p style={{ fontWeight: "700", color: "#2e7d32", marginTop: "4px" }}>{total.toFixed(2)} kg</p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.82rem", color: "#6b7280", marginBottom: "6px" }}>Community Avg</p>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "10px" }}>
              <div style={{
                width: `${Math.min((communityAvg / (communityAvg * 3)) * 100, 100)}%`,
                height: "100%", borderRadius: "99px",
                background: "linear-gradient(to right,#0288d1,#0277bd)"
              }} />
            </div>
            <p style={{ fontWeight: "700", color: "#0288d1", marginTop: "4px" }}>{communityAvg} kg</p>
          </div>
          <div style={{
            padding: "10px 18px", borderRadius: "10px", textAlign: "center",
            background: total <= communityAvg ? "#dcfce7" : "#fee2e2"
          }}>
            <p style={{ fontWeight: "800", fontSize: "1.1rem", margin: 0, color: total <= communityAvg ? "#16a34a" : "#dc2626" }}>
              {total <= communityAvg ? "🌟 Below Avg" : "⚠️ Above Avg"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Recent Activity Logs ── */}
      <div style={s.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <div style={s.sectionTitle}>📋 Activity Logs</div>
          <button onClick={() => navigate("/add-activity")} style={s.actionBtn("linear-gradient(to right,#2e7d32,#388e3c)")}>
            + Log Activity
          </button>
        </div>

        {loading && <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px" }}>Loading...</p>}

        {!loading && data.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontSize: "2.5rem" }}>🌱</p>
            <p style={{ color: "#9ca3af" }}>No activities logged yet</p>
            <button onClick={() => navigate("/add-activity")} style={{ ...s.actionBtn("linear-gradient(to right,#2e7d32,#388e3c)"), marginTop: "12px" }}>
              Log Your First Activity
            </button>
          </div>
        )}

        {data.slice(0, 8).map(a => (
          <div key={a._id} style={s.activityRow}>
            <div>
              <p style={{ fontWeight: "600", margin: 0, color: "#1f2937", fontSize: "0.95rem" }}>
                {LABELS[a.type] || a.type}
              </p>
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: "2px 0 0" }}>
                {new Date(a.date).toLocaleDateString()}
              </p>
            </div>
            <span style={s.badge(a.emissions)}>{a.emissions} kg CO₂</span>
          </div>
        ))}

        {data.length > 8 && (
          <p style={{ textAlign: "center", color: "#0288d1", cursor: "pointer", marginTop: "10px", fontSize: "0.9rem" }}
            onClick={() => navigate("/stats")}>
            View all {data.length} activities →
          </p>
        )}
      </div>
    </div>
  );
}
