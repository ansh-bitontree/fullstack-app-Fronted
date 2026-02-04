import AuthHeader from "../../features/auth/components/AuthHeader/AuthHeader";
import SignupForm from "../../features/auth/components/SignupForm/SignupForm";
import "./SignupPage.css";


export default function SignupPage() {
  return(
    <div className="signup-page">
      <div className="signup-card">
        <AuthHeader title="Sign Up" subtitle="Create your account !" />
        <SignupForm />
      </div>
    </div>
  );
}


