import React from 'react';
import { Typography } from '@mui/material';

interface SectionTitleProps {
  label: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ label }) => {
  return (
    <div>
      <Typography
        variant='h5'
        sx={{
          mt: 6,
          mb: 3,
          fontWeight: 'bold',
          lineHeight: 'normal',
          color: 'text.primary',
          '@media (max-width:768px)': {
            mt: 10,
            maxWidth: '100%',
            typography: 'h4',
          },
        }}
      >
        {label}
      </Typography>
    </div>
  );
};

export default SectionTitle;
