import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

const Step4 = ({ selectedProgram, setSelectedProgram}) => {

  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("");
  const [thesis, setThesis] = useState("");

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust if you're passing token via props/context
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}program`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setPrograms(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(
    (program) =>
      program.program_name.toLowerCase().includes(search.toLowerCase()) &&
      (duration ? program.duration === duration : true) &&
      (thesis ? program.thesis === thesis : true)
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" textAlign="center" mb={5} sx={{ color: "#202224", letterSpacing: "0.3px" }}>
        Please Select a Program
      </Typography>

      <Grid container spacing={3} maxHeight={300} overflow="auto" padding="0px 20px">
        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 2, border: "1px solid #404040", borderRadius: "10px" }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>Filter Programs</Typography>
            <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "0.9rem", color: "#686868", mb: "3px" }}>
              Search for program
            </Typography>
            <TextField
              label="Search program name..."
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2, backgroundColor: "#F5F6FA", color: "#404040", fontWeight: 300 }}
            />
            <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "0.9rem", color: "#686868", mb: "3px" }}>
              Duration
            </Typography>
            <TextField
              label="Duration"
              select
              fullWidth
              size="small"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                setSelectedDuration(e.target.value); // lift up
              }}
              sx={{ mb: 2, backgroundColor: "#F5F6FA", color: "#404040", fontWeight: 300 }}
            >
              <MenuItem value="">- Select -</MenuItem>
              <MenuItem value="4years">4 Years</MenuItem>
              {/* Add more durations as needed */}
            </TextField>
            <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "0.9rem", color: "#686868", mb: "3px" }}>
              Thesis - Without Thesis
            </Typography>
            <TextField
              label="Thesis"
              select
              fullWidth
              size="small"
              value={thesis}
              onChange={(e) => {
                setThesis(e.target.value);
                setSelectedThesis(e.target.value); // lift up
              }}
              sx={{ backgroundColor: "#F5F6FA", color: "#404040", fontWeight: 300 }}
            >
              <MenuItem value="">- Select -</MenuItem>
              <MenuItem value="no">Without Thesis</MenuItem>
              <MenuItem value="Thesis">With Thesis</MenuItem>
            </TextField>
          </Paper>
        </Grid>

        {/* Program List */}
        <Grid item xs={12} md={9} maxHeight={300} overflow="auto" padding={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F2E5F1" }}>
                <TableCell>Available Programs</TableCell>
                <TableCell>Program Fee</TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    <Typography sx={{ color: "#202224" }}>{program.program_name}</Typography>
                    <Typography variant="subtitle2" color="#7B7B7B">Superior University</Typography>
                    <Box mt={1} display="flex" gap={1}>
                      <Chip label={program.duration} size="small" color="secondary" variant="outlined" sx={{ background: "#79007712" }} />
                      <Chip label={program.thesis === "no" ? "Without Thesis" : "With Thesis"} size="small" color="secondary" variant="outlined" sx={{ background: "#79007712" }} />
                    </Box>
                  </TableCell>
                  <TableCell>{program.fee}</TableCell>
                  <TableCell>
                    <IconButton>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                  <Button
                    variant={selectedProgram === program.id ? "contained" : "outlined"}
                    onClick={() => setSelectedProgram(program.id)}
                    sx={{
                      textTransform: "none",
                      backgroundColor: selectedProgram === program.id ? "#790077" : "transparent",
                      borderColor: selectedProgram === program.id ? "#790077" : "#ccc",
                      color: selectedProgram === program.id ? "#fff" : "#202224",
                      fontWeight: 500,
                    }}
                  >
                    {selectedProgram === program.id ? "Selected" : "Select"}
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step4;
