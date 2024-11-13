import ClientCarousel from "@/components/ClientCarousel";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import Jumbotron from "@/components/Jumbotron";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { Divider, Typography } from "@mui/material";


export default async function Home() {

  return (
    <>
    <ResponsiveAppBar ></ResponsiveAppBar>
    <Jumbotron></Jumbotron>
    <Typography variant="h4" sx={{ mt: 4, mb: 4, textAlign: 'center'  }}>Compete in Bonspiels and Weekly Practices
    </Typography>
    <ClientCarousel ></ClientCarousel>
    <FAQAccordion />
    <Footer></Footer>
    </>
  );
}