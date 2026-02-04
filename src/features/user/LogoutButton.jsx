import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
  
  <button
    className="logout"
    onClick={logout}
    style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 1000
    }}
  >
    Logout
  </button>);
}

export default LogoutButton;