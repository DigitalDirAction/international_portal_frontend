import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    role: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <Box sx={{ mt: 10, p: 2, flex: 1 }}>
      <Paper
        elevation={3}
        sx={{ px: 7, py: 10, borderRadius: 3, mx: "auto" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              mb={3}
              variant="h5"
              fontWeight="bold"
              color="#1E1E1E"
              gutterBottom
            >
              Ask a Question!
            </Typography>
            <Typography variant="body1" fontSize={"14px"} gutterBottom>
              To submit your inquiry about Superior University to our enquiries team, please
              fill out the form. We are dedicated to providing you with a response within
              24 hours.
            </Typography>
            <Box sx={{ mt: 3, p: 2, backgroundColor: "#eef6fb", borderRadius: 1 }}>
              <Typography variant="body2" fontSize={"12px"}>
                If you need quicker assistance with admissions-related queries during our
                office hours, please don’t hesitate to contact us at our official number:
              </Typography>
              <Typography variant="subtitle1" fontSize={"14px"} fontWeight="bold">
                042-38103777
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel shrink htmlFor="role" sx={{ mt: 3 }}>I am:</InputLabel>
                  <Select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ borderRadius: 1, mt: 5 }}
                  >
                    <MenuItem value="" disabled>
                      Select your role
                    </MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel shrink htmlFor="fullName" sx={{ mt: 3 }}>Full Name</InputLabel>
                  <TextField
                    fullWidth
                    required
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    sx={{ borderRadius: 2, mt: 5 }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel shrink htmlFor="mobile" sx={{ mt: 3 }}>Mobile Number</InputLabel>
                  <Box sx={{ mt: 5 }}>
                    <PhoneInput
                      country={'pk'}
                      value={formData.mobileNumber}
                      onChange={(phone) => setFormData({ ...formData, mobileNumber: phone })}
                      inputStyle={{
                        width: '100%',
                        height: '56px',
                        borderRadius: '4px',
                        fontSize: '16px',
                        
                      }}
                      buttonStyle={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}
                    />
                  </Box>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel shrink htmlFor="email" sx={{ mt: 3 }}>Email</InputLabel>
                  <TextField
                    fullWidth
                    required
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ borderRadius: 2, mt: 5 }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="message" sx={{ mt: 3 }}>Your Message</InputLabel>
                  <TextField
                    fullWidth
                    name="message"
                    id="message"
                    placeholder="Type your message here"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    sx={{ borderRadius: 2, mt: 5 }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} mb={6}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#790077", textTransform:"inherit", px: 5, py: 1.5, borderRadius: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ContactForm;