import {
  AccessTime,
  AddCircleOutline,
  ArrowForward,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  TableContainer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const tableHeaders = ["ID", "APPLICATION TYPE", "DATE", "STATUS", "ACTION"];

const RecentApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}get_application`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allApps = response.data.data.application || [];

      // Sort by creation date descending
      const sorted = allApps.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setApplications(sorted.slice(0, 5)); // Only show 5 most recent
    } catch (error) {
      console.error("Failed to fetch applications:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const isEligibleToApply = applications.some(
    (app) =>
      app.status.toLowerCase() === "completed" ||
      app.status.toLowerCase() === "rejected"
  ) || applications.length === 0;

  return (
    <Box sx={{ mt: 2, borderRadius: "10px", backgroundColor: "white", minHeight: "350px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AccessTime sx={{ backgroundColor: "#F2E5F1", color: "#790077", borderRadius: "20px", padding: "8px", fontSize: "20px" }} />
          <Typography variant="h6">Recent</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            size="small"
            onClick={() => navigate("/applications")}
            sx={{
              textTransform: "none",
              fontSize: "13px",
              color: "#790077",
              backgroundColor: "#f5e6f3",
              "&:hover": {
                backgroundColor: "#ebd6ea",
              },
            }}
          >
            View All
          </Button>
          <Button
            variant="contained"
            disabled={!isEligibleToApply}
            sx={{
              borderRadius: "5px",
              backgroundColor: isEligibleToApply ? "#790077" : "#ccc",
              fontSize: "14px",
              padding: "10px",
              textTransform: "inherit",
              cursor: isEligibleToApply ? "pointer" : "not-allowed",
            }}
            onClick={() => isEligibleToApply && navigate("/application-form")}
          >
            New Application
            <AddCircleOutline sx={{ color: "#fff", fontSize: "17px", ml: 1 }} />
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 280 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      padding: "10px 16px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: "#EFEFEF",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell sx={{ padding: "10px 16px" }}>{app.id}</TableCell>
                  <TableCell sx={{ padding: "10px 16px" }}>{app.application_type}</TableCell>
                  <TableCell sx={{ padding: "10px 16px" }}>
                    {new Date(app.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ padding: "10px 16px" }}>
                    <Chip
                      label={app.status}
                      sx={{
                        color: app.status === "Completed" ? "#00B69B" : "#FFA756",
                        backgroundColor: app.status === "Completed" ? "#4affe438" : "#ffc99645",
                        borderRadius: "5px",
                        padding: "0px 6px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "10px 16px" }}>
                    <Button
                      onClick={() => navigate(`/user-view-details/${app.id}`)}
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        textTransform: "inherit",
                      }}
                    >
                      View Details
                      <ArrowForward
                        sx={{
                          backgroundColor: "#F2E5F1",
                          borderRadius: "20px",
                          fontSize: "17px",
                          padding: "5px",
                          color: "#790077",
                          ml: 1,
                        }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default RecentApplications;
