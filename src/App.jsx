import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login/login";
import Signup from "./pages/Auth/Signup/Signup";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import OtpScreen from "./pages/Auth/Otp/Otp";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Profile } from "./pages/Profile/Profile";
import { MyApplications } from "./pages/MyApplications/MyApplications";
import { Contact } from "./pages/Contact/Contact";
import Sidebar from "./components/Sidebar/Sidebar";

// Route guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Listen to token changes manually
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    // Call on mount
    checkToken();

    // Setup interval polling or add a listener
    const interval = setInterval(() => {
      checkToken();
    }, 500); // check every 0.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Box display="flex">
          {token && <Sidebar />}
          <Box flexGrow={1} sx={{backgroundColor: "#e0e0e0"}}>
            <Routes>
              <Route path="/" element={<PublicRoute><Login onLogin={() => setToken(localStorage.getItem("token"))} /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/forget-password" element={<PublicRoute><ForgetPassword /></PublicRoute>} />
              <Route path="/otp" element={<PublicRoute><OtpScreen /></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  );
};

export default App;
