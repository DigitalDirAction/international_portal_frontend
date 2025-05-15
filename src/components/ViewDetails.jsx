
// ViewDetails.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Avatar, Grid, Grid2, Chip, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
const ViewDetails = () => {

    const [open, setOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState('');
  
    const handleOpen = (docName) => {
      setSelectedDoc(docName);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedDoc('');
    };
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "240px", flexShrink: 0 }} /> {/* Sidebar offset */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <ArrowBackIcon sx={{ color: "#790077" }} />
              <Typography variant="h5">Application Details</Typography>
            </Box>
           
            <Box display="flex" alignItems="flex-start" gap={4}>
              <Box
                sx={{
                  backgroundColor: "#790077",
                  px: 2,
                  py: 3,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                {/* <Typography variant="caption" sx={{ fontWeight: 700, color: '##790077' }}>APPLICATION TYPE</Typography> */}
                <Typography
                  sx={{ color: "white", fontWeight: 600, fontSize: 14 }}
                >
                  APPLICATION TYPE Semester Exchange
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#000" }}
                >
                  ID
                </Typography>
                <Typography>00001</Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#000" }}
                >
                  DATE
                </Typography>
                <Typography>05 Aug 2024</Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#000" }}
                >
                  STATUS
                </Typography>
                <br />
                <Chip label="In Progress" color="warning" />
              </Box>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item>
              <Box display="flex" alignItems="flex-start" gap={3}>
                <Avatar variant="square" sx={{ width: 200, height: 200 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Name
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Salman Ahmad
                  </Typography>

                  <Grid container spacing={10}>
                    <Grid item xs={6}><strong>Father Name:</strong> abc</Grid>
                    <Grid item xs={6}><strong>Mother Name:</strong> xyz</Grid>
                  </Grid>
                  <Grid container spacing={10} mt={8}>
                    <Grid item xs={6}><strong>Gender:</strong> Male</Grid>
                    <Grid item xs={6}><strong>Date of Birth:</strong> 1 Jan, 2000</Grid>
                  </Grid>
                </Box>
                
                <Box
                  sx={{
                    backgroundColor: "#e9f2fb",
                    p: 2,
                    borderRadius: 2,
                    minWidth: 300,
                    ml: 15,
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    <strong>Email</strong>
                  </Typography>
                  <Typography variant="body2">
                    salman.ahm97@superior.edu.pk
                  </Typography>
                  <Typography variant="body2" gutterBottom mt={2}>
                    <strong>Phone Number</strong>
                  </Typography>
                  <Typography variant="body2">+923212345678</Typography>
                  <Typography variant="body2" gutterBottom mt={2}>
                    <strong>Address</strong>
                  </Typography>
                  <Typography variant="body2">
                    70 Washington Square South, New York, NY 10012, United
                    States
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              backgroundColor: "#e9f2fb",
              p: 2,
              borderRadius: 2,
              minWidth: 300,
            }}
            mt={3}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <strong>Passport Number:</strong> A12345678
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <strong>Passport Date of Issue:</strong> 1 Jan, 2000
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <strong>Passport Date of Expiry:</strong> 1 Jan, 2000
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <strong>Passport Issuing Country:</strong> USA
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <strong>Citizenship:</strong> USA
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <strong>Secondary Citizenship:</strong> Pakistan
              </Grid>
            </Grid>
          </Box>

          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ backgroundColor: "#e9f2fb", p: 2, borderRadius: 2 }}
              >
                <Typography>
                  <strong>Application Type</strong>
                </Typography>
                <Typography>Semester Exchange</Typography>
                <Typography mt={2}>
                  <strong>Term</strong>
                </Typography>
                <Typography>Fall - AUG to DEC 24</Typography>
                <Typography mt={2}>
                  <strong>Degree</strong>
                </Typography>
                <Typography>Bachelors</Typography>
                <Typography
                  mt={2}
                  sx={{
                    background: "#f3def5",
                    color: "#790077",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  Program: BS Electrical Engineering
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ backgroundColor: "#e9f2fb", p: 2, borderRadius: 2 }}
              >
                <Typography>
                  <strong>Education</strong>
                </Typography>
                <Typography>BS Electrical Engineering</Typography>
                <Typography mt={2}>
                  <strong>Exam:</strong> IELTS
                </Typography>
                <Typography mt={2}>
                  <strong>Experience:</strong>
                </Typography>
                {[1, 2, 3].map((i) => (
                  <Typography key={i}>
                    Junior Engineer NESPAK (2022–2023)
                  </Typography>
                ))}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={2}
                sx={{ backgroundColor: "#e9f2fb", p: 2, borderRadius: 2 }}
              >
                <Typography>
                  <strong>Documents</strong>
                </Typography>
                {[
                  'Passport.pdf',
                  'High_School_Diploma.pdf',
                  'High_School_Diploma_Equivalent.pdf',
                  'Motivation_Letter.pdf',
                  'English_Language_Proficiency_Score.pdf',
                  'High_School_Degree_Transcript.pdf',
                  'Diploma_or_Transcripts_Translations.pdf',
                  'Additional_Document.pdf'
                ].map(doc => (
                  <Typography key={doc} onClick={() => handleOpen(doc)} sx={{ textDecoration: 'underline', cursor: 'pointer' }}>{doc}</Typography>
                ))}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={2}
                sx={{ backgroundColor: "#e9f2fb", p: 2, borderRadius: 2 }}
              >
                <Typography>
                  <strong>Write comments</strong>
                </Typography>
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="Start writing..."
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
             <Box display="flex" alignItems="center" gap={1}>
              <IconButton sx={{ color: '#790077', border: '1px solid #790077' }}>
                <PrintOutlinedIcon />
              </IconButton>
              <Typography sx={{ color: '#790077' }}>Print this Application</Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="contained" color="error">
                Reject
              </Button>
              <Button variant="contained" color="success">
                Accept
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

       {/* PDF Viewer Dialog */}
       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedDoc}</DialogTitle>
        <DialogContent>
          <iframe
            src={`path/to/pdfs/${selectedDoc}`}
            title={selectedDoc}
            width="100%"
            height="500px"
            style={{ border: 'none' }}
          ></iframe>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ViewDetails;
