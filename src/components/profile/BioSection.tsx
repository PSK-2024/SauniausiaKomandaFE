import React from 'react';
import { Box, Typography } from '@mui/material';

interface BioSectionProps {
  bio: string;
}

const BioSection: React.FC<BioSectionProps> = ({ bio }) => {
  return (
    <Box sx={{ margin: 2, textAlign: 'start' }}>
      <Typography
        variant='h6'
        sx={{ mb: 2, fontWeight: 'bold', fontSize: '2rem' }}
      >
        About
      </Typography>
      <Typography variant='body1'>{bio}</Typography>
    </Box>
  );
};

export default BioSection;
