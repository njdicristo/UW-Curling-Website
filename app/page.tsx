import ClientCarousel from "@/components/ClientCarousel";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { Box, Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import Carousel from 'react-material-ui-carousel'

export default async function Home() {

  return (
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
    <Box
      sx={{
        width: '100%',
        height: '60vh', // Adjust height as desired
        backgroundImage: `url('https://milwaukeecurlingclub.com/data/141/images/shed-pan.jpg')`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Box sx={{  width: '200px',
        height: '200px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',}}
        component="img"
        src="https://github.com/njdicristo/UW-Curling-Website/blob/main/curlingbucky.jpg?raw=true"
        >

      </Box>
      <Typography variant="h5" sx={{ mt: 2 }}>
        College Curling at UW-Madison
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        Join today and defend our 2024 College Curling National Championship!
      </Typography>
      <Box>
        <Button variant="contained" color="primary" sx={{ mr: 2 }} size="large">
          Members
        </Button>
        <Button variant="contained" color="primary" size="large">
          Learn More
        </Button>
      </Box>
    </Box>
    <Typography variant="h4" sx={{ mt: 4, mb: 4, textAlign: 'center'  }}>Compete in Bonspiels and Weekly Practices
    </Typography>
    <ClientCarousel ></ClientCarousel>
    </>
  );
}