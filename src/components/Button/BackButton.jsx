import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/dashboard");
  };

  return (
  
  <button
    className="back"
    onClick={back}
    style={{
      position: "fixed",
      top: "20px",
      left: "20px",
      zIndex: 1000
    }}
  >
    Back
  </button>);
}

export default BackButton;