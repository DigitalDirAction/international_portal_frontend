import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { Close, Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const EducationDialog = ({ open, handleClose, setIsEducationAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    institute: "",
    degree: "",
    field: "",
    grade: "",
    start: null,
    end: null,
    description: ""
  });  
  const [educationList, setEducationList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const isFormValid = Object.entries(formData)
  .filter(([key]) => key !== "id")
  .every(([key, val]) => {
    if (key === "start" || key === "end") return val instanceof Date;
    return typeof val === "string" && val.trim();
  });



  // Fetch existing education when dialog opens
  useEffect(() => {
    const fetchEducation = async () => {
      if (!open) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}get_application`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const educationData = response.data.data.education || [];
        
        const formattedData = educationData.map((edu) => ({
          id: edu.id || null,
          institute: edu.institution || "",
          degree: edu.degree || "",
          field: edu.field_of_study || "",
          grade: edu.grade || "",
          start: edu.start_date ? new Date(edu.start_date) : null,
          end: edu.end_date ? new Date(edu.end_date) : null,
          description: edu.description || "",
        }));
        
        

        setEducationList(formattedData);
        if (formattedData.length > 0) {
          setIsEducationAdded(true); // ✅ Mark green if already data exists
        }

      } catch (error) {
        console.error("Failed to fetch education data:", error.response?.data || error.message);
      }
    };

    fetchEducation();
  }, [open]);

  const handleAddOrUpdateEducation = async () => {
    const token = localStorage.getItem("token");

    const formatDate = (date) => {
      if (!(date instanceof Date)) return null;
      return date.toISOString().split("T")[0]; // returns 'YYYY-MM-DD'
    };
    
    const payload = {
      institution: formData.institute,
      degree: formData.degree,
      field_of_study: formData.field,
      grade: formData.grade,
      start_date: formatDate(formData.start),
      end_date: formatDate(formData.end),
      description: formData.description,
    };

    try {
      if (!formData.start || !formData.end) {
        alert("Please select both start and end dates.");
        return;
      }
      
      if (formData.start > formData.end) {
        alert("Start date must be before End date.");
        return;
      }
      
      if (editIndex !== null) {
        const id = educationList[editIndex].id;
        await axios.put(`${import.meta.env.VITE_BASE_URL}admission/education/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updated = [...educationList];
        updated[editIndex] = { ...formData, id }; // Keep id after update
        setEducationList(updated);
        setEditIndex(null);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}admission/education`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newRecord = response.data.data;
        setEducationList([...educationList, {
          id: newRecord.id, // Save newly created id
          ...formData,
        }]);
      }

      setIsEducationAdded(true);
      setFormData({
        institute: "",
        degree: "",
        field: "",
        grade: "",
        start: null,
        end: null,
        description: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Education submission error:", error.response?.data || error.message);
    }
  };

  const handleEdit = (index) => {
    const data = educationList[index];
    setFormData({
      ...data,
      start: data.start ? new Date(data.start) : null,
      end: data.end ? new Date(data.end) : null,
    });
    setEditIndex(index);
    setShowForm(true);
  };
  

  const handleDelete = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} sx={{ borderRadius: "15px" }}>
      <Box px={2} py={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle sx={{ fontSize: "1.3rem", fontWeight: 500, py: 1 }}>
            Education
          </DialogTitle>

          <Box display="flex" alignItems="center" gap={1}>
            {!showForm && (
              <Button
                variant="outlined"
                onClick={() => setShowForm(true)}
                sx={{ textTransform: "none", borderColor: "#790077", color: "#790077", fontSize: 11 }}
              >
                + Add education
              </Button>
            )}
            <IconButton onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0 }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <DialogContent sx={{ minHeight: "400px", py: 1 }}>
          {!showForm && (
            <>
              <Typography variant="subtitle2" fontSize={12} color="#35353575" mb={2}>
                Enter your education
              </Typography>
              {educationList.length === 0 ? (
                <Typography variant="body2" sx={{ color: "red", fontStyle: "italic" }}>
                  No data added
                </Typography>
              ) : (
                <Box>
                  {educationList.map((edu, i) => (
                    <Box key={i} mb={1} p={1} border="1px solid #ccc" borderRadius="8px">
                      <Typography fontWeight={500} fontSize="14px">{edu.institute}</Typography>
                      <Typography fontSize="12px">{edu.degree}</Typography>
                      <Typography variant="body2" fontSize="12px">
                        {edu.start instanceof Date ? edu.start.toLocaleDateString() : edu.start} - 
                        {edu.end instanceof Date ? edu.end.toLocaleDateString() : edu.end}
                      </Typography>

                      <Typography variant="body2" fontSize="12px">Grade: {edu.grade}</Typography>
                      <Box mt={1} display="flex" justifyContent="flex-end" gap={1}>
                        <IconButton onClick={() => handleEdit(i)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(i)} size="small">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}

          {showForm && (
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Institute"
                    placeholder="Ex: Superior University"
                    fullWidth
                    value={formData.institute}
                    onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Degree"
                    placeholder="Ex: Bachelor's"
                    fullWidth
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Field of study"
                    placeholder="Ex: Business"
                    fullWidth
                    value={formData.field}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Grade"
                    placeholder="Enter grades"
                    fullWidth
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Start Date"
                    value={formData.start}
                    onChange={(newValue) => setFormData({ ...formData, start: newValue })}
                    maxDate={formData.end || undefined}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                    sx={{width: "100%"}}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="End Date"
                    value={formData.end}
                    onChange={(newValue) => setFormData({ ...formData, end: newValue })}
                    minDate={formData.start || undefined}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                    sx={{width: "100%"}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    placeholder="Enter your description"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>
              </Grid>
              </LocalizationProvider>

              <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      institute: "",
                      degree: "",
                      field: "",
                      grade: "",
                      start: "",
                      end: "",
                      description: ""
                    });
                    setEditIndex(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={!isFormValid}
                  onClick={handleAddOrUpdateEducation}
                  sx={{
                    backgroundColor: "#790077",
                    color: "white",
                    '&:disabled': {
                      backgroundColor: "#f0e0f5",
                      color: "#999"
                    }
                  }}
                >
                  {editIndex !== null ? "Update" : "Add education"}
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>

        {!showForm && (
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                backgroundColor: "#790077",
                color: "white",
              }}
            >
              Done
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default EducationDialog;
