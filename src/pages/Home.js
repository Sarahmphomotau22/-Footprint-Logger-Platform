


import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div>
        <h1>Welcome to Footprint Logger</h1>
        <p>Track your carbon footprint and reduce your impact</p>

        <button onClick={() => navigate("/register")}>
          Get Started
        </button>

        
      </div>
    </div>
  );
}