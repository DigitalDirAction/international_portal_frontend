import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login/login";
import Signup from "./pages/Auth/Signup/Signup";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import OtpScreen from "./pages/Auth/Otp/Otp";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfilePage from "./pages/Profile/Profile";
import MyApplications from "./pages/MyApplications/MyApplications";
import ContactForm from "./pages/Contact/Contact";
import ApplicationForm from "./pages/ApplicationForm/ApplicationForm";

import Sidebar from "./components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

// Route guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

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

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><ContactForm /></ProtectedRoute>} />
            <Route path="/application-form/:applicationId/step/:stepNumber" element={<ProtectedRoute><ApplicationForm /></ProtectedRoute>} />
            <Route path="/application-form" element={<Navigate to="/application-form/new/step/0" />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;
