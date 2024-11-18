import ClientCarousel from "@/components/ClientCarousel";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import Jumbotron from "@/components/Jumbotron";
import GoogleMapComponent from "@/components/Maps";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { Box, Divider, Typography } from "@mui/material";


export default async function Home() {

  return (
    <>
    <ResponsiveAppBar ></ResponsiveAppBar>
    <Jumbotron></Jumbotron>
    <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center'  }}>Compete in Bonspiels and Weekly Practices
    </Typography>
    <ClientCarousel ></ClientCarousel>
    <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center', padding: '10px'  }}>Curl at Madison Curling Club
        </Typography>
    <Box sx={{ 
mb: '15px', 
mr: '15px', 
ml: '15px', // Equal padding on all sides
mt: '0px', 
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
overflow: 'hidden',
      }}>
        <Box sx={{border: '5px solid #B22222', borderRadius:'5px', display: 'flex', justifyContent: 'center',
alignItems: 'center',
overflow: 'hidden',}}> 
        <GoogleMapComponent  /></Box></Box>
    
    <FAQAccordion />
      <Divider sx={{mt: '7px'}}></Divider>
    <Footer></Footer>
    </>
  );
}