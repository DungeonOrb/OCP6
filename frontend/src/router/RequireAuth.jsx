import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";

export default function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/connexion" replace />;
  }
  return <Outlet />;
}