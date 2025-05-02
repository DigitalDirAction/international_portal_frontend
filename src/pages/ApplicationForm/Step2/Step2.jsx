// src/components/ApplicationForm/Step2_SelectTerm.jsx
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";

const Step2 = ({ selectedTerm, setSelectedTerm }) => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" mb={3} sx={{ color: "#202224", letterSpacing: "0.3px" }}>
        Please Select the Term
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Box textAlign="center">
            <Card
              variant="outlined"
              sx={{
                width: 200,
                borderRadius: 2,
                borderColor: selectedTerm === "fall" ? "#790077" : "#ccc",
              }}
            >
              <CardActionArea onClick={() => setSelectedTerm("fall")}>
                <CardContent sx={{ py: 7, px: 4 }}>
                  <Typography fontSize="16px" fontWeight="500">
                    August–December 2024
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Typography mt={1.5} fontSize="15px" color="#202224">
              Fall
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <Box textAlign="center">
            <Card
              variant="outlined"
              sx={{
                width: 200,
                borderRadius: 2,
                borderColor: selectedTerm === "spring" ? "#790077" : "#ccc",
              }}
            >
              <CardActionArea onClick={() => setSelectedTerm("spring")}>
                <CardContent sx={{ py: 7, px: 4 }}>
                  <Typography fontSize="16px" fontWeight="500">
                    January–May 2025
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Typography mt={1.5} fontSize="15px" color="#202224">
              Spring
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;
