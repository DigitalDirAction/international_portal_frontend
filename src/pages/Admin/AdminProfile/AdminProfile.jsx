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
import toast from "react-hot-toast";

const AdminProfilePage = () => {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    cnic: "",
    mobileNumber: "",
    profileImageFile: null,
    previewImage: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
  });

  const fileInputRef = React.useRef();

  // Fetch profile data on mount
  React.useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token missing.");
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}get_profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        if (response.data && response.data.data) {
          const data = response.data.data;
  
          // Example: API returns relative path like 'profile_image': '/media/profile.jpg'
          // Adjust base URL accordingly
          const baseMediaUrl = import.meta.env.VITE_BASE_URL; // or your media base URL
          const profileImageUrl = data.profile_image
            ? (data.profile_image.startsWith("http")
              ? data.profile_image
              : baseMediaUrl + data.profile_image)
            : "https://cdn-icons-png.flaticon.com/512/706/706830.png";
  
          setFormData((prev) => ({
            ...prev,
            fullName: data.full_name || "",
            email: data.email || "",
            cnic: data.cnic || "",
            mobileNumber: data.mobile_number || "",
            previewImage: profileImageUrl,
          }));
        } else {
          toast.error("Failed to load profile data.");
        }
      } catch (error) {
        toast.error("Error fetching profile data.");
        console.error("Fetch profile error:", error.response?.data || error.message);
      }
    };
  
    fetchProfile();
  }, []);
  

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
      toast.error("Missing user ID or authentication token.");
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
  
      // Check for validation errors in response
      if (response.data.status && response.data.status === 422) {
        // Show all validation error messages
        if (response.data.errors) {
          Object.values(response.data.errors).forEach((errArr) => {
            errArr.forEach((errMsg) => toast.error(errMsg));
          });
        } else {
          toast.error(response.data.message || "Validation errors");
        }
        return; // stop further success toast
      }
  
      // Otherwise, success
      toast.success("Profile saved successfully");
    } catch (error) {
      // Handle errors thrown by axios or server
      if (error.response?.status === 422 && error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((errArr) => {
          errArr.forEach((errMsg) => toast.error(errMsg));
        });
      } else {
        toast.error("Error saving profile");
      }
      console.error("Error saving profile:", error.response?.data || error.message);
    }
  };
  
  

  const handleCancel = () => {
    toast.info("Changes cancelled");
  };

  return (
    <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "100%", m: 2, p: 4, borderRadius: 2 }}>
        <Box sx={{ maxWidth: "500px", justifySelf: "center", width: "100%", py: 2 }}>
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

export default AdminProfilePage;
