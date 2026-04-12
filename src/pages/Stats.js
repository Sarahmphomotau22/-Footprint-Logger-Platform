import { useEffect, useState } from "react";
import API from "../api";

export default function Stats() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    API.get("/activities", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => setActivities(res.data));
  }, []);

  const total = activities.reduce((sum, a) => sum + a.emissions, 0);

  return (
    <div className="container">
      <div className="card">
        <h2>My Stats</h2>
        <p>Total Emissions: {total.toFixed(2)} kg</p>
        <p>Activities Logged: {activities.length}</p>
      </div>
    </div>
  );
}