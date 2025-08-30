import React from "react";
import { Navigate } from "react-router-dom";

// role: "teacher" or "student"
// user: current user object (e.g., from context or props)
const ProtectedRoute = ({ user, role, children }) => {
  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }
  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/" />;
  }
  // User is authenticated and has right role
  return children;
};

export default ProtectedRoute;
