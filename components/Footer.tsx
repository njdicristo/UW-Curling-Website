import React from 'react';
import { Box, Typography,  } from '@mui/material';
import type { SVGProps } from 'react';

export function HugeiconsCurling(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 15h10m-4.998 5h9.996c1.868 0 2.802 0 3.498-.402c1.666-.962 1.5-2.91 1.5-4.598s.166-3.636-1.5-4.598c-.265-.153-.564-.248-.937-.306c-.297-.047-.446-.07-.543-.141s-.157-.189-.278-.425l-1.13-2.213C16.189 4.574 15.228 4 12.055 4h-4.44c-.59 0-1.21.002-1.474.617c-.185.433-.185 1.333 0 1.766c.264.615.883.617 1.473.617h4.104c1.68 0 1.996.812 2.056 2v0c.023.46.035.69-.113.845s-.39.155-.874.155H7.002c-1.868 0-2.802 0-3.498.402c-1.666.962-1.5 2.91-1.5 4.598s-.166 3.636 1.5 4.598C4.2 20 5.134 20 7.002 20" color="white"></path></svg>);
}
const Footer = () => {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#FAF3E0',
        textAlign: 'center',
        justifyContent: 'center',
alignItems: 'center'
      }}
    >

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Curling Club of UW-Madison. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;