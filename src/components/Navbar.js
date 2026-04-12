import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <div className="navbar">
      🌱 Footprint Logger

      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/stats">My Stats</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </>
        )}
      </div>
    </div>
  );
}