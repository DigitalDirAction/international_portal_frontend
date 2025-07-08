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
  FormControl,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

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

          const baseMediaUrl = import.meta.env.VITE_BASE_URL;
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
    const { name, value } = e.target;

    if (name === "cnic") {
      let digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 13) digitsOnly = digitsOnly.slice(0, 13);
      let formatted = digitsOnly;
      if (digitsOnly.length > 5) {
        formatted = digitsOnly.slice(0, 5) + '-' + digitsOnly.slice(5);
      }
      if (digitsOnly.length > 12) {
        formatted = digitsOnly.slice(0, 5) + '-' + digitsOnly.slice(5, 12) + '-' + digitsOnly.slice(12);
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (value) => {
    // value is the full number like +923001234567
    setFormData((prev) => ({ ...prev, mobileNumber: value }));
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

    // Basic CNIC and phone validation
    if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      toast.error("Invalid CNIC format");
      return;
    }

    const cleanedPhone = formData.mobileNumber.replace(/[^\d+]/g, "");

    if (!/^\+\d{10,15}$/.test(cleanedPhone)) {
      toast.error("Invalid mobile number format");
      return;
    }


    const formPayload = new FormData();
    formPayload.append("user_id", userId);
    formPayload.append("full_name", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("cnic", formData.cnic);
    formPayload.append("mobile_number", cleanedPhone);

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

      if (response.data.status && response.data.status === 422) {
        if (response.data.errors) {
          Object.values(response.data.errors).forEach((errArr) => {
            errArr.forEach((errMsg) => toast.error(errMsg));
          });
        } else {
          toast.error(response.data.message || "Validation errors");
        }
        return;
      }

      toast.success("Profile saved successfully");
    } catch (error) {
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
              placeholder="xxxxx-xxxxxxx-x"
            />

<Box sx={{ position: "relative" }}>
  <Typography
    sx={{
      position: "absolute",
      top: "-10px",
      left: "12px",
      background: "#fff",
      zIndex: 20,
      fontSize: 13,
      color: "rgba(0, 0, 0, 0.6)",
      px: 0.5,
    }}
  >
    Mobile Number
  </Typography>
  <PhoneInput
    country={"pk"}
    value={formData.mobileNumber}
    onChange={handlePhoneChange}
    inputStyle={{ width: "100%", height: "56px" }}
    inputProps={{
      name: "mobileNumber",
      required: true,
    }}
  />
</Box>

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
