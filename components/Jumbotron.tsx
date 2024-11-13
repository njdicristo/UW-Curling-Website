"use client"
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";

// Style for parallax background
const ParallaxContainer = styled(Box)(({ theme }) => ({
  height: "65vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative", // Important for positioning the content above the gradient
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0)), url('https://images.squarespace-cdn.com/content/v1/5f34a2ea0d87a44cac1ebfb0/0a282dbb-a6e4-4d39-a7fa-04c286e4e96b/thumbnail_image0.jpg')", // Gradient overlaid on image
  backgroundAttachment: "fixed",
  backgroundPosition: "center 16% ",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  color: "#fff",
  textAlign: "center",
}));

// Main Jumbotron component
const Jumbotron = () => {
  return (
    <ParallaxContainer>
      <Stack spacing={2} alignItems="center">
        <img src="https://github.com/njdicristo/UW-Curling-Website/blob/main/curlingbucky-ai-brush-removebg-9co1clup.png?raw=true" alt="Logo" width={150} height="auto" /> {/* Replace with logo URL */}
        
        <Typography variant="h3" component="h1">
          Curling Club of UW-Madison
        </Typography>
        
        <Typography variant="h6">
          Join today and defend our 2024 College Curling National Championship!
        </Typography>
        
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" sx={{ backgroundColor: '#585858', // Set background color to black
          color: '#ffffff',           // Set text color to white
          '&:hover': {
            backgroundColor: '#333333', // Darker black/gray when hovering
          },}} >
            Member Login
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#585858', // Set background color to black
          color: '#ffffff',           // Set text color to white
          '&:hover': {
            backgroundColor: '#333333', // Darker black/gray when hovering
          },}} >
            Learn More
          </Button>
        </Stack>
      </Stack>
    </ParallaxContainer>
  );
};

export default Jumbotron;
