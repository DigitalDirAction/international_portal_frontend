import React from "react";
import { AppBar, Toolbar, Box, Typography, Container } from "@mui/material";
import { NorthEast } from "@mui/icons-material";
import logo from "../../assets/Superior-University-Logo.svg"; // update the path as per your project structure

const Navbar = () => {
  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left Section: Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: 40, objectFit: "contain" }} // adjust height as needed
            />
          </Box>

          {/* Center Section: Portals */}
          <Box
            sx={{
              flexGrow: 1,
              flexWrap: "wrap",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
               
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  padding: "7px  12px",
                  border: "1px solid #333333",
                  borderEndStartRadius: "6px", 
                    borderStartStartRadius: "6px",
                  backgroundColor: "#79007712",
                }}
              >
                Portals
              </Typography>
              <Box sx={{
                display: "flex",
                    border: "1px solid #333333",
                    padding: "0px  12px",
                    borderLeft: "none !important",
                    borderEndEndRadius: "6px", 
                    borderStartEndRadius: "6px"}}>
              {[
                { name: "Student", icon: <NorthEast sx={{ fontSize: 18 }} /> },
                { name: "Faculty", icon: <NorthEast sx={{ fontSize: 18 }} /> },
                { name: "Alumni", icon: <NorthEast sx={{ fontSize: 18 }} /> },
                { name: "Admissions", icon: <NorthEast sx={{ fontSize: 18 }} /> },
              ].map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { color: "blue" },
                    padding: "5px",
                  }}
                >
                  <Typography variant="body2">{item.name}</Typography>
                  {item.icon}
                </Box>
              ))}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
