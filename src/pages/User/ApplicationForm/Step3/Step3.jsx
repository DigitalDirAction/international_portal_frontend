import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Bachelors from '../../../../assets/Bachelorsdegree.svg';
import Masters from '../../../../assets/Graduation.svg';
import Associate from '../../../../assets/Settings.svg';
import PHD from '../../../../assets/Open book.svg';

const degreeOptions = [
  { value: "bachelors", label: "Bachelors", icon: Bachelors },
  { value: "masters", label: "Masters", icon: Masters },
  { value: "associate", label: "Associate", icon: Associate },
  { value: "phd", label: "PhD", icon: PHD },
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
            <Box textAlign="center" position="relative">
              <Card
                variant="outlined"
                sx={{
                  width: 160,
                  borderRadius: 2,
                  borderColor: selectedDegree === option.value ? "#790077" : "#ccc",
                  position: "relative",
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

                {selectedDegree === option.value && (
                  <CheckCircleIcon
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "#790077",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                )}
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
