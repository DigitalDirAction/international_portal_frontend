import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NorthEast } from "@mui/icons-material";
import Sidebar from "../Sidebar/Sidebar";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/Superior-University-Logo.svg";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar
        position="fixed"
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: 40, objectFit: "contain" }}
              />
            </Box>

            {!isSmallScreen && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      padding: "7px 12px",
                      border: "1px solid #333333",
                      borderRadius: "6px 0 0 6px",
                      backgroundColor: "#79007712",
                    }}
                  >
                    Portals
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      border: "1px solid #333333",
                      padding: "0px 12px",
                      borderLeft: "none",
                      borderRadius: "0 6px 6px 0",
                    }}
                  >
                    {[
                      { name: "Student" },
                      { name: "Faculty" },
                      { name: "Alumni" },
                      { name: "Admissions" },
                    ].map((item) => (
                      <Box
                        key={item.name}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          cursor: "pointer",
                          padding: "5px",
                          "&:hover": { color: "blue" },
                        }}
                      >
                        <Typography variant="body2">{item.name}</Typography>
                        <NorthEast sx={{ fontSize: 18 }} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {isSmallScreen && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Sidebar />
      </Drawer>
    </>
  );
};

export default Navbar;
