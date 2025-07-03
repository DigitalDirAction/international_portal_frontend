import React from "react";
import Slider from "react-slick";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../assets/DJI_0108-scaled-1 1.svg'
import slider2 from '../../assets/image 11.svg'
import slider3 from '../../assets/image 9.svg'

// Image URLs
const images = [
  slider1,
  slider2,
  slider3,
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
    <Box width="100%" mx="auto" borderRadius={4} overflow="hidden">
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
