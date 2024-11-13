import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

const FAQAccordion = () => {
  const faqs = [
    { question: 'Do I need prior curling experience?', answer: 'Absolutely not! Very few of us have curled before joining the club. We will teach you quickly and get you on the road in no time.' },
    { question: 'Do I need to buy equipment?', answer: 'We have our own club equipment, but encourage interested players to purchase their own gear once they get a hang for the sport.' },
    { question: 'How often do you travel and play games?', answer: 'We attend weekend-long college bonspiels usually once or twice a month once the season ramps up in October. We also compete in one-on-one team match plays that are usually day trips.' },
  ];

  return (
    <Box 
      sx={{ 
        width: '50%', 
        margin: '0 auto', 
        paddingTop: 5,
      }}
    >
        <Typography variant="h5"sx={{ 
            textAlign: 'center'
      }}>
            FAQs
        </Typography>
        <Divider sx={{mb: 1}}></Divider>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQAccordion;
