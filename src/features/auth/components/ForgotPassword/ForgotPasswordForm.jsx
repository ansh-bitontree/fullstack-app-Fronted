import { useState } from "react";
import "./ForgotPasswordForm.css";
import { EMAIL_REGEX } from "../../../../utils/regex";
import axios from "axios";
import { toast } from "react-toastify";


function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (isSubmitted) {
      if (!EMAIL_REGEX.test(value)) {
        setError("Invalid e-mail");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSuccess("");

    if (!EMAIL_REGEX.test(email)) {
      setError("Invalid e-mail");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/auth/forget_password", { email });
      toast.info("If this email exists, a reset link has been sent.");
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="forgot-password" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password</p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
        disabled={loading}
      />

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send e-mail"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
