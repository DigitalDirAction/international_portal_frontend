import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const OtpScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("No email found. Please restart the reset process.");
      navigate("/forget-password");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}verifyOtp`,
        { email, otp }
      );

      if (response.data.status === 201 && response.data.message === "OTP verified successfully.") {
        toast.success("OTP verified successfully");

        localStorage.setItem("resetPasswordID", response.data.data.id);
        // Optionally remove the email from localStorage
        localStorage.removeItem("resetEmail");

        // Navigate to password reset screen or dashboard
        navigate("/reset-password");
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error("OTP verification error:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#79007712",
          padding: 5,
          borderRadius: 3,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="purple" gutterBottom>
          OTP Verification
        </Typography>
        <Typography variant="h6" color="#202224" mb={3}>
          International Students Portal
        </Typography>

        <Box sx={{ textAlign: "left", mt: 5 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Enter OTP Code
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter the 6-digit OTP"
            variant="outlined"
            margin="dense"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2, backgroundColor: "#fff" },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            fontSize: 14,
          }}
        >
          <Button
            onClick={handleVerifyOtp}
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "purple",
              textTransform: "none",
              "&:hover": { backgroundColor: "#6a1b9a" },
            }}
          >
            Verify & Continue
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OtpScreen;
