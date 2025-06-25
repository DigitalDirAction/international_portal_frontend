import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cap from '../../../../assets/Cap.svg';
import Transfer from '../../../../assets/Data transfer.svg';

const Step1 = ({ selectedType, setSelectedType }) => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" mb={3} sx={{ color: "#202224", letterSpacing: "0.3px" }}>
        Please select Application Type
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* First Year Student Card */}
        <Grid item>
          <Box textAlign="center" position="relative">
            <Card
              variant="outlined"
              sx={{
                width: 180,
                borderRadius: 2,
                borderColor: selectedType === "first_year_student" ? "#790077" : "#ccc",
                position: 'relative',
              }}
            >
              <CardActionArea onClick={() => setSelectedType("first_year_student")}>
                <CardContent sx={{ py: 7 }}>
                  <img src={Cap} alt="First Year" style={{ width: 50, height: 50 }} />
                </CardContent>
              </CardActionArea>

              {selectedType === "first_year_student" && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    color: '#790077',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                  }}
                />
              )}
            </Card>
            <Typography mt={1.5} fontSize="15px" color="#202224">
              First Year Student
            </Typography>
          </Box>
        </Grid>

        {/* Semester Exchange Card */}
        <Grid item>
          <Box textAlign="center" position="relative">
            <Card
              variant="outlined"
              sx={{
                width: 180,
                borderRadius: 2,
                borderColor: selectedType === "semester_exchange" ? "#790077" : "#ccc",
                position: 'relative',
              }}
            >
              <CardActionArea onClick={() => setSelectedType("semester_exchange")}>
                <CardContent sx={{ py: 7 }}>
                  <img src={Transfer} alt="Exchange" style={{ width: 40, height: 50 }} />
                </CardContent>
              </CardActionArea>

              {selectedType === "semester_exchange" && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    color: '#790077',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                  }}
                />
              )}
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
