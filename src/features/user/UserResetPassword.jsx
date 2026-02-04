import { useState } from "react";
import { validateUserResetPassword } from "../auth/validators/user.validators";
import api from "../../services/api";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import PasswordToggle from "../../components/PasswordInput/PasswordToggle";

function UserResetPassword({ onBack }) {
  const [values, setValues] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const[serverError, setServerError] = useState("")
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  const handleReset = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    const validationErrors = validateUserResetPassword(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await api.post("/users/change-password", values);
      toast.success("Password updated!");
      onBack();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="user_reset" onSubmit={handleReset}>
      <h2>Update Password</h2>

      <div className="password-block">
        <PasswordInput
          label="Current Password"
          type="password"
          name="current_password"
          value={values.current_password}
          onChange={handleChange}
          error={errors.current_password}
          show={showCurrent}
        />

        <PasswordToggle
          show={showCurrent}
          onToggle={() => setShowCurrent(prev => !prev)}
        />
      </div>

      

      <div className="password-block">
        <PasswordInput
          label="New Password"
          type="password"
          name="new_password"
          value={values.new_password}
          onChange={handleChange}
          error={errors.new_password}
          show={showNew}
        />

        <PasswordInput
          label="Confirm Password"
          type="password"
          name="confirm_password"
          value={values.confirm_password}
          onChange={handleChange}
          error={errors.confirm_password}
          show={showNew}
        />

        <PasswordToggle show={showNew} onToggle={() => setShowNew(prev => !prev)} />
      </div>

      <div className="actions">
        {serverError && <p className="form-error">{serverError}</p>}
        <button onClick={handleReset} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onBack}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserResetPassword;



