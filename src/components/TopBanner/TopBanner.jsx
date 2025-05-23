import React from "react";
import Slider from "react-slick";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Image URLs
const images = [
  'https://propakistani.pk/wp-content/uploads/2023/07/3U1M-Superior-Universitys-Distinctive-Framework-with-Four-Specialized-Streams-to-Ensure-Employability-and-Career-Success.jpg',
  'https://www.superior.edu.pk/wp-content/uploads/2023/10/Main-Superior-University-1.webp',
  'https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/cover/1664.jpg?r=1',
];

// Custom arrow components
const ArrowLeft = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",
      zIndex: 1,
      backgroundColor: "#fff",
      boxShadow: 2,
      '&:hover': { backgroundColor: "#eee" }
    }}
  >
    <ArrowBackIos sx={{ color: "#9c27b0", fontSize: "12px", padding:"7px" }} />
  </IconButton>
);

const ArrowRight = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-50%)",
      zIndex: 1,
      backgroundColor: "#fff",
      boxShadow: 2,
      '&:hover': { backgroundColor: "#eee" }
    }}
  >
    <ArrowForwardIos sx={{ color: "#9c27b0", fontSize: "12px", padding:"7px" }} />
  </IconButton>
);

const CarouselSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };

  return (
    <Box width="100%" maxWidth="1400px" mx="auto" borderRadius={4} overflow="hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`slide-${index}`}
            sx={{
              height: "300px",
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselSlider;
