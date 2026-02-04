import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import UserMenu from "../features/user/UserMenu";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>
        
      <Route path="/" 
            element={
              <PublicRoute>
                <Navigate to="/login" />
              </PublicRoute>} 
      />

      <Route path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
      />
      <Route path="/signup" 
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
      />
      

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserMenu />
          </ProtectedRoute>
        }
      />

      <Route path="/forgot_password" 
      element={
        <PublicRoute>
          <ForgotPasswordPage />          
        </PublicRoute>
        } 
      />
      
      <Route path="/reset-password" 
      element={
        <PublicRoute>
          <ResetPasswordPage />
        </PublicRoute>
        }
      />
    </Routes>
  );
}
