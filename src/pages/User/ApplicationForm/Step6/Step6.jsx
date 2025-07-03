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
import { City, Country } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

// Register English locale
countries.registerLocale(enLocale);

const Step6 = ({ formData, setFormData }) => {
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountryList(allCountries);
  }, []);

  useEffect(() => {
    const selectedCountry = countryList.find(
      (c) => c.name === formData.contactCountry
    );
  
    if (selectedCountry) {
      setFormData((prev) => ({
        ...prev,
        contactCountryCode: selectedCountry.isoCode,
      }));
  
      const cities = City.getCitiesOfCountry(selectedCountry.isoCode);
      setCityList(cities || []);
    }
  }, [countryList, formData.contactCountry]);  

  const handleCountryChange = (e) => {
    const selectedCountry = countryList.find(c => c.name === e.target.value);
    setFormData({
      ...formData,
      contactCountry: selectedCountry.name,
      contactCountryCode: selectedCountry.isoCode,
      city: "", // reset city on country change
    });
  };

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
          <PhoneInput
            country={'pk'}
            value={formData.phone || ""}
            onChange={(phone) => setFormData({ ...formData, phone })}
            inputStyle={{ width: '100%' }}
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
            label="Country"
            fullWidth
            value={formData.contactCountry || ""}
            onChange={handleCountryChange}
          >
            {countryList.map((country) => (
              <MenuItem key={country.isoCode} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="City"
            fullWidth
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            disabled={!formData.contactCountryCode}
          >
            {cityList.length > 0 ? (
              cityList.map((city) => (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No cities found</MenuItem>
            )}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step6;
