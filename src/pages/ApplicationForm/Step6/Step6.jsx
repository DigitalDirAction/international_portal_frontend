// src/components/ApplicationForm/Step6_ContactDetails.jsx
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { KeyboardBackspace, East } from "@mui/icons-material";

const countries = ["Pakistan", "United States", "Canada", "India", "United Kingdom"];
const cities = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Multan"];

const Step6 = ({ formData, setFormData}) => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" textAlign="center" mb={5} sx={{ color: "#202224" }}>
        Student Details (Contact)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Father Name"
            fullWidth
            value={formData.fatherName || ""}
            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Mother Name"
            fullWidth
            value={formData.motherName || ""}
            onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Phone Number"
            fullWidth
            InputProps={{ startAdornment: <Box mr={1}>🇵🇰 +92</Box> }}
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Address"
            fullWidth
            value={formData.address || ""}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="City"
            fullWidth
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Country"
            fullWidth
            value={formData.contactCountry || ""}
            onChange={(e) => setFormData({ ...formData, contactCountry: e.target.value })}
          >
            {countries.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* <Box p={5} mt={1} display="flex" justifyContent="space-between">
        <Button
          sx={{ backgroundColor: "#DBDBDB", textTransform: "none", gap: 1, color: "#404040", px: 2 }}
          onClick={handleBack}
        >
          <KeyboardBackspace
            sx={{ border: "1px solid #404040", borderRadius: "50%", padding: "3px", fontSize: "13px", color: "#404040" }}
          />
          Back
        </Button>

        <Button
          onClick={handleNext}
          sx={{ backgroundColor: "#790077", textTransform: "none", gap: 1, color: "white", px: 2 }}
        >
          Next
          <East
            sx={{ border: "1px solid white", borderRadius: "50%", padding: "3px", fontSize: "13px", color: "white" }}
          />
        </Button>
      </Box> */}
    </Box>
  );
};

export default Step6;