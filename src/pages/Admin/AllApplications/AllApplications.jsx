import {
  AccessTime,
  AddCircleOutline,
  ArrowForward,
  ContentCopy,
  Edit,
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
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const tableHeaders = ["ID", "APPLICATION TYPE", "DATE", "STATUS", "ACTION"];

const AllApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}admin/applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(response.data || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatLabel = (text) => {
    if (!text) return "";
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  

  return (
    <Box sx={{ mt: 12, mx: 2, flex: 1, borderRadius: "10px", backgroundColor: "white", minHeight: "80vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ContentCopy sx={{ backgroundColor: "#F2E5F1", color: "#790077", borderRadius: "20px", padding: "8px", fontSize: "20px" }} />
          <Typography variant="h6">My Applications</Typography>
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
                  <TableCell sx={{ padding: "10px 16px" }}>{formatLabel(app.application_type)}</TableCell>
                  <TableCell sx={{ padding: "10px 16px" }}>
                    {new Date(app.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ padding: "10px 16px" }}>
                    <Chip
                      label={formatLabel(app.status)}
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
                    onClick={() => navigate(`/view-details/${app.id}`)}
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

export default AllApplications;