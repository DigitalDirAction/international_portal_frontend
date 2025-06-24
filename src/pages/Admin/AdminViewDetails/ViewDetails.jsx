import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Paper, Avatar, Grid, Chip, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { CircularProgress } from '@mui/material';
import Doc from '../../../assets/Doc.svg'

const ViewDetails = () => {
  const { applicationId } = useParams();
  const token = localStorage.getItem('token');
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [comment, setComment] = useState('');
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [programName, setProgramName] = useState('');
  const navigate = useNavigate();

const handleOpenAcceptModal = () => setOpenAcceptModal(true);
const handleCloseAcceptModal = () => setOpenAcceptModal(false);

const handleOpenRejectModal = () => setOpenRejectModal(true);
const handleCloseRejectModal = () => setOpenRejectModal(false);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}admin/view_application/${applicationId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch application data');
        }

        const data = await response.json();
        setApplicationData(data.data);
        fetchProgramName(data.data.application.program_id); // Add this line
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId, token]);

  const fetchProgramName = async (programId) => {
    if (!programId) {
      setProgramName('N/A');
      return;
    }
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}program/${programId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch program data');
      }
  
      const data = await response.json();
      setProgramName(data.data.program_name || 'N/A');
    } catch (err) {
      console.error('Error fetching program:', err);
      setProgramName('N/A');
    }
  };

  const handleOpen = (doc) => {
    setSelectedDoc(doc.file_path);
    setOpen(true);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const updateApplicationStatus = async (status) => {
    setUpdatingStatus(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}admin/applications/${applicationId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            status: status,
            comment: comment
          })
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to update application status');
      }
  
      const data = await response.json();
      // Update the local state to reflect the change
      setApplicationData(prev => ({
        ...prev,
        application: {
          ...prev.application,
          status: status,
          comment: comment
        }
      }));
      // Show success message or perform other actions
      alert(`Application ${status} successfully!`);
    } catch (err) {
      console.error('Error updating application status:', err);
      alert('Failed to update application status');
    }finally {
      setUpdatingStatus(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoc('');
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!applicationData) {
    return <Typography>No application data found</Typography>;
  }

  const { application, profile, education, exams, experiences, documents } = applicationData;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatApplicationType = (type) => {
    if (!type) return '';
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Box sx={{ 
      display: "flex", 
      mt: { xs: 10, sm: 10, md: 6, lg: 10 },
      p: { xs: 1, sm: 2, md: 3 }
    }}>
      <Box sx={{ flexGrow: 1 }}>
        <Paper sx={{ 
          p: { xs: 2, sm: 3, md: 3 }, 
          maxHeight: { xs: 'none', md: "75vh" }, 
          overflow: 'auto', 
          borderRadius: '10px' 
        }}>
          {/* Header Section */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between", 
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 2,
            gap: 2
          }}>
            <Box display="flex" alignItems="center" gap={1}>
              <ArrowBackIcon  sx={{ color: "#790077" }} onClick={()=>navigate('/all-applications')}/>
              <Typography variant="h5">Application Details</Typography>
            </Box>
           
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 1, sm: 2, md: 4 },
              alignSelf: {xs: 'center'},
              flexWrap: 'wrap'
            }}>
              
              <Box sx={{ 
                backgroundColor: "#790077", 
                px: 2, 
                py: { xs: 1, sm: 1 }, 
                borderRadius: 1, 
                textAlign: "center",
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: "#fff" }}>
                APPLICATION TYPE
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 300, color: "#fff" }}>{formatApplicationType(application.application_type)}</Typography>
              </Box>
              
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#000" }}>
                  ID
                </Typography>
                <Typography>{application.id}</Typography>
              </Box>
              
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#000" }}>
                  DATE
                </Typography>
                <Typography>{formatDate(application.created_at)}</Typography>
              </Box>
              
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#000" }}>
                  STATUS
                </Typography>
                <Typography
                  color={
                    application.status === 'Completed' ? '#00B69B' :
                    application.status === 'accepted' || 'completed' ? '#00B69B' :
                    application.status === 'rejected' ? 'error' :
                    application.status === 'new_application' ? '#00B69B' : 'warning'
                  } 
                  sx={{ mt: { xs: 0.5, sm: 0 } }}>
                    {application.status.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')} 
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Profile Section */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                alignItems: { xs: 'center'}, 
                justifyContent: 'space-between',
                padding: '16px',
                gap: 3 
              }}>
                <Box sx={{display: 'flex', gap: 3, flexDirection: {xs: 'column', sm: 'row'}, alignItems: {sm: 'center'}}}>
                <Avatar variant="square" sx={{ 
                  width: { xs: 150, md: 200 }, 
                  height: { xs: 150, md: 200 } 
                }} />
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                    Name
                  </Typography>
                  <Typography variant="h5" color='#202224'>
                    {profile?.first_name} {profile?.last_name}
                  </Typography>

                  <Grid container spacing={2} my={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                        Father Name
                      </Typography>
                      <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>
                        {profile?.father_name || 'N/A'}
                      </Typography>     
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                        Mother Name
                      </Typography>
                      <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>
                        {profile?.mother_name || 'N/A'}
                      </Typography>  
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                        Gender
                      </Typography>
                      <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>
                        {profile?.gender || 'N/A'}
                      </Typography> 
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                        Date of Birth
                      </Typography>
                      <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>
                      {formatDate(profile?.date_of_birth) || 'N/A'}
                      </Typography> 
                    </Grid>
                  </Grid>
                </Box>
                </Box>
                
                <Box sx={{ 
                  backgroundColor: "#e9f2fb", 
                  p: 2, 
                  borderRadius: 2, 
                  width: { xs: '100%', md: 300 },
                  mt: { xs: 2, md: 0 },
                  ml: { xs: 0, md: 2 },
                }}>
                  <Box>
                    <Typography variant="body2" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                      Email
                    </Typography>
                    <Typography variant="body2" color= '#202224'>{profile?.email || 'N/A'}</Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body2" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                      Phone Number
                    </Typography>
                    <Typography variant="body2" color= '#202224'>{profile?.mobile_number || 'N/A'}</Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body2" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                      Address
                    </Typography>
                    <Typography variant="body2" color= '#202224'>
                      {profile?.address || 'N/A'}, {profile?.city || 'N/A'}, {profile?.country || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Passport Info Section */}
          <Box sx={{ 
            backgroundColor: "#e9f2fb", 
            p: 2, 
            borderRadius: 2,  
          }}>
            <Grid container spacing={2}>
              {[
                { label: "Passport Number", value: profile?.passport_number || 'N/A' },
                { label: "Passport Date of Issue", value: formatDate(profile?.passport_issue_date) },
                { label: "Passport Date of Expiry", value: formatDate(profile?.passport_expiry_date) },
                { label: "Passport Issuing Country", value: profile?.passport_country || 'N/A' },
                { label: "Citizenship", value: profile?.citizenship || 'N/A' },
                { label: "Secondary Citizenship", value: profile?.secondary_citizenship || 'N/A' }
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                  <Typography variant="body2" sx={{fontSize:'14px', color: '#686868', fontWeight: 400}}>
                    {item.label}
                  </Typography>
                  <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>
                    {item.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Details Section */}
          <Box mt={3}>
            <Grid container spacing={isMobile || isTablet ? 6 : 2}>
              {/* Application Info */}
              <Grid item xs={12} md={3}>
                <Box sx={{ 
                  backgroundColor: "#e9f2fb", 
                  p: 2, 
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <Typography variant="body2" sx={{fontSize:'15px', color: '#686868', fontWeight: 400}}>Application Type</Typography>
                  <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>{formatApplicationType(application?.application_type)}</Typography>
                  <Typography variant="body2" sx={{fontSize:'15px', color: '#686868', fontWeight: 400}} mt={2}>Term</Typography>
                  <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>{application?.term ? application?.term.charAt(0).toUpperCase() + application?.term.slice(1) : 'N/A'}</Typography>
                  <Typography variant="body2" sx={{fontSize:'15px', color: '#686868', fontWeight: 400}} mt={2}>Degree</Typography>
                  <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>{application?.degree ? application?.degree.charAt(0).toUpperCase() + application?.degree.slice(1) : 'N/A'}</Typography>
                  <Typography mt={2} sx={{ 
                    background: "#f3def5", 
                    color: "#790077", 
                    p: 1, 
                    borderRadius: 1 
                  }}>
                    Program: {programName || 'N/A'}
                  </Typography>
                </Box>
              </Grid>

              {/* Education/Experience */}
              <Grid item xs={12} md={3}>
                <Box sx={{ 
                  backgroundColor: "#e9f2fb", 
                  p: 2, 
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <Typography variant="body2" sx={{fontSize:'15px', color: '#686868', fontWeight: 400}}>Education</Typography>
                  {education?.length > 0 ? (
                    education?.map((edu, index) => (
                      <div key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>{edu.degree} ({edu.field_of_study})</Typography>
                          <Typography sx={{ fontSize: '11px', color: '#202224' }}>({edu.institution})</Typography>
                        </Box>
                        {index < education?.length - 1 && <hr style={{ margin: '10px 0' }} />}
                      </div>
                    ))
                  ) : (
                    <Typography variant="h6" sx={{color: '#202224', fontSize: '14px'}}>N/A</Typography>
                  )}
                  
                  <Typography variant="body2" sx={{fontSize:'15px', color: '#686868', fontWeight: 400}} mt={2}>Exam</Typography>
                  {exams?.length > 0 ? (
                    exams?.map((exam, index) => (
                      <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}} key={index}>
                        {exam.name}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="h6" sx={{color: '#202224', fontSize: '14px'}}>N/A</Typography>
                  )}
                  
                  <Typography variant="body2" sx={{fontSize:'15px', color: '#686868', fontWeight: 400}} mt={2}>Experience</Typography>
                  {experiences?.length > 0 ? (
                    experiences?.map((exp, index) => (
                      <div key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>{exp.position}</Typography>
                          <Typography sx={{ fontSize: '11px', color: '#202224' }}>
                            ({exp.start_date} - {exp.end_date})
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '12px' }}>
                          {exp.company}
                        </Typography>
                        {index < experiences?.length - 1 && <hr style={{ margin: '10px 0' }} />}
                      </div>
                    ))
                  ) : (
                    <Typography variant="h6" sx={{color: '#202224', fontSize: '14px'}}>N/A</Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box sx={{ 
                  backgroundColor: "#e9f2fb", 
                  p: 2, 
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <Typography variant="body2" sx={{fontSize:'15px', color: '#686868', fontWeight: 400}}>Documents</Typography>
                  {documents?.map((doc, index) => (
                    <Box 
                      key={doc.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: index < documents.length - 1 ? 1 : 0,
                        p: 0.1,
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                          borderRadius: 1
                        }
                      }}
                    >
                      <Box 
                        component="img" 
                        src={Doc} 
                        alt="document icon"
                        sx={{
                          width: 22,
                          height: 22,
                          minWidth: 22
                        }} 
                      />
                      <Typography 
                        onClick={() => handleOpen(doc)} 
                        sx={{ 
                          textDecoration: 'underline', 
                          cursor: 'pointer',
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          wordBreak: 'break-word',
                          color: '#202224',
                          lineHeight: 1.2,
                          '&:hover': {
                            color: '#790077'
                          }
                        }}
                      >
                        {doc.type.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Documents and Comments */}
              <Grid item xs={12} md={3}>
                    <Box sx={{ 
                      backgroundColor: "#e9f2fb", 
                      p: 2, 
                      borderRadius: 2,
                      height: '100%'
                    }}>
                      <Typography variant="body2" sx={{fontSize:'14px', color: '#686868', fontWeight: 400, mb: 1}}>Write comments</Typography>
                      {application?.comment ?
                      <Typography variant="h6" sx={{color: '#202224', fontSize: '13px'}}>{formatApplicationType(application?.comment)}</Typography> 
                      : 
                      <TextField
                        multiline
                        rows={isMobile ? 3 : 7}
                        fullWidth
                        placeholder="Start writing..."
                        value={comment}
                        onChange={handleCommentChange}
                        size={isMobile ? 'small' : 'medium'}
                      />
                      }
                    </Box>
                  </Grid>
            </Grid>
          </Box>

          {/* Footer Buttons */}
          <Box mt={7} mb={4} sx={{ 
            display: "flex", 
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: "space-between", 
            alignItems: "center",
            gap: 2,
            marginBottom: {xs: '60px'}
          }}>
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton sx={{ color: '#790077', border: '1px solid #790077' }}>
                <PrintOutlinedIcon />
              </IconButton>
              <Typography sx={{ color: '#790077' }}>Print this Application</Typography>
            </Box>
            {application.status === "completed" || application.status === "rejected" ? '' :
              <Box display="flex" gap={2} sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'space-between', sm: 'flex-end' } }}>
                <Button 
                  variant="contained" 
                  color="error" 
                  fullWidth={isMobile}
                  onClick={handleOpenRejectModal}
                >
                  Reject
                </Button>
                <Button 
                  variant="contained" 
                  color="success" 
                  fullWidth={isMobile}
                  onClick={handleOpenAcceptModal}
                >
                  Accept
                </Button>
              </Box> 
            }
          </Box>
        </Paper>
      </Box>

      {/* PDF Viewer Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ wordBreak: 'break-all' }}>{selectedDoc.split('/').pop()}</DialogTitle>
        <DialogContent>
          <iframe
            src={selectedDoc}
            title="Document Viewer"
            width="100%"
            height={isMobile ? '300px' : '500px'}
            style={{ border: 'none' }}
          ></iframe>
        </DialogContent>
      </Dialog>

      {/* Accept Confirmation Modal */}
      <Dialog open={openAcceptModal} onClose={handleCloseAcceptModal}>
        <DialogTitle>Confirm Acceptance</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to accept this application?</Typography>
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: 2 }}>
          <Button 
            onClick={handleCloseAcceptModal} 
            variant="outlined"
            disabled={updatingStatus}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              updateApplicationStatus('completed');
              handleCloseAcceptModal();
            }} 
            variant="contained" 
            color="success"
            disabled={updatingStatus}
          >
            {updatingStatus ? <CircularProgress size={24} /> : 'Confirm Accept'}
          </Button>
        </Box>
      </Dialog>

      {/* Reject Confirmation Modal */}
      <Dialog open={openRejectModal} onClose={handleCloseRejectModal}>
        <DialogTitle>Confirm Rejection</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to reject this application?</Typography>
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: 2 }}>
          <Button 
            onClick={handleCloseRejectModal} 
            variant="outlined"
            disabled={updatingStatus}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              updateApplicationStatus('rejected');
              handleCloseRejectModal();
            }} 
            variant="contained" 
            color="error"
            disabled={updatingStatus}
          >
            {updatingStatus ? <CircularProgress size={24} /> : 'Confirm Reject'}
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ViewDetails;