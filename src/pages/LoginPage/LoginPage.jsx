import AuthHeader from "../../features/auth/components/AuthHeader/AuthHeader";
import LoginForm from "../../features/auth/components/LoginForm/LoginForm";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <AuthHeader title="LOG-IN" subtitle="Welcome back !!" />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
