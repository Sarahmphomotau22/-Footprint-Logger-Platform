import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.name);

    navigate("/dashboard");
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password"type="password" onChange={e=>setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>

      <p className="link" onClick={()=>navigate("/reset")}>
        Forgot Password?
      </p>
    </div>
  );
}

export default Login;   // 