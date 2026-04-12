import { useState } from "react";
import API from "../api";

export default function Reset() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    await API.post("/auth/forgot-password", { email });
    alert("Check console for reset link");
  };

  return (
    <div className="card">
      <h2>Reset Password</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <button onClick={handleReset}>Send Reset Link</button>
    </div>
  );
}