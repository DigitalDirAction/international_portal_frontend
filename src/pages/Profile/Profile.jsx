import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import axios from "axios";

const ProfilePage = () => {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    cnic: "",
    mobileNumber: "",
    profileImageFile: null,
    previewImage: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
  });

  const fileInputRef = React.useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImageFile: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("Missing user ID or token in localStorage");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("user_id", userId);
    formPayload.append("full_name", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("cnic", formData.cnic);
    formPayload.append("mobile_number", formData.mobileNumber);

    if (formData.profileImageFile) {
      formPayload.append("profile_image", formData.profileImageFile);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}set_profile`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile saved:", response.data);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    console.log("Cancelled changes");
  };

  return (
    <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "100%", m: 2, p: 4, borderRadius: 2 }}>
        <Box sx={{ maxWidth: "500px", justifySelf: "center", width: "100%", py:2 }}>
          <Typography variant="h6" sx={{ backgroundColor: "#f2f2f2", p: 1.5, borderRadius: 1 }}>
            My Profile
          </Typography>

          <Box textAlign="center" mt={3}>
            <Avatar
              src={formData.previewImage}
              alt="Profile"
              sx={{ width: 96, height: 96, mx: "auto", cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <Typography
              color="#9c27b0"
              fontSize={14}
              mt={1}
              sx={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              Change
            </Typography>
          </Box>

          <Stack spacing={2} mt={4}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </Stack>

          <Grid container spacing={2} mt={4}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "#f3e5f5", color: "#9c27b0" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#d1b3e0" }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
