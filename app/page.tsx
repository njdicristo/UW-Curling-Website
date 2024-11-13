import ClientCarousel from "@/components/ClientCarousel";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import Jumbotron from "@/components/Jumbotron";
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
    <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center'  }}>Curl at Madison Curling Club
        </Typography>
    <Box sx={{ 

padding: '15px', // Equal padding on all sides
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
overflow: 'hidden',
      }}>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2916.5000179052436!2d-89.28976662337158!3d43.03090999245527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880651cce7318561%3A0x1d60959ee26fced1!2sMadison%20Curling%20Club!5e0!3m2!1sen!2sus!4v1731486445129!5m2!1sen!2sus" width="500" height="350" loading="eager"></iframe>
    </Box>
    <FAQAccordion />

    <Footer></Footer>
    </>
  );
}