import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";

import Connexion from "../pages/Connexion";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/connexion" replace />} />

      {/* Public */}
      <Route path="/connexion" element={<Connexion />} />

      {/* Protected */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}