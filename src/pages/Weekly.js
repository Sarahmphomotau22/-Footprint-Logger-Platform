import { useEffect, useState } from "react";
import API from "../api";

export default function Weekly() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    API.get("/activities/weekly", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => setActivities(res.data));
  }, []);

  const total = activities.reduce((sum, a) => sum + a.emissions, 0);

  return (
    <div className="container">
      <h2>Weekly Summary</h2>

      <div className="card">
        <h3>Total Emissions: {total.toFixed(2)} kg CO₂</h3>

        <ul>
          {activities.map(a => (
            <li key={a._id}>
              {a.type} - {a.emissions}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}