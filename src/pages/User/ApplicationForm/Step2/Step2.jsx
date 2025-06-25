import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Step2 = ({ selectedTerm, setSelectedTerm }) => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" mb={3} sx={{ color: "#202224", letterSpacing: "0.3px" }}>
        Please Select the Term
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Fall Term */}
        <Grid item>
          <Box textAlign="center" position="relative">
            <Card
              variant="outlined"
              sx={{
                width: 200,
                borderRadius: 2,
                borderColor: selectedTerm === "fall" ? "#790077" : "#ccc",
                position: "relative",
              }}
            >
              <CardActionArea onClick={() => setSelectedTerm("fall")}>
                <CardContent sx={{ py: 7, px: 4 }}>
                  <Typography fontSize="16px" fontWeight="500">
                    August–December 2024
                  </Typography>
                </CardContent>
              </CardActionArea>

              {selectedTerm === "fall" && (
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
              Fall
            </Typography>
          </Box>
        </Grid>

        {/* Spring Term */}
        <Grid item>
          <Box textAlign="center" position="relative">
            <Card
              variant="outlined"
              sx={{
                width: 200,
                borderRadius: 2,
                borderColor: selectedTerm === "spring" ? "#790077" : "#ccc",
                position: "relative",
              }}
            >
              <CardActionArea onClick={() => setSelectedTerm("spring")}>
                <CardContent sx={{ py: 7, px: 4 }}>
                  <Typography fontSize="16px" fontWeight="500">
                    January–May 2025
                  </Typography>
                </CardContent>
              </CardActionArea>

              {selectedTerm === "spring" && (
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
              Spring
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;
