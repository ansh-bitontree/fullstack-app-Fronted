import "./Dashboard.css";
import userProfile from "../../assets/icons/userProfile.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const[username, setUsername] = useState("")

  useEffect(() =>{
    api.get("/users/me")
      .then((res) => setUsername(res.data.username))
      .catch(console.error);

  },[]);

  return (
    <div className="dashboard">
      <section className="hero">
        <h1>Welcome, {username}👋</h1>
        <p>Your personal dashboard</p>
      </section>

      <img
        className="userProfile"
        src={userProfile}
        alt="user profile"
        onClick={() => navigate("/user")}
        style={{ cursor: "pointer" }}
      />

    </div>
  );
}
