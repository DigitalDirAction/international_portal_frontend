import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import toast from "react-hot-toast";

// Register English locale
countries.registerLocale(enLocale);

const genders = ["Male", "Female", "Other"];
const allCountries = Object.values(countries.getNames("en"));

const Step5 = ({ formData, setFormData }) => {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    setCountryList(allCountries);
  }, []);

  // Validate passport dates
  const handlePassportIssueChange = (value) => {
    const issueDate = new Date(value);
    const expiryDate = new Date(formData.passportExpiryDate);
    if (formData.passportExpiryDate && issueDate > expiryDate) {
      toast.error("Passport issue date cannot be after expiry date");
      return;
    }
    setFormData({ ...formData, passportIssueDate: value });
  };

  const handlePassportExpiryChange = (value) => {
    const issueDate = new Date(formData.passportIssueDate);
    const expiryDate = new Date(value);
    if (formData.passportIssueDate && expiryDate < issueDate) {
      toast.error("Passport expiry date cannot be before issue date");
      return;
    }
    setFormData({ ...formData, passportExpiryDate: value });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" textAlign="center" mb={5} sx={{ color: "#202224" }}>
        Student Details (Personal)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            label="First Name"
            fullWidth
            value={formData.firstName || ""}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Last Name"
            fullWidth
            value={formData.lastName || ""}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Gender"
            fullWidth
            value={formData.gender || ""}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dob || ""}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Citizenship"
            fullWidth
            value={formData.citizenship || ""}
            onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
          >
            {countryList.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Secondary Citizenship (Optional)"
            fullWidth
            value={formData.secondaryCitizenship || ""}
            onChange={(e) => setFormData({ ...formData, secondaryCitizenship: e.target.value })}
          >
            {countryList.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Passport Number"
            fullWidth
            value={formData.passportNumber || ""}
            onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Passport Date of Issue"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.passportIssueDate || ""}
            onChange={(e) => handlePassportIssueChange(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Passport Date of Expiry"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.passportExpiryDate || ""}
            onChange={(e) => handlePassportExpiryChange(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Passport Issuing Country"
            fullWidth
            value={formData.passportCountry || ""}
            onChange={(e) => setFormData({ ...formData, passportCountry: e.target.value })}
          >
            {countryList.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step5;
