import React, { useState } from "react";
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

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}sendOtp`,
        { email }
      );

      if (response.data.status === 201) {
        toast.success("OTP has been sent to your email.");
        localStorage.setItem("resetEmail", email);
        navigate("/otp");
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("OTP Error:", error.response?.data || error.message);
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
          Forget Password
        </Typography>
        <Typography variant="h6" color="#202224" mb={3}>
          International Students Portal
        </Typography>

        <Box sx={{ textAlign: "left", mt: 5 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Email Address
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email address"
            variant="outlined"
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleReset}
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "purple",
              textTransform: "none",
              "&:hover": { backgroundColor: "#6a1b9a" },
            }}
          >
            Reset Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgetPassword;
