"use client";
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { signIn } from "next-auth/react";
import Image from "next/image"; // Import Next.js Image component
import Bucky from "../components/curlingbucky.png";

// Style for parallax background
const ParallaxContainer = styled(Box)(({ theme }) => ({
  height: "65vh",
  maxHeight: "65vh", // Limit max height to 65% of the viewport height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative", // Important for positioning the content above the gradient
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0)), url('https://images.squarespace-cdn.com/content/v1/5f34a2ea0d87a44cac1ebfb0/0a282dbb-a6e4-4d39-a7fa-04c286e4e96b/thumbnail_image0.jpg')", // Gradient overlaid on image
  backgroundPosition: "center 20%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  color: "#fff",
  textAlign: "center",
  overflow: "hidden", // Prevent overflow
  backgroundAttachment: "fixed", // Default to fixed
  [theme.breakpoints.down("sm")]: {
    backgroundAttachment: "fixed", // Use 'fixed' for smaller screens
  },
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
          px: { xs: 2, sm: 4 }, // Add padding for small screens
          pb: { xs: 2, }
        }}
      >
        <Image
          src={Bucky}
          alt="Logo"
          width={200}
          height={200} // Set height explicitly for Next.js Image component
          style={{ maxWidth: "100%", objectFit: "contain" }}
        />

        <Typography
          variant="h3"
          component="h1"
          sx={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font sizes
          }}
        >
          Curling Club of UW-Madison
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontSize: { xs: "0.9rem", sm: "1.1rem" }, // Adjust text size for smaller screens
          }}
        >
          Join today and defend our 2024 College Curling National Championship!
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }} // Stack buttons vertically on smaller screens
          spacing={2}
          mt={2}
        >
          <Button
       
            variant="contained"
            onClick={() => signIn()}
            sx={{
              backgroundColor: "#585858",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#333333",
              },
              size: {xs: "small", sm:"medium", md:"large"},
              fontSize: { xs: "0.8rem", sm: "1rem" }, // Adjust button font size for smaller screens
              width: { xs: "100%", sm: "auto" }, // Buttons take full width on smaller screens
            }}
          >
            Member Login
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#585858",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#333333",
              },
              fontSize: { xs: "0.8rem", sm: "1rem" }, // Adjust button font size for smaller screens
              width: { xs: "100%", sm: "auto" }, // Buttons take full width on smaller screens
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
