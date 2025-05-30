import {
  AddCircleOutline,
  Person,
  Edit,
  Delete,
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
  CircularProgress,
  TableContainer,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const tableHeaders = ["ID", "FULL NAME", "EMAIL", "REGISTRATION NUMBER", "ACTION"];

const AdminList = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal states
  const [editOpen, setEditOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    registration_number: "",
  });

  // Delete confirmation modal states
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState(null);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}get_admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmins(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch admins.");
      console.error("Failed to fetch admins:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Edit modal handlers
  const handleEditOpen = (admin) => {
    setEditAdmin(admin);
    setEditForm({
      full_name: admin.full_name || "",
      email: admin.email || "",
      registration_number: admin.registration_number || "",
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditAdmin(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!editAdmin) return;
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}update_admin/${editAdmin.id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Admin updated successfully!");
      fetchAdmins();
      handleEditClose();
    } catch (error) {
      toast.error("Failed to update admin.");
      console.error("Failed to update admin:", error.response?.data || error.message);
    }
  };

  // Delete modal handlers
  const handleDeleteClick = (adminId) => {
    setDeleteAdminId(adminId);
    setDeleteOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteAdminId(null);
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteAdminId) return;
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}delete_admin/${deleteAdminId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Admin deleted successfully!");
      fetchAdmins();
    } catch (error) {
      toast.error("Failed to delete admin.");
      console.error("Failed to delete admin:", error.response?.data || error.message);
    } finally {
      setDeleteAdminId(null);
      setDeleteOpen(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 12,
        mx: 2,
        flex: 1,
        borderRadius: "10px",
        backgroundColor: "white",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 25px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Person
            sx={{
              backgroundColor: "#F2E5F1",
              color: "#790077",
              borderRadius: "20px",
              padding: "8px",
              fontSize: "20px",
            }}
          />
          <Typography variant="h6">Admin List</Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            borderRadius: "5px",
            backgroundColor: "#F2E5F1",
            fontSize: "14px",
            padding: "10px",
            textTransform: "inherit",
            color: "#790077",
            cursor: "pointer",
          }}
          onClick={() => navigate("/add-admin")}
        >
          Add Admin
          <AddCircleOutline
            sx={{
              color: "#790077",
              fontSize: "17px",
              ml: 1,
            }}
          />
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 400 }}>
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
              {admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableHeaders.length} align="center" sx={{ padding: 4 }}>
                    No admins found.
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell sx={{ padding: "10px 16px" }}>{admin.id}</TableCell>
                    <TableCell sx={{ padding: "10px 16px" }}>{admin.full_name || admin.name}</TableCell>
                    <TableCell sx={{ padding: "10px 16px" }}>{admin.email}</TableCell>
                    <TableCell sx={{ padding: "10px 16px" }}>{admin.registration_number || "-"}</TableCell>
                    <TableCell sx={{ padding: "10px 16px" }}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditOpen(admin)}
                        sx={{ color: "#790077" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(admin.id)}
                        sx={{ color: "#d32f2f" }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Admin Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Full Name"
              name="full_name"
              value={editForm.full_name}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={editForm.email}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Registration Number"
              name="registration_number"
              value={editForm.registration_number}
              onChange={handleEditChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="inherit">Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            sx={{ backgroundColor: "#790077", "&:hover": { backgroundColor: "#6a1b9a" } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this admin? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminList;
