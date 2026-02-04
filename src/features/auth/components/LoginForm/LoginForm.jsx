import Input from "../../../../components/Input/Input"
import { useState } from "react";
import { validateLogin } from "../../validators/auth.validators";
import './LoginForm.css';
import LoadingButton from "../../../../components/Button/LoadingButton";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import { toast } from "react-toastify";
import PasswordToggle from "../../../../components/PasswordInput/PasswordToggle";

function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const[loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8000/auth/login", values);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        toast.error("Invalid email or password");
      } else {
        setServerError("Server error. Try again later.");
      }
    } finally {
      setLoading(false);
    }

  };

  const handleChange = (e) => {
      const { name, value } = e.target;
  
      const newValues = { ...values, [name]: value };
      setValues(newValues);
  
      if (isSubmitted) {
        setErrors(validateLogin(newValues));
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />

      <div className="password-block">
          <PasswordInput
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            show={showPassword}
          />

          <PasswordToggle
            show={showPassword}
            onToggle={() => setShowPassword(p => !p)}
          />
      </div>

       {serverError && <p className="form-error">{serverError}</p>}

      <LoadingButton type="submit" loading={loading}>
        Login 
      </LoadingButton>

      <div className="login-footer">
        <p className="auth-switch">
          New user? <Link to="/signup">Signup</Link>
        </p>

        <p>
           <Link className="forgot_password" to="/forgot_password">Forgot Password?</Link>
        </p> 
      </div>

    </form>

    
  );
}

export default LoginForm;
