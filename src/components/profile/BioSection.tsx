import React from 'react';
import { Typography } from '@mui/material';

interface BioSectionProps {
  bio: string;
}

const BioSection: React.FC<BioSectionProps> = ({ bio }) => {
  return (
    <Typography variant='body1' sx={{ margin: 2, textAlign: 'center' }}>
      {bio}
    </Typography>
  );
};

export default BioSection;
