import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Correct typing for onClick
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: -25,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      bgcolor: '#60c236',
      '&:hover': {
        bgcolor: '#367022',
      },
    }}
  >
    <ArrowForwardIosIcon sx={{ color: 'white' }} />
  </IconButton>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: -25,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      bgcolor: '#60c236',
      '&:hover': {
        bgcolor: '#367022',
      },
    }}
  >
    <ArrowBackIosIcon sx={{ color: 'white' }} />
  </IconButton>
);

export { NextArrow, PrevArrow };
