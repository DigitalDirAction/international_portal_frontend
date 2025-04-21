import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}register`,
        {
          email: email,
          role_id: 2, // Adjust role_id as needed
          password: password,
          password_confirmation: confirmPassword,
        }
      );

      if (response.data.status === 201 && response.data.message === "User Register Successfully") {
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error(response.data.errors.email || "Registration failed");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error.response?.data || error.message);
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
          Sign Up
        </Typography>
        <Typography variant="h6" color="#202224" mb={3}>
          International Students Portal
        </Typography>

        <Box sx={{ textAlign: "left", mt: 5 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            placeholder="abc@email.com"
            variant="outlined"
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2, backgroundColor: "#fff" },
            }}
          />
        </Box>

        {/* Password */}
        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="********"
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ sx: { borderRadius: 2, backgroundColor: "#fff" } }}
          />
        </Box>

        {/* Confirm Password */}
        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            label="********"
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{ sx: { borderRadius: 2, backgroundColor: "#fff" } }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSignup}
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "purple",
                textTransform: "none",
                "&:hover": { backgroundColor: "#6a1b9a" },
              }}
            >
              Sign Up
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignSelf: "end",
              justifyContent: "flex-end",
              maxWidth: "200px",
            }}
          >
            <Typography component="span" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
              Already have an account?
            </Typography>
            <Link
              href="/"
              sx={{
                color: "black",
                textDecoration: "underline",
                fontFamily: "Roboto, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Login here
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
