import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data,setData]=useState([]);
  const name = localStorage.getItem("name");

  useEffect(()=>{
    const userId="PUT_USER_ID";
    API.get(`/activities/${userId}`)
      .then(res=>setData(res.data));
  },[]);

  return (
    <div>
      <h2>Welcome {name}</h2>

      {data.map(a=>(
        <p key={a._id}>{a.type} - {a.emissions}</p>
      ))}
    </div>
  );
}