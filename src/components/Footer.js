import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo-1.png';

const Footer = () => (
  <Box mt='80px' bgcolor='#F4F4F5' width='100%' padding='20px'>
    <Typography
      variant='h5'
      sx={{ fontSize: { lg: '28px', xs: '20px' } }}
      mt='41px'
      textAlign='center'
      pb='40px'
      fontWeight='600'
    >
      Copyright &copy; 2023 FitGuide. All Rights Reserved
    </Typography>
  </Box>
);

export default Footer;
