import { useEffect, useState } from "react";
import API from "../api";

export default function Leaderboard() {
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    API.get("/activities/leaderboard/all")
      .then(res=>setUsers(res.data));
  },[]);

  return (
    <div>
      <h2>🏆Leaderboard</h2>

      {users.map((u,i)=>(
        <p key={i}>{u.name} - {u.totalEmissions}</p>
      ))}
    </div>
  );
}