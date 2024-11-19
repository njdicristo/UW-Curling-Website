"use client";
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import Image1 from '../components/umnbonspiel.jpg';
import Image2 from '../components/uwspbonspiel1.jpg';
import Image3 from '../components/uwspbonspiel2.jpg';
import Image4 from '../components/uwspbonspiel3.jpg';
import Image5 from '../components/uwspbonspiel4.jpg';
import Image6 from '../components/uwspbonspiel5.jpg';
import type { StaticImageData } from 'next/image';





interface ImageProps {
  src: StaticImageData;
}

const ImageCarousel: React.FC = () => {
  const images: ImageProps[] = [
    { src: Image1 },
    { src: Image2 },
    { src: Image3 },
    { src: Image4 },
    { src: Image5 },
    { src: Image6 },
  ];

  const imagePairs: [ImageProps, ImageProps | undefined][] = [];
  for (let i = 0; i < images.length; i += 2) {
    imagePairs.push([images[i], images[i + 1]]);
  }

  return (
    <Carousel

      swipe={false}
      duration={650}
      autoPlay={true}
      interval={3000}
      cycleNavigation={true}
      navButtonsAlwaysInvisible={true}
      indicators={false}
      animation="slide"
      sx={{
        maxWidth: '100%',
        margin: '0 auto',
        maxHeight: { xl: '350px', xs: '200px', sm: '350px' },
      }}
    >
      {imagePairs.map((pair, index) => (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" key={index} useFlexGap sx={{ mr: '15px', ml: '15px' }}>
          {pair.map((image, imageIndex) => (
            <Box
              key={imageIndex}

              sx={{
                width: 'auto',  // Keep it flexible for the image size
                height: { xl: '350px', xs: '200px', sm: '350px' },  // Fixed height
                maxWidth: '500px',  // Fixed max-width for consistency
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '15px',
                transition: 'transform 0.3s ',  // Smooth transition for the scale effect
                '&:hover img': {
                  transform: 'scale(1.05)',  // Zoom effect on hover
                },
              }}
            >
              {image && (
                <Image
                  priority={true}
                  placeholder="blur"
                  src={image.src}
                  alt={`Carousel Image ${index * 2 + imageIndex + 1}`}
                  width={500}
                  height={350}

                  style={{
                    border: '5px solid #B22222',
                    borderRadius: '15px',
                    objectFit: 'cover',  // Maintain the aspect ratio and cover the area
                    transition: 'transform 0.3s ease-in-out',  // Ensure the transition on the image as well

                  }}
                />
              )}
            </Box>
          ))}
        </Stack>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
