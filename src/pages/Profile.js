
import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  const handleUpdate = () => {
    alert("Profile updated (connect backend later)");
  };

  return (
    <div>
      <h2>User Profile</h2>

      <input
        placeholder="Name"
        onChange={(e)=>setUser({...user, name:e.target.value})}
      />

      <input
        placeholder="Email"
        onChange={(e)=>setUser({...user, email:e.target.value})}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}