import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import useNavbar from '../hooks/useNavbar';

import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  const routes = useNavbar();

  //   <a href='#exercises' style={{ textDecoration: 'none', color: '#111' }}>
  //   Exercises
  // </a>
  return (
    <Stack
      direction='row'
      justifyContent='space-around'
      alignItems='center'
      sx={{
        gap: { sm: '123px', xs: '40px' },
        mt: { sm: '32px', xs: '20px' },
        justifyContent: 'none',
        ml: { sm: '0px' },
      }}
      px='20px'
      ml='40px'
    >
      <Link
        to='/'
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography
          color='#124c6e'
          fontWeight='600'
          sx={{
            fontSize: { xs: '26px', md: '30px', xl: '40px' },
          }}
        >
          FitGuide
        </Typography>
      </Link>
      <Stack
        direction='row'
        gap='40px'
        fontFamily='Alegreya'
        alignItems='flex-end'
      >
        {routes.map((item) => (
          <Link
            to={item.href}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              color='#111'
              borderBottom='3px solid #FF2625'
              sx={{
                fontSize: { xs: '20px', md: '22px', xl: '24px' },
                borderBottom: item.active ? '3px solid #090C15' : '',
              }}
            >
              {item.label}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default Navbar;
