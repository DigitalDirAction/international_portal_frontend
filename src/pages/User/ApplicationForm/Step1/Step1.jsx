// src/components/ApplicationForm/Step1_ApplicationType.jsx
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";

const Step1 = ({ selectedType, setSelectedType }) => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" mb={3} sx={{ color: "#202224", letterSpacing: "0.3px" }}>
        Please select Application Type
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Box textAlign="center">
            <Card
              variant="outlined"
              sx={{
                width: 180,
                borderRadius: 2,
                borderColor: selectedType === "first_year_student" ? "#790077" : "#ccc",
              }}
            >
              <CardActionArea onClick={() => setSelectedType("first_year_student")}>
                <CardContent sx={{ py: 7 }}>
                  <img src="/src/assets/Cap.svg" alt="First Year" style={{ width: 50, height: 50 }} />
                </CardContent>
              </CardActionArea>
            </Card>
            <Typography mt={1.5} fontSize="15px" color="#202224">
              First Year Student
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <Box textAlign="center">
            <Card
              variant="outlined"
              sx={{
                width: 180,
                borderRadius: 2,
                borderColor: selectedType === "semester_exchange" ? "#790077" : "#ccc",
              }}
            >
              <CardActionArea onClick={() => setSelectedType("semester_exchange")}>
                <CardContent sx={{ py: 7 }}>
                  <img src="/src/assets/Data transfer.svg" alt="Exchange" style={{ width: 40, height: 50 }} />
                </CardContent>
              </CardActionArea>
            </Card>
            <Typography mt={1.5} fontSize="15px" color="#202224">
              Semester Exchange
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
