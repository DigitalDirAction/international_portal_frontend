// src/components/ApplicationForm/Step5_StudentDetails.jsx
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { KeyboardBackspace, East } from "@mui/icons-material";

const genders = ["Male", "Female", "Other"];
const countries = ["Pakistan", "United States", "Canada", "India", "United Kingdom"];

const Step5 = ({ formData, setFormData}) => {
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
            {countries.map((c) => (
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
            {countries.map((c) => (
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
            onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Passport Date of Expiry"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.passportExpiryDate || ""}
            onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
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

export default Step5;
