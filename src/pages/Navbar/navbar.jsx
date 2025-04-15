import React from "react";
import { AppBar, Toolbar, Typography, Box, InputBase } from "@mui/material";
import { FaArrowDownLong } from "react-icons/fa6";
import { NorthEast } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#333", boxShadow: 1, padding: "10px 0", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>

        {/* Left Section: Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>MyLogo</Typography>
        </Box>

        {/* Middle Section: Full-width navigation */}
        <Box sx={{ flexGrow: 1, textAlign: "center", width: "100%" }}>
          {/* First Row: Portals */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Portals:</Typography>
            {[
              { name: "Student", icon: <NorthEast sx={{ fontSize: 18 }} /> },
              { name: "Faculty", icon: <NorthEast sx={{ fontSize: 18 }} /> },
              { name: "Alumni", icon: <NorthEast sx={{ fontSize: 18 }} /> },
              { name: "Admissions", icon: <NorthEast sx={{ fontSize: 18 }} /> }
            ].map((item) => (
              <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", "&:hover": { color: "blue" } }}>
                <Typography variant="body2">{item.name}</Typography>
                {item.icon}
              </Box>
            ))}
          </Box>

          {/* Second Row: Navigation */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3 }}>
            {[
              { name: "About Us", icon: <FaArrowDownLong size={18} /> },
              { name: "Academics", icon: <FaArrowDownLong size={18} /> },
              { name: "Research", icon: <FaArrowDownLong size={18} /> },
              { name: "Internationalization", icon: <FaArrowDownLong size={18} /> },
              { name: "Alumni", icon: <FaArrowDownLong size={18} /> },
              { name: "In Focus", icon: <FaArrowDownLong size={18} /> },
              { name: "Student Hub", icon: <FaArrowDownLong size={18} /> }
            ].map((item) => (
              <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", "&:hover": { color: "blue" } }}>
                <Typography variant="body2">{item.name}</Typography>
                {item.icon}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Section: Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px" }}>
          <InputBase placeholder="Search..." sx={{ ml: 1 }} />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
