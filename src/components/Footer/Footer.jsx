import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
    position="fixed"
    bottom={10}
    sx={{width: "100%"}}
      
    >
      <Typography variant="body2" fontSize="0.9rem" sx={{
        backgroundColor: "#822b84", // Deep purple
        color: "#fff",
        
        textAlign: "center",
        padding: "8px 20px",
        borderRadius: "50px",
        margin: "0 20px",
        display: "flex"}}>
        ©2025. Superior University. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
