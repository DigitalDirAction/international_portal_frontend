import { AccessTime, AddCircleOutline, ArrowForward } from "@mui/icons-material";
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
} from "@mui/material";

const tableHeaders = ["ID", "APPLICATION TYPE", "DATE", "STATUS", "ACTION"];

const applications = [
  { id: "00001", type: "Semester Exchange", date: "05 Aug 2024", status: "In Progress" },
  { id: "00002", type: "Student Services", date: "04 Sep 2019", status: "Completed" },
];

const RecentApplications = () => (
  <Box sx={{mt:2, borderRadius: "10px", backgroundColor: "white", minHeight: "350px"}}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px" }}>
      <Box sx={{display: "flex", alignItems: "center", gap: 2}}><AccessTime sx={{backgroundColor: "#F2E5F1", color: "#790077", borderRadius: "20px", padding: "8px", fontSize: "20px",}}/><Typography variant="h6">Recent</Typography></Box>
      
      <Button variant="contained" sx={{ borderRadius: "5px", backgroundColor: "#790077", fontSize: "14px", padding: "10px", textTransform: "inherit",}}>
        New Application
        <AddCircleOutline sx={{ color: "#fff", fontSize: "17px", ml: 1}}/>
      </Button>
    </Box>

    <Table>
      <TableHead sx={{ backgroundColor: "#EFEFEF" }}>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableCell sx={{padding: "10px 16px", fontSize: "11px", fontWeight: "bold"}} key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id}>
            <TableCell>{app.id}</TableCell>
            <TableCell>{app.type}</TableCell>
            <TableCell>{app.date}</TableCell>
            <TableCell>
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
            <TableCell>
              <Button
                sx={{
                  color: "black",
                  fontSize: "14px",
                  textTransform: "inherit",
                }}
              >
                View Details{" "}
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
  </Box>
);

export default RecentApplications;
