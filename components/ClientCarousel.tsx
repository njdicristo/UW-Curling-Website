"use client" 
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Box } from '@mui/material';

// Define a type for the image object
interface Image {
  src: string;
}

const ImageCarousel: React.FC = () => {
  // Define the images array with explicit typing
  const images: Image[] = [
    { src: 'https://lh3.googleusercontent.com/pw/AP1GczOOyr-k6ELvUFyDVxPKjts7M680HibpOVVH5xJAFSHGRXlIFkb6vXRcwlqL3mMJXCmWeLfcl5vXMOjG3lpAs8_W8IPZlaL16JsoPc3v0VmUURa01w17QMpufjyyRFCryRttsXegWpVqtJ3Mpa4eEVVl=w1271-h953-s-no-gm?authuser=0' },
    { src: 'https://lh3.googleusercontent.com/pw/AP1GczNJqwKgvCbUWcuGISHN5NRuZvI01IOuB_GOm8hATMmhFx5OEQPbGaIo5QMt0B--LOsdfChVmz7pUiL-VU56qJwdSw3FbGty2PxSSOQFxlqzjs5DAeN1caCzQR4FYoMxzihD11xW98xfGpucQLGFtPdWiQ=w715-h953-s-no-gm?authuser=0' },
    { src: 'https://lh3.googleusercontent.com/pw/AP1GczPG9g51rgfj-1r5pIFL7yRdmqI6US4fRysnLMlvYSi1XLNHyw5ayvSyWpXvVfAQfS9MRGHkMEgDmYJlH5Uvi0ysph3iKtIsFJsGdkM8IPhoIHVod3_HVsYgJcfk2n_E3dW5Rwk5ZuIJC21Ocm03YqjqLQ=w1271-h953-s-no-gm?authuser=0' },
    { src: 'https://lh3.googleusercontent.com/pw/AP1GczPI_nDjNgjURzVZZ2BDS1g_OcBT9B2F2QUf9EKUoh_5PJo84hWYKo12TZT_SyvIOhNZE0ChUWj-ohtNXpvqcR-XZ1NCgttHFT6kwK2ea8BO-7jGQBSPUusP0hh1KbCcTTpb5lIIp8emM8Y_qSrutPRsZg=w715-h953-s-no-gm?authuser=0' },
    { src: 'https://lh3.googleusercontent.com/pw/AP1GczO7l6SiNHqawcV6o3DoJB36gerqmyEVKEpItCWNzqI0OyuBebfvRON9o5ht6nj3lHlTKAd29sgR7T-39wxSJsc6JgFe0XmlyKMDCN3t4dmbPK6cjzcGbLHstwH8TECBygtVAefIKPNAXa3oVRpB83qB1A=w1271-h953-s-no-gm?authuser=0' },
    { src: 'https://lh3.googleusercontent.com/pw/AP1GczMLbm4I74qmdcrAR9TsiYwdH7gAmSsyzKlX01SwRngIv7xz7WuRHkTsMK99soh24S1gQQ8Giok9FHwX3JGhwJ-Nq2koa7XbEbAHYIN3wJ7CAkJr2YgBsfNanKw1rKi_QZAt9WtQv9Aapd3xS-1ne6LbfQ=w715-h953-s-no-gm?authuser=0' },
  ];

  // Group images into pairs
  const imagePairs: [Image, Image | undefined][] = [];
  for (let i = 0; i < images.length; i += 2) {
    imagePairs.push([images[i], images[i + 1]]);
  }

  return (
    <Carousel
      duration={650}
      autoPlay={true}
      interval={3000}
      cycleNavigation={true}
      navButtonsAlwaysInvisible={true}
      indicators={false}
      animation="slide"
      sx={{
        maxWidth: '1050px',
        margin: '0 auto',
        maxHeight: '350px'
      }}
    >
      {imagePairs.map((pair, index) => (
        <Grid container spacing={2} key={index} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          {pair.map((image, imageIndex) => (
            <Grid
              item
              xs={12} sm={6}
              key={imageIndex}
            >
              <Box
                sx={{
                  width: { xs: '100%', sm: '500px' },
                  height: '350px',
                  padding: '15px', // Equal padding on all sides
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover img': {
                    transform: 'scale(1.05)', // Slightly scale the image on hover
                  }
                }}
              >
                {image && (
                  <img
                    src={image.src}
                    alt={`Carousel Image ${index * 2 + imageIndex + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
