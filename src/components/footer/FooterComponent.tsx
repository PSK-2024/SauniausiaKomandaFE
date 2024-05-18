import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';

function FooterComponent() {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        bgcolor: '#ffffff',
        borderTop: '1px solid #509E2F',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='h6' color='textPrimary' gutterBottom>
            <img src='/app-logo.png' alt='Logo' style={{ height: 120 }} />
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Address: 1234 Street Address, City, Country
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant='body1' color='textPrimary' gutterBottom>
            Connect with us:
          </Typography>
          <IconButton href='https://facebook.com' color='inherit'>
            <FacebookIcon />
          </IconButton>
          <IconButton href='https://twitter.com' color='inherit'>
            <TwitterIcon />
          </IconButton>
          <IconButton href='https://instagram.com' color='inherit'>
            <InstagramIcon />
          </IconButton>
          <Typography variant='body1' color='textSecondary' gutterBottom>
            <PhoneIcon sx={{ verticalAlign: 'middle' }} /> (123) 456-7890
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default FooterComponent;
