import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const ACTIVITY_TYPES = [
  { label: "🚗 Car Trip", value: "car", emissionsPerUnit: 0.21 },
  { label: "✈️ Flight", value: "flight", emissionsPerUnit: 0.255 },
  { label: "🚌 Bus", value: "bus", emissionsPerUnit: 0.089 },
  { label: "🔥 Electricity Use", value: "electricity", emissionsPerUnit: 0.5 },
  { label: "🍔 Meat Meal", value: "meat", emissionsPerUnit: 3.0 },
];

export default function AddActivity() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({ type: "", amount: "" });
  const [emissions, setEmissions] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleTypeChange = (e) => {
    const selected = ACTIVITY_TYPES.find(a => a.value === e.target.value);
    setForm({ ...form, type: e.target.value });
    if (form.amount && selected) {
      setEmissions((form.amount * selected.emissionsPerUnit).toFixed(2));
    }
  };

  const handleAmountChange = (e) => {
    const selected = ACTIVITY_TYPES.find(a => a.value === form.type);
    setForm({ ...form, amount: e.target.value });
    if (selected) {
      setEmissions((e.target.value * selected.emissionsPerUnit).toFixed(2));
    }
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");

      // Validate fields
      if (!form.type) {
        setError("Please select an activity type");
        return;
      }

      if (!form.amount || form.amount <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      if (!userId) {
        setError("You are not logged in. Please login again.");
        navigate("/login");
        return;
      }

      // Debug — show exactly what we're sending
      console.log("Sending:", { userId, type: form.type, emissions: parseFloat(emissions) });

      const res = await API.post("/activities", {
        userId,
        type: form.type,
        emissions: parseFloat(emissions)
      });

      console.log("Success:", res.data);
      setSuccess("✅ Activity logged successfully!");
      setForm({ type: "", amount: "" });
      setEmissions(null);

    } catch (err) {
      // Show exact error from server
      console.error("Full error:", err.response);
      const msg = err.response?.data?.message || err.message || "Failed to log activity";
      setError(`Error: ${msg}`);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🌱 Log New Activity</h2>

        {/* Show userId for debugging */}
        <p style={{ fontSize: "0.75rem", color: "#999" }}>
          User ID: {userId || "NOT FOUND - please login again"}
        </p>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginBottom: "1rem" }}>
          <label>Activity Type</label><br />
          <select
            value={form.type}
            onChange={handleTypeChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          >
            <option value="">-- Select Activity --</option>
            {ACTIVITY_TYPES.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            {form.type === "electricity" ? "kWh Used" :
             form.type === "meat" ? "Number of Meals" :
             "Distance (km)"}
          </label><br />
          <input
            type="number"
            placeholder="Enter amount"
            value={form.amount}
            onChange={handleAmountChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        {emissions && (
          <div style={{
            background: "#f0fdf4", padding: "1rem",
            borderRadius: "8px", marginBottom: "1rem"
          }}>
            <p>Estimated Emissions: <strong>{emissions} kg CO₂</strong></p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%", background: "#16a34a", color: "white",
            border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer"
          }}>
          Log Activity
        </button>

        <p onClick={() => navigate("/dashboard")} style={{
          marginTop: "1rem", textAlign: "center",
          cursor: "pointer", color: "#16a34a"
        }}>
          ← Back to Dashboard
        </p>
      </div>
    </div>
  );
}