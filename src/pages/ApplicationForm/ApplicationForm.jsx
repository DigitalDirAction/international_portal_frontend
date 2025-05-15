// ApplicationForm.jsx
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
  StepConnector,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react"; // already imported from useState
import { AccessTime, East, KeyboardBackspace } from "@mui/icons-material";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import Step5 from "./Step5/Step5";
import Step6 from "./Step6/Step6";
import Step7 from "./Step7/Step7";
import Step8 from "./Step8/Step8";
import axios from "axios";


const steps = ["1", "2", "3", "4", "5", "6", "7", "8"];

const CustomConnector = styled(StepConnector)(() => ({
  '&.MuiStepConnector-alternativeLabel': {
    top: 25,
  },
  '& .MuiStepConnector-line': {
    height: 2,
    border: 0,
    backgroundColor: '#EDEDED',
  },
}));

const CustomStepIcon = ({ icon, active, completed }) => (
  <Box
    sx={{
      width: 50,
      height: 50,
      borderRadius: "50%",
      backgroundColor: active || completed ? "#F2E5F1" : "#EDEDED",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: active || completed ? "#790077" : "#888",
      fontSize: "18px",
    }}
  >
    {icon}
  </Box>
);

const ApplicationForm = () => {
  const { stepNumber, applicationId: urlAppId } = useParams();
  const [activeStep, setActiveStep] = useState(parseInt(stepNumber || "0"));
  const [applicationId, setApplicationId] = useState(urlAppId !== "new" ? urlAppId : null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedEducation, setSelectedEducation] = useState(false);
  const [selectedExam, setSelectedExam] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(false);
//   const [selectedDuration, setSelectedDuration] = useState("");
// const [selectedThesis, setSelectedThesis] = useState("");
const [uploadedDocs, setUploadedDocs] = useState({});
const [profilePicFile, setProfilePicFile] = useState(null);
const userId = localStorage.getItem('userId');




  const navigate = useNavigate();

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    navigate(`/application-form/${applicationId}/step/${nextStep}`);
  };
  
  const handleBack = () => {
    if (activeStep === 0) {
      navigate(-1);
    } else {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
      navigate(`/application-form/${applicationId}/step/${prevStep}`);
    }
  };

  useEffect(() => {
    if (stepNumber && !isNaN(parseInt(stepNumber))) {
      setActiveStep(parseInt(stepNumber));
    }
  }, [stepNumber]);

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!applicationId || applicationId === "new") return;
  
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // get userId from localStorage (important)
  
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}get_application`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const applications = response.data.data.application || [];
        const profile = response.data.data.profile || null;
  
        const matchedApp = applications.find(app => app.id === Number(applicationId));
        const documents = response.data.data.documents || {};
  
        if (matchedApp) {
          // Set application related fields
          setSelectedType(matchedApp.application_type || null);
          setSelectedTerm(matchedApp.term || null);
          setSelectedDegree(matchedApp.degree || null);
          setSelectedProgram(matchedApp.program_id || null);
        }
  
        if (profile && profile.created_by === Number(userId)) {
          // Set profile related fields
          setFormData(prev => ({
            ...prev,
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            dob: profile.date_of_birth || "",
            gender: profile.gender || "",
            citizenship: profile.citizenship || "",
            passportNumber: profile.passport_number || "",
            passportIssueDate: profile.passport_issue_date || "",
            passportExpiryDate: profile.passport_expiry_date || "",
            passportCountry: profile.passport_country || "",
            secondaryCitizenship: profile.secondary_citizenship || "",
            fatherName: profile.father_name || "",
            motherName: profile.mother_name || "",
            email: profile.email || "",
            phone: profile.mobile_number || "",
            address: profile.address || "",
            city: profile.city || "",
            contactCountry: profile.country || "",
          }));
        }

      if (documents) {
        setUploadedDocs({
          "Passport": documents.passport || null,
          "High School Diploma": documents.high_school_diploma || null,
          "High School Diploma Equivalent": documents.high_school_diploma_equivalent || null,
          "Motivation Letter": documents.motivation_letter || null,
          "English Language Proficiency Score": documents.english_language_score || null,
          "High School Degree Transcript": documents.high_school_degree_transcript || null,
          "Diploma or Transcripts Translations": documents.diploma_or_transcripts_translations || null,
          "Additional Document": documents.additional_document || null,
        });

        setProfilePicFile(documents.profile_image || null);
      }
  
      } catch (error) {
        console.error("Failed to fetch existing application data:", error.response?.data || error.message);
      }
    };
  
    fetchApplicationData();
  }, [applicationId]);
  
  
  
  const handleSaveStep1 = async () => {
    try {
      const token = localStorage.getItem("token"); // Adjust if you're using Redux/Context
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admission/step1`,
        {
          application_id: applicationId, // initially null
          application_type: selectedType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const returnedId = response.data.data?.id;
      if (returnedId) {
        setApplicationId(returnedId);
        console.log("New Application ID:", returnedId);
      }
  
      handleNext();
    } catch (error) {
      console.error("Error in Step 1:", error.response?.data || error.message);
      // Optional: toast error here
    }
  };

  const handleSaveStep2 = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admission/step2`,
        {
          application_id: applicationId,
          term: selectedTerm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Step 2 submitted:", response.data);
      handleNext(); // Proceed to next step on success
    } catch (error) {
      console.error("Error in Step 2:", error.response?.data || error.message);
      // Optional: toast for error
    }
  };

  const handleSaveStep3 = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admission/step3`,
        {
          application_id: applicationId,
          degree: selectedDegree,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Step 3 submitted:", response.data);
      handleNext(); // Move to Step 4 on success
    } catch (error) {
      console.error("Error in Step 3:", error.response?.data || error.message);
      // Optional: toast for feedback
    }
  };

  const handleSaveStep4 = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const payload = {
        application_id: applicationId,
        program_id: selectedProgram, // ✅ Corrected
      };
  
      console.log("Step 4 Payload", payload);
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admission/step4`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Step 4 submitted:", response.data);
      handleNext();
    } catch (error) {
      console.error("Error in Step 4:", error.response?.data || error.message);
    }
  };


  const handleSaveStep5 = async () => {
    const token = localStorage.getItem("token");

    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.gender || !formData.citizenship || !formData.passportNumber || !formData.passportIssueDate || !formData.passportExpiryDate || !formData.passportCountry) {
      alert("Please fill all required fields.");
      return;
    }
    
  
    const payload = {
      application_id: applicationId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      gender: formData.gender,
      date_of_birth: formData.dob,
      citizenship: formData.citizenship,
      secondary_citizenship: formData.secondaryCitizenship || null, // optional
      passport_number: formData.passportNumber,
      passport_issue_date: formData.passportIssueDate,
      passport_expiry_date: formData.passportExpiryDate,
      passport_country: formData.passportCountry,
    };
  
    try {
      console.log("Step 5 Payload:", payload);
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admission/step5`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Step 5 submitted:", response.data);
      handleNext(); // Move to step 6
    } catch (error) {
      console.error("Error in Step 5:", error.response?.data || error.message);
    }
  };
  
  
  const handleSaveStep6 = async () => {
    const token = localStorage.getItem("token");
  
    // Optional validation
    if (!formData.fatherName || !formData.motherName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.contactCountry) {
      alert("Please fill in all required contact details.");
      return;
    }
  
    const payload = {
      application_id: applicationId,
      father_name: formData.fatherName,
      mother_name: formData.motherName,
      email: formData.email,
      mobile_number: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.contactCountry,
    };
  
    try {
      console.log("Step 6 Payload:", payload);
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admission/step6`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Step 6 submitted:", response.data);
      handleNext(); // Move to Step 7
    } catch (error) {
      console.error("Error in Step 6:", error.response?.data || error.message);
    }
  };
  
  // const handleSaveStep8 = async (documents, profileImage) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const formData = new FormData();
  
  //     formData.append("application_id", applicationId);
  //     formData.append("profile_image", profileImage);
  //     formData.append("passport", documents["Passport"]);
  //     formData.append("english_language_score", documents["English Language Proficiency Score"]);
  //     formData.append("high_school_diploma", documents["High School Diploma"]);
  //     formData.append("high_school_degree_transcript", documents["High School Degree Transcript"]);
  //     formData.append("high_school_diploma_equivalent", documents["High School Diploma Equivalent"]);
  //     formData.append("diploma_or_transcripts_translations", documents["Diploma or Transcripts Translations"]);
  //     formData.append("motivation_letter", documents["Motivation Letter"]);
  //     formData.append("additional_document", documents["Additional Document"]);
  
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}admission/step8`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  
  //     console.log("Step 8 submitted:", response.data);
  //     handleNext();
  //   } catch (error) {
  //     console.error("Error in Step 8:", error.response?.data || error.message);
  //   }
  // };
  
  
  
  
  
  
  
  

  return (
    <Box sx={{ p: 2, flex: 1, mt: 10 }}>
      <Box sx={{ backgroundColor: "white", borderRadius: "10px", maxHeight: "80vh" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", padding: "15px 25px", borderBottom: "1px solid #97979738" }}>
          <AccessTime sx={{ backgroundColor: "#F2E5F1", color: "#790077", borderRadius: "20px", padding: "8px", fontSize: "20px" }} />
          <Typography variant="h5" sx={{ color: "#202224" }}>Application Form</Typography>
        </Box>

        <Box sx={{ padding: "15px 25px", overflowX: "auto" }}>
          <Box sx={{ minWidth: "600px" }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<CustomConnector />}
              sx={{ m: 2 }}
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel
                    StepIconComponent={(props) => (
                      <CustomStepIcon icon={label} active={props.active} completed={props.completed} />
                    )}
                  />

                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>

      <Box overflow="auto">
        {activeStep === 0 && <Step1 selectedType={selectedType} setSelectedType={setSelectedType} />}
        {activeStep === 1 && <Step2 applicationId={applicationId} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />}
        {activeStep === 2 && <Step3 selectedDegree={selectedDegree} setSelectedDegree={setSelectedDegree} />}
        {activeStep === 3 && <Step4
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          // setSelectedDuration={setSelectedDuration}
          // setSelectedThesis={setSelectedThesis}
        />}
        {activeStep === 4 && <Step5 formData={formData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />}
        {activeStep === 5 && <Step6 formData={formData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />}
        {activeStep === 6 && (
          <Step7
            selectedEducation={selectedEducation}
            setSelectedEducation={setSelectedEducation}
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {activeStep === 7 && (
  <Step8
    handleNext={handleNext}
    handleBack={handleBack}
    // setUploadedDocs={setUploadedDocs}
    // setProfilePicFile={setProfilePicFile}
    applicationId={applicationId}
  />
)}

        </Box>


        {(activeStep < 8) && (
          <Box p={5} mt={1} display="flex" justifyContent="space-between">
            <Button
              sx={{ backgroundColor: "#DBDBDB", textTransform: "none", gap: 1, color: "#404040", px: 2 }}
              onClick={handleBack}
            >
              <KeyboardBackspace
                sx={{ border: "1px solid #404040", borderRadius: "50%", padding: "3px", fontSize: "13px", color: "#404040" }}
              />
              Back
            </Button>
            <Button
              onClick={
                activeStep === 0
                  ? handleSaveStep1
                  : activeStep === 1
                  ? handleSaveStep2
                  : activeStep === 2
                  ? handleSaveStep3
                  : activeStep === 3
                  ? handleSaveStep4
                  : activeStep === 4
                  ? handleSaveStep5
                  : activeStep === 5
                  ? handleSaveStep6
                  : activeStep === 7
                  ? () => navigate("/dashboard")
                  : handleNext

              }
              
              
              disabled={
                (activeStep === 0 && !selectedType) ||
                (activeStep === 1 && !selectedTerm) ||
                (activeStep === 2 && !selectedDegree) ||
                (activeStep === 3 && !selectedProgram) ||
                (activeStep === 5 && (!formData.fatherName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.contactCountry))
              }
              
              sx={{ backgroundColor: "#790077", textTransform: "none", gap: 1, color: "white", px: 2 }}
            >
              {activeStep === 7 ? "Done" : "Next"}
              {activeStep !== 7 && (
                <East
                  sx={{
                    border: "1px solid white",
                    borderRadius: "50%",
                    padding: "3px",
                    fontSize: "13px",
                    color: "white",
                  }}
                />
              )}
            </Button>



          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ApplicationForm;
