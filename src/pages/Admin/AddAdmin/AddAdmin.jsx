import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAdmin = () => {
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    role_id: 1,
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    try {
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admin_register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );
  
      if (response.status === 201 || response.status === 200) {
        toast.success("Admin added successfully!");
        navigate("/admin-list"); // or wherever you want to redirect
      } else {
        toast.error(
          response.data?.message || "Failed to add admin. Please try again."
        );
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errors?.email?.[0] ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
      console.error("Add Admin API error:", error.response || error.message);
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
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#79007712",
          padding: 5,
          borderRadius: 3,
          maxWidth: 480,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="purple"
          mb={4}
          textAlign="center"
        >
          Add New Admin
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Hidden role_id */}
          <input type="hidden" name="role_id" value={formData.role_id} />

          <TextField
            label="Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2, backgroundColor: "#fff" } }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2, backgroundColor: "#fff" } }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2, backgroundColor: "#fff" } }}
          />

          <TextField
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2, backgroundColor: "#fff" } }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "purple",
              textTransform: "none",
              "&:hover": { backgroundColor: "#6a1b9a" },
            }}
            onClick={handleSubmit}
            fullWidth
          >
            Add Admin
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddAdmin;
