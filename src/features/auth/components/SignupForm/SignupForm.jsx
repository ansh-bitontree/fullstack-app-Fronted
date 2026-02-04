import { useState } from "react";
import Input from "../../../../components/Input/Input";
import { validateSingup } from "../../validators/auth.validators";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingButton from "../../../../components/Button/LoadingButton";
import "./SignupForm.css";
import { toast } from "react-toastify";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import PasswordToggle from "../../../../components/PasswordInput/PasswordToggle";

export default function SignupForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (isSubmitted) {
      setErrors(validateSingup(newValues));
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setIsSubmitted(true);

    const validationErrors = validateSingup(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const payload = {
        username: values.username,
        email: values.email,
        address: values.address,
        dob: values.dob,
        gender: values.gender,
        password: values.password,
        confirm_password: values.confirmPassword,
      };

      await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <Input 
        label="Username" 
        name="username" 
        value={values.username} 
        onChange={handleChange} 
        error={errors.username} 
      />

      <Input 
        label="Email" 
        name="email" 
        value={values.email} 
        onChange={handleChange} 
        error={errors.email} 
      />

      <Input 
        label="Address" 
        name="address" 
        value={values.address} 
        onChange={handleChange} 
        error={errors.address} 
      />

      <Input 
        label="Date of Birth" 
        type="date" 
        name="dob"
        max={new Date().toISOString().split("T")[0]}
        value={values.dob} 
        onChange={handleChange} 
        error={errors.dob} 
      />

      <div className="select-group">
        <label>Gender</label>
        <select name="gender" value={values.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

      <div className="password-block">
        <PasswordInput
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          show={showPassword}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          show={showPassword}
        />
        <PasswordToggle show={showPassword} onToggle={togglePassword} />
      </div>


      {serverError && <p className="form-error">{serverError}</p>}

      <LoadingButton type="submit" loading={loading}>
        Sign Up
      </LoadingButton>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
