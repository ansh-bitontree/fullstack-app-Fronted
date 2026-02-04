import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import FormError from "../../../../components/FormError/FormError";
import PasswordToggle from "../../../../components/PasswordInput/PasswordToggle";
import { toast } from "react-toastify";
import { validateResetPassword } from "../../validators/user.validators";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateResetPassword(password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);

      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-wrapper">
      <form className="reset-card" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p className="subtitle">Enter your new password</p>

        {errors.form && <FormError message={errors.form} />}

        <div className="password-block">
          <PasswordInput
            label="New password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            show={showPassword}
          />

          <PasswordInput
            label="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            show={showPassword}
          />

          <PasswordToggle show={showPassword} onToggle={togglePassword} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
