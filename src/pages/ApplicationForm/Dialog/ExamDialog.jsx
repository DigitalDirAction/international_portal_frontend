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

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const ExamDialog = ({ open, handleClose, setIsExamAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    score: "",
    exam_date: "",
  });
  const [examList, setExamList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const isFormValid = Object.entries(formData)
    .every(([, val]) => typeof val === "string" && val.trim());

  // 🛠 Fetch exam data from API when dialog opens
  useEffect(() => {
    const fetchExamData = async () => {
      if (!open) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}get_application`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const examArray = response?.data?.data?.exams || [];

        const mappedExams = examArray.map((exam) => ({
          id: exam.id || null,
          name: exam.name || "",
          score: exam.score || "",
          exam_date: exam.exam_date || "",
        }));

        setExamList(mappedExams);
        if (mappedExams.length > 0) {
          setIsExamAdded(true);
        }
      } catch (error) {
        console.error("Failed to fetch exam data:", error.response?.data || error.message);
      }
    };

    fetchExamData();
  }, [open]);

  const handleAddOrUpdateExam = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      name: formData.name,
      score: formData.score,
      exam_date: formData.exam_date,
    };

    try {
      if (editIndex !== null) {
        const id = examList[editIndex].id;
        await axios.put(`${import.meta.env.VITE_BASE_URL}admission/exam/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updated = [...examList];
        updated[editIndex] = { ...formData, id };
        setExamList(updated);
        setEditIndex(null);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}admission/exam`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const newRecord = response.data.data;
        setExamList([...examList, { id: newRecord.id, ...formData }]);
      }

      setIsExamAdded(true);
      setFormData({ name: "", score: "", exam_date: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Exam submission error:", error.response?.data || error.message);
    }
  };

  const handleEdit = (index) => {
    const exam = examList[index];
    setFormData({
      name: exam.name ?? "",
      score: exam.score?.toString() ?? "",
      exam_date: exam.exam_date ?? "",
    });
    setEditIndex(index);
    setShowForm(true);
  };
  

  const handleDelete = (index) => {
    const updated = examList.filter((_, i) => i !== index);
    setExamList(updated);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} sx={{ borderRadius: "15px" }}>
      <Box px={2} py={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle sx={{ fontSize: "1.3rem", fontWeight: 500, py: 1 }}>Exam</DialogTitle>

          <Box display="flex" alignItems="center" gap={1}>
            {!showForm && (
              <Button
                variant="outlined"
                onClick={() => setShowForm(true)}
                sx={{ textTransform: "none", borderColor: "#790077", color: "#790077", fontSize: 11 }}
              >
                + Add exam
              </Button>
            )}
            <IconButton onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0 }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <DialogContent sx={{ minHeight: "400px", py: 1 }}>
          {!showForm ? (
            <>
              <Typography variant="subtitle2" fontSize={12} color="#35353575" mb={2}>
                Enter your exam
              </Typography>
              {examList.length === 0 ? (
                <Typography variant="body2" sx={{ color: "red", fontStyle: "italic" }}>
                  No data added
                </Typography>
              ) : (
                <Box>
                  {examList.map((exam, i) => (
                    <Box key={i} mb={1} p={1} border="1px solid #ccc" borderRadius="8px">
                      <Typography fontWeight={500} fontSize="14px">{exam.name}</Typography>
                      <Typography fontSize="12px">Date: {exam.exam_date}</Typography>
                      <Typography fontSize="12px">Score: {exam.score}</Typography>
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
          ) : (
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name"
                    placeholder="Ex: IELTS"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Score"
                    placeholder="Ex: 8.5"
                    fullWidth
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Exam date"
                    select
                    fullWidth
                    value={formData.exam_date}
                    onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={() => {
                  setShowForm(false);
                  setFormData({ name: "", score: "", exam_date: "" });
                  setEditIndex(null);
                }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={!isFormValid}
                  onClick={handleAddOrUpdateExam}
                  sx={{
                    backgroundColor: "#790077",
                    color: "white",
                    '&:disabled': {
                      backgroundColor: "#f0e0f5",
                      color: "#999"
                    }
                  }}
                >
                  {editIndex !== null ? "Update" : "Add exam"}
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

export default ExamDialog;
