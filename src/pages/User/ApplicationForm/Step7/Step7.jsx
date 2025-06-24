import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";
import EducationDialog from "../Dialog/EducationDialog";
import ExamDialog from "../Dialog/ExamDialog";
import ExperienceDialog from "../Dialog/ExperienceDialog";
import axios from "axios";
import Education from '../../../../assets/Education.svg'
import Exam from '../../../../assets/Grades.svg'
import Experience from '../../../../assets/New Job.svg'




const infoOptions = [
  { label: "Education", icon: Education },
  { label: "Exam", icon: Exam },
  { label: "Experience", icon: Experience },
];

const Step7 = ({ selectedEducation, setSelectedEducation }) => {
  const [openDialog, setOpenDialog] = useState(null);
  const [isEducationAdded, setIsEducationAdded] = useState(false);
  const [isExamAdded, setIsExamAdded] = useState(false);
  const [isExperienceAdded, setIsExperienceAdded] = useState(false);

  const handleOpen = (label) => {
    setSelectedEducation(label);
    setOpenDialog(label);
  };

  const handleClose = () => {
    setOpenDialog(null);
  };

  const getIconColor = (label) => {
    if (label === "Education" && isEducationAdded) return "green";
    if (label === "Exam" && isExamAdded) return "green";
    if (label === "Experience" && isExperienceAdded) return "green";
    return "#790077";
  };

  const getIcon = (label) => {
    if (label === "Education" && isEducationAdded) return <CheckIcon />;
    if (label === "Exam" && isExamAdded) return <CheckIcon />;
    if (label === "Experience" && isExperienceAdded) return <CheckIcon />;
    return <AddIcon fontSize="small" />;
  };

  // 🛠 Fetch Education, Exam, Experience data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}get_application`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const education = response?.data?.data?.education || [];
        const exam = response?.data?.data?.exams || [];
        const experience = response?.data?.data?.experiences || [];

        if (education.length > 0) setIsEducationAdded(true);
        if (exam.length > 0) setIsExamAdded(true);
        if (experience.length > 0) setIsExperienceAdded(true);

      } catch (error) {
        console.error("Failed to fetch education/exam/experience data:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" mb={4} sx={{ color: "#202224", letterSpacing: "0.3px" }}>
        Educational Information
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {infoOptions.map((option) => (
          <Grid item key={option.label}>
          <Card
            variant="outlined"
            sx={{
              width: 170,
              height: 170,
              borderRadius: 2,
              position: "relative",
              borderColor: selectedEducation === option.label ? "#790077" : "#ccc",
            }}
          >
            <CardActionArea onClick={() => handleOpen(option.label)}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "140px",
                }}
              >
                <img
                  src={option.icon}
                  alt={option.label}
                  style={{ width: 50, height: 50, marginBottom: 10, opacity: 0.6 }}
                />
                <Typography>{option.label}</Typography>
              </CardContent>
            </CardActionArea>
        
            {/* Move IconButton OUTSIDE CardActionArea */}
            <IconButton
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: getIconColor(option.label),
                color: "white",
                width: 30,
                height: 30,
                "&:hover": {
                  backgroundColor: getIconColor(option.label) === "green" ? "#0b850b" : "#5e005f",
                },
              }}
            >
              {getIcon(option.label)}
            </IconButton>
          </Card>
        </Grid>        
        ))}
      </Grid>

      {/* Dialogs */}
      <EducationDialog
        open={openDialog === "Education"}
        handleClose={handleClose}
        setIsEducationAdded={setIsEducationAdded}
      />
      <ExamDialog
        open={openDialog === "Exam"}
        handleClose={handleClose}
        setIsExamAdded={setIsExamAdded}
      />
      <ExperienceDialog
        open={openDialog === "Experience"}
        handleClose={handleClose}
        setIsExperienceAdded={setIsExperienceAdded}
      />
    </Box>
  );
};

export default Step7;
