// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming you store role in localStorage
  
  if (!token) {
    return <Navigate to="/" />;
  }

  // If allowedRoles is not specified or user's role is included in allowedRoles
  if (!allowedRoles || allowedRoles.includes(userRole)) {
    return children;
  }

  // Redirect to appropriate dashboard based on role if not authorized
  return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/dashboard'} />;
};

export default ProtectedRoute;