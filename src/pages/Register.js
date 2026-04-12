import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm: ""
  });

  const handleRegister = async () => {
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    await API.post("/auth/register", form);

    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="card">
      <h2>Create Account</h2>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Surname" onChange={e=>setForm({...form,surname:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <input type="password" placeholder="Confirm Password" onChange={e=>setForm({...form,confirm:e.target.value})}/>

      <button onClick={handleRegister}>Register</button>

      <p className="link" onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;   // ✅ VERY IMPORTANT