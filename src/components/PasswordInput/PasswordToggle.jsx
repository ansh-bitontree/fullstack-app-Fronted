import { Eye, EyeOff } from "lucide-react";
import "./PasswordInput.css";

export default function PasswordToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      className="password-toggle-btn"
      onClick={onToggle}
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}
