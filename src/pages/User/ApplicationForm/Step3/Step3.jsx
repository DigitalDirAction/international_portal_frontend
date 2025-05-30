// src/components/ApplicationForm/Step3_SelectDegree.jsx
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";

const degreeOptions = [
  { value: "bachelors", label: "Bachelors", icon: "/src/assets/Bachelorsdegree.svg" },
  { value: "masters", label: "Masters", icon: "/src/assets/Graduation.svg" },
  { value: "associate", label: "Associate", icon: "/src/assets//Settings.svg" },
  { value: "phd", label: "PhD", icon: "/src/assets/Open book.svg" },
];

const Step3 = ({ selectedDegree, setSelectedDegree }) => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" mb={3} sx={{ color: "#202224", letterSpacing: "0.3px" }}>
        Please Select the Degree
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {degreeOptions.map((option) => (
          <Grid item key={option.value}>
            <Box textAlign="center">
              <Card
                variant="outlined"
                sx={{
                  width: 160,
                  borderRadius: 2,
                  borderColor: selectedDegree === option.value ? "#790077" : "#ccc",
                }}
              >
                <CardActionArea onClick={() => setSelectedDegree(option.value)}>
                  <CardContent
                    sx={{
                      py: 7,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img src={option.icon} alt={option.label} style={{ width: 40, height: 40 }} />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Typography mt={1.5} fontSize="15px" color="#202224">
                {option.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Step3;
