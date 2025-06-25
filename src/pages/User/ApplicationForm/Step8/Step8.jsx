import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  styled,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Delete } from "@mui/icons-material";

const documentFields = [
  { label: "Passport", key: "passport" },
  { label: "English Language Proficiency Score", key: "english_language_score" },
  { label: "High School Diploma", key: "high_school_diploma" },
  { label: "High School Degree Transcript", key: "high_school_degree_transcript" },
  { label: "High School Diploma Equivalent", key: "high_school_diploma_equivalent" },
  { label: "Diploma or Transcripts Translations", key: "diploma_or_transcripts_translations" },
  { label: "Motivation Letter", key: "motivation_letter" },
  { label: "Additional Document", key: "additional_document" },
];

const UploadIconWrapper = styled(Box)(() => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: "#f3ebf6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const TableCellBox = styled(Box)(() => ({
  border: "1px solid #e0e0e0",
  padding: "0px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  height: 80,
}));

const Step8 = ({ applicationId }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileNames, setFileNames] = useState({});
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const authToken = localStorage.getItem("token");

  // 🔁 Reusable fetch function
  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${baseUrl}get_application`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const documents = response.data?.data?.documents || [];
      const initialFileNames = {};

      documents.forEach((doc) => {
        if (doc.type === "profile_image") {
          setPreviewImage(doc.file_path);
        } else {
          initialFileNames[doc.type] = doc.file_path;
        }
      });

      setFileNames(initialFileNames);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [applicationId]);

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("application_id", applicationId);
    formData.append("file_path", file);
    formData.append("type", type);

    try {
      const response = await axios.post(`${baseUrl}admission/step8`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        await fetchDocuments(); // ✅ Refresh view after successful upload
      }
    } catch (error) {
      console.error("Upload failed for:", type, error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      handleUpload(file, "profile_image");
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file, type);
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, md: "10px 35px" } }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Documents
      </Typography>
      <Grid container spacing={4}>
        {/* Profile Image Upload */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper
            elevation={0}
            sx={{
              height: 180,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3ebf6",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <input
              accept="image/*"
              id="upload-profile-pic"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-profile-pic" style={{ width: "100%", height: "100%" }}>
              {previewImage ? (
                <Box
                  component="img"
                  src={previewImage}
                  alt="Profile Preview"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#790077",
                  }}
                >
                  <AddIcon fontSize="large" />
                </Box>
              )}
            </label>

            {previewImage && (
              <Delete
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewImage(null);
                  setFileNames((prev) => ({ ...prev, profile_image: null }));
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  p: 1,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
                size="small"
              />
            )}
          </Paper>
        </Grid>

        {/* Document Uploads */}
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={0}>
            {documentFields.map(({ label, key }, index) => (
              <Grid key={key} item xs={12} sm={6}>
                <TableCellBox>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>
                      {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supported Format (.PDF)
                    </Typography>
                    {fileNames[key] && (
                      <Typography
                        variant="body2"
                        mt={1}
                        color="primary"
                        sx={{ cursor: "pointer", textDecoration: "underline" }}
                        onClick={() => window.open(fileNames[key], "_blank")}
                      >
                        View File
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <input
                      accept="application/pdf"
                      type="file"
                      style={{ display: "none" }}
                      id={`upload-${index}`}
                      onChange={(e) => handleFileChange(e, key)}
                    />
                    <label htmlFor={`upload-${index}`}>
                      <UploadIconWrapper>
                        <UploadFileIcon sx={{ fontSize: 16 }} color="action" />
                      </UploadIconWrapper>
                    </label>
                  </Box>
                </TableCellBox>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step8;
