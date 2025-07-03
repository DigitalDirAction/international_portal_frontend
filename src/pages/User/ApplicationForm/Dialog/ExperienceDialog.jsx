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
  Checkbox,
  FormControlLabel,
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

const years = Array.from({ length: 40 }, (_, i) => `${new Date().getFullYear() - i}`);

const ExperienceDialog = ({ open, handleClose, setIsExperienceAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: null,
    endMonth: "",
    endYear: "",
    description: "",
    id: null, // ✅ Capture ID for edit
  });

  const isEndDateValid = () => {
    if (currentlyWorking || !formData.startDate || !formData.endMonth || !formData.endYear) return true;
  
    const endMonthIndex = months.indexOf(formData.endMonth);
    const endYear = parseInt(formData.endYear);
    const endDate = new Date(endYear, endMonthIndex);
  
    // Compare with start date (set day to 1 for safe comparison)
    return endDate >= new Date(formData.startDate.getFullYear(), formData.startDate.getMonth());
  };
  

  const isFormValid =
  formData.company?.trim() &&
  formData.position?.trim() &&
  formData.startDate instanceof Date && !isNaN(formData.startDate.getTime()) &&
  (currentlyWorking || (formData.endMonth?.trim() && formData.endYear?.trim())) &&
  isEndDateValid() &&
  formData.description?.trim();

  // 🛠 Fetch experience when dialog opens
  useEffect(() => {
    const fetchExperience = async () => {
      if (!open) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}get_application`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const experienceData = response?.data?.data?.experiences || [];

        const mappedExperience = experienceData.map((exp) => ({
          id: exp.id || null,
          company: exp.company || "",
          position: exp.position || "",
          startDate: exp.start_date ? new Date(exp.start_date) : null,
          endMonth: exp.end_date?.split(" ")[0] || "",
          endYear: exp.end_date?.split(" ")[1] || "",
          currentlyWorking: exp.currently_work_here === "yes",
          description: exp.description || "",
        }));

        setExperienceList(mappedExperience);
        if (mappedExperience.length > 0) {
          setIsExperienceAdded(true);
        }
      } catch (error) {
        console.error("Failed to fetch experience data:", error.response?.data || error.message);
      }
    };

    fetchExperience();
  }, [open]);

  const handleAddOrUpdateExperience = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      company: formData.company,
      position: formData.position,
      start_date: formData.startDate?.toISOString().split("T")[0],
      end_date: currentlyWorking ? "Present" : `${formData.endMonth} ${formData.endYear}`,
      currently_work_here: currentlyWorking ? "yes" : "no",
      description: formData.description,
    };

    try {
      if (editIndex !== null) {
        const id = experienceList[editIndex].id;
        await axios.put(`${import.meta.env.VITE_BASE_URL}admission/experience/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updated = [...experienceList];
        updated[editIndex] = { ...formData, currentlyWorking, id };
        setExperienceList(updated);
        setEditIndex(null);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}admission/experience`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newRecord = response.data.data;
        setExperienceList([...experienceList, { id: newRecord.id, ...formData, currentlyWorking }]);
      }

      setIsExperienceAdded(true);
      resetForm();
    } catch (error) {
      console.error("Experience submission error:", error.response?.data || error.message);
    }
  };

  const handleEdit = (index) => {
    const exp = experienceList[index];
    setFormData({
      company: exp.company ?? "",
      position: exp.position ?? "",
      startDate: exp.startDate ? new Date(exp.startDate) : null,
      endMonth: exp.endMonth ?? "",
      endYear: exp.endYear ?? "",
      description: exp.description ?? "",
      id: exp.id ?? null,
    });
    setCurrentlyWorking(exp.currentlyWorking || false);
    setEditIndex(index);
    setShowForm(true);
  };  

  const handleDelete = (index) => {
    const updated = experienceList.filter((_, i) => i !== index);
    setExperienceList(updated);
  };

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      startDate: null,
      endMonth: "",
      endYear: "",
      description: "",
      id: null,
    });
    setCurrentlyWorking(false);
    setEditIndex(null);
    setShowForm(false);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <Box px={2} py={4}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle sx={{ fontSize: "1.3rem", fontWeight: 500, py: 1 }}>
            Experience
          </DialogTitle>

          <Box display="flex" alignItems="center" gap={1}>
            {!showForm && (
              <Button
                variant="outlined"
                onClick={() => setShowForm(true)}
                sx={{ textTransform: "none", borderColor: "#790077", color: "#790077", fontSize: 11 }}
              >
                + Add experience
              </Button>
            )}
            <IconButton onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0 }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <DialogContent sx={{ minHeight: "400px", py: 1 }}>
          {!showForm ? (
            <>
              <Typography variant="subtitle2" fontSize={12} color="#35353575" mb={2}>
                Enter your experience
              </Typography>
              {experienceList.length === 0 ? (
                <Typography variant="body2" sx={{ color: "red", fontStyle: "italic" }}>
                  No data added
                </Typography>
              ) : (
                <Box>
                  {experienceList.map((exp, i) => (
                    <Box key={i} mb={2} p={2} border="1px solid #ccc" borderRadius="8px" position="relative">
                      <Typography fontWeight={500}>{exp.position} at {exp.company}</Typography>
                      <Typography fontSize="12px">
                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) : "N/A"} - {exp.currentlyWorking ? "Present" : `${exp.endMonth} ${exp.endYear}`}
                      </Typography>
                      <Typography fontSize="12px">{exp.description}</Typography>

                      <Box position="absolute" top={8} right={8} display="flex" gap={1}>
                        <IconButton size="small" onClick={() => handleEdit(i)}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(i)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          ) : (
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Company"
                    fullWidth
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Position"
                    fullWidth
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(newDate) => setFormData({ ...formData, startDate: newDate })}
                      renderInput={(params) => <TextField fullWidth {...params} />}
                      sx={{width: "100%"}}
                    />
                  </LocalizationProvider>
                </Grid>


                <Grid item xs={12} md={6}>
                  <TextField
                    label="End Month"
                    select
                    fullWidth
                    disabled={currentlyWorking}
                    value={formData.endMonth}
                    onChange={(e) => setFormData({ ...formData, endMonth: e.target.value })}
                    error={!isEndDateValid()}
                    helperText={!isEndDateValid() ? "End date cannot be before start date" : ""}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={currentlyWorking}
                        onChange={(e) => setCurrentlyWorking(e.target.checked)}
                      />
                    }
                    label="Currently working here"
                  />
                </Grid>

                {!currentlyWorking && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="End Year"
                      select
                      fullWidth
                      value={formData.endYear}
                      onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                      error={!isEndDateValid()}
                      helperText={!isEndDateValid() ? "End year cannot be before start date" : ""}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={!isFormValid}
                  onClick={handleAddOrUpdateExperience}
                  sx={{
                    backgroundColor: "#790077",
                    color: "white",
                    "&:disabled": {
                      backgroundColor: "#f0e0f5",
                      color: "#999",
                    },
                  }}
                >
                  {editIndex !== null ? "Update experience" : "Add experience"}
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

export default ExperienceDialog;
