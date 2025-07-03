import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  AccessTime,
  ContentCopy,
  People,
  Phone,
  PowerSettingsNew,
  SettingsOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  console.log(role)
  const fullName = localStorage.getItem('fullName');

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === 200 && response.data.message === "Logged out successfully") {
        toast.success("Logged out successfully");
        localStorage.clear();
        navigate("/");
      } else {
        toast.error(response.data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  const navItems = role === "admin"
    ? [
        { label: "Dashboard", icon: <AccessTime fontSize="small" />, path: "/admin-dashboard" },
        { label: "All Applications", icon: <ContentCopy fontSize="small" />, path: "/all-applications" },
        { label: "Add Admin", icon: <People fontSize="small" />, path: "/admin-list" },
      ]
    : [
        { label: "Dashboard", icon: <AccessTime fontSize="small" />, path: "/dashboard" },
        { label: "My Applications", icon: <ContentCopy fontSize="small" />, path: "/applications" },
        { label: "Contact Us", icon: <Phone fontSize="small" />, path: "/contact" },
      ];

  return (
    <Box
      sx={{
        width: "20%",
        bgcolor: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #eee",
        px: 2,
      }}
    >
      <Box>
        {/* Profile Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2, mt: 12 }}>
          <Avatar src="/avatar.png" alt="User" />
          <Box sx={{ flexGrow: 1 }}>
            <Typography>{role === 'admin' ? fullName || 'Admin' : 'User'}</Typography>
          </Box>
          <IconButton
          onClick={() => navigate(role === "admin" ? "/admin-profile" : "/profile")}
            size="small"
            sx={{
              color: "#424242",
              "&:hover": {
                color: "#790077",
              },
            }}
          >
            <SettingsOutlined fontSize="small" />
          </IconButton>
        </Box>


        {/* Navigation Items */}
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  backgroundColor: isActive ? "#790077" : "transparent",
                  color: isActive ? "#fff" : "#000",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#790077",
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                  "&::before": isActive
                    ? {
                        content: '""',
                        position: "absolute",
                        left: -12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "5px",
                        height: "100%",
                        backgroundColor: "#790077",
                        borderRadius: "4px",
                      }
                    : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#fff" : "#000",
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>

      </Box>

      {/* Logout Button */}
      <Box sx={{ mb: 7, borderTop: "1px solid #E0E0E0" }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            "&:hover": {
              backgroundColor: "#790077",
              color: "#fff",
              "& .MuiListItemIcon-root": {
                color: "#fff",
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: "#000", minWidth: 36 }}>
            <PowerSettingsNew fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
