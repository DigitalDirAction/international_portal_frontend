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
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const UserID = localStorage.getItem('resetPasswordID')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill out both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}change_password/${UserID}`,
        {
          password,
          password_confirmation: confirmPassword,
        }
      );

      if (response.data.status === 200) {
        toast.success("Password reset successful");
        localStorage.removeItem("resetPasswordID");
        navigate("/");
      } else {
        toast.error(response.data.message || "Reset failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Reset Error:", error.response?.data || error.message);
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
          Reset Password
        </Typography>
        <Typography variant="h6" color="#202224" mb={3}>
          International Students Portal
        </Typography>

        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            variant="outlined"
            label="********"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2, backgroundColor: "#fff" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            label="********"
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2, backgroundColor: "#fff" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "start", fontSize: 14 }}>
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

export default ResetPassword;
