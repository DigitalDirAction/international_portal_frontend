import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import { NorthEast } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: 1,
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              MyLogo
            </Typography>
          </Box>

          {/* Center Section: Portals */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Portals:
            </Typography>
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
                }}
              >
                <Typography variant="body2">{item.name}</Typography>
                {item.icon}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
