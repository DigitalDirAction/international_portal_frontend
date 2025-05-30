// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  if (!token) {
    return children;
  }

  // Redirect to appropriate dashboard based on role
  return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/dashboard'} />;
};

export default PublicRoute;