"use client"
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { signIn } from "next-auth/react";

// Style for parallax background
const ParallaxContainer = styled(Box)(({ theme }) => ({
  height: "65vh",
  maxHeight: "65vh", // Limit max height to 65% of the viewport height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative", // Important for positioning the content above the gradient
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0)), url('https://images.squarespace-cdn.com/content/v1/5f34a2ea0d87a44cac1ebfb0/0a282dbb-a6e4-4d39-a7fa-04c286e4e96b/thumbnail_image0.jpg')", // Gradient overlaid on image
  backgroundAttachment: "fixed",
  backgroundPosition: "center 20% ",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  color: "#fff",
  textAlign: "center",
  overflow: "hidden", // Prevent overflow
}));

// Main Jumbotron component
const Jumbotron = () => {
  return (
    <ParallaxContainer>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{
          maxHeight: "100%", // Ensures stack content does not exceed container height
          overflow: "hidden",
        }}
      >
        <img
          src="https://github.com/njdicristo/UW-Curling-Website/blob/main/curlingbucky-ai-brush-removebg-9co1clup.png?raw=true"
          alt="Logo"
          width={200}
          height="auto"
          style={{ maxWidth: "100%", objectFit: "contain" }}
        /> {/* Replace with logo URL */}
        
        <Typography
          variant="h3"
          component="h1"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          Curling Club of UW-Madison
        </Typography>
        
        <Typography
          variant="h6"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Join today and defend our 2024 College Curling National Championship!
        </Typography>
        
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            size="large"
            variant="contained"
            onClick={() => signIn()}
            sx={{
              backgroundColor: '#585858',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}
          >
            Member Login
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#585858',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}
          >
            Learn More
          </Button>
        </Stack>
      </Stack>
      
    </ParallaxContainer>
    
  );
};

export default Jumbotron;
