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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}login`,
      {
        registration_number: registrationNumber,
        password: password,
      }
    );

    if(response.data.status == 200) {
      console.log("Login successful:", response.data);
      const role = response.data.data.roles[0].name;
      toast.success("Login Successfull");
      
          // Navigate after login only if successful
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("userId", response.data.data.id)
          localStorage.setItem("role", response.data.data.roles[0].name)
          localStorage.setItem("fullName", response.data.data.full_name)
          if(role==='admin') {
            navigate("/admin-dashboard");
          }
          else {
            navigate("/dashboard");
          }
    }
    else{
      const status = response?.data.status;
      const message = response?.data?.message;
  
      if (status === 401 && message === "Not registered") {
        toast.error("Email not registered");
        return;
      }
    }

  } catch (error) {
    

    toast.error("Login failed. Please try again.");
    console.error("Login failed:", error.response?.data || error.message);
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
          LogIn
        </Typography>
        <Typography variant="h6" color="#202224" mb={3}>
          International Students Portal
        </Typography>

        <Box sx={{ textAlign: "left", mt: 5 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Email / Registration Number
          </Typography>
          <TextField
            fullWidth
            placeholder="abc@email.com / SU92-MBATW-S24-008"
            variant="outlined"
            margin="dense"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2, backgroundColor: "#fff" },
            }}
          />
        </Box>

        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#202224" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            placeholder="********"
            type="password"
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ sx: { borderRadius: 2, backgroundColor: "#fff" } }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "purple",
                textTransform: "none",
                "&:hover": { backgroundColor: "#6a1b9a" },
              }}
            >
              Sign In
            </Button>
            <Link
              href="/forget-password"
              sx={{
                color: "black",
                textDecoration: "underline",
                fontFamily: "Roboto, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Forget Password?
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignSelf: "end",
              justifyContent: "flex-end",
              maxWidth: "250px",
            }}
          >
            <Typography component="span" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
              Don’t have an account?
            </Typography>
            <Link
              href="/register"
              sx={{
                color: "black",
                textDecoration: "underline",
                fontFamily: "Roboto, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Create one here
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
