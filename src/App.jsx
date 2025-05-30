import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/login";
import Signup from "./pages/Auth/Signup/Signup";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import OtpScreen from "./pages/Auth/Otp/Otp";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Dashboard from "./pages/User/Dashboard/Dashboard";
import ProfilePage from "./pages/User/Profile/Profile";
import MyApplications from "./pages/User/MyApplications/MyApplications";
import ContactForm from "./pages/User/Contact/Contact";
import ApplicationForm from "./pages/User/ApplicationForm/ApplicationForm";
import Sidebar from "./components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ViewDetails from "./pages/Admin/AdminViewDetails/ViewDetails";
import AddAdmin from "./pages/Admin/AddAdmin/AddAdmin";
import AdminList from "./pages/Admin/AdminList/AdminList";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AllApplications from "./pages/Admin/AllApplications/AllApplications";
import AdminProfilePage from "./pages/Admin/AdminProfile/AdminProfile";
import UserViewDetails from "./pages/User/UserViewDetails/UserViewDetails";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const checkToken = () => setToken(localStorage.getItem("token"));
    checkToken();
    const interval = setInterval(checkToken, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Toaster />
      <Box display="flex">
        {/* ✅ Show sidebar only on larger screens */}
        {!isSmallScreen && token && <Sidebar />}

        <Box width="100%" minHeight="100vh" sx={{ backgroundColor: "#e0e0e0" }}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login onLogin={() => setToken(localStorage.getItem("token"))} />
                </PublicRoute>
              }
            />
            <Route path="/register" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/forget-password" element={<PublicRoute><ForgetPassword /></PublicRoute>} />
            <Route path="/otp" element={<PublicRoute><OtpScreen /></PublicRoute>} />
            <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

            {/* User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user']}><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={['user']}><ProfilePage /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute allowedRoles={['user']}><MyApplications /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute allowedRoles={['user']}><ContactForm /></ProtectedRoute>} />
            <Route path="/application-form/:applicationId/step/:stepNumber" element={<ProtectedRoute allowedRoles={['user']}><ApplicationForm /></ProtectedRoute>} />
            <Route path="/application-form" element={<Navigate to="/application-form/new/step/0" />} />
            <Route path="/user-view-details/:applicationId" element={<ProtectedRoute allowedRoles={['user']}><UserViewDetails /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin-profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfilePage /></ProtectedRoute>} />
            <Route path="/add-admin" element={<ProtectedRoute allowedRoles={['admin']}><AddAdmin /></ProtectedRoute>} />
            <Route path="/admin-list" element={<ProtectedRoute allowedRoles={['admin']}><AdminList /></ProtectedRoute>} />
            <Route path="/all-applications" element={<ProtectedRoute allowedRoles={['admin']}><AllApplications /></ProtectedRoute>} />
            <Route path="/view-details" element={<ProtectedRoute allowedRoles={['admin']}><ViewDetails /></ProtectedRoute>} />
            <Route path="/view-details/:applicationId" element={<ProtectedRoute allowedRoles={['admin']}><ViewDetails /></ProtectedRoute>} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;
