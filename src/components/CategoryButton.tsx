import React from 'react';
import Button from '@mui/material/Button';

interface CategoryButtonProps {
  categoryLabel: string; // Specifies that categoryLabel is expected to be a string
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ categoryLabel }) => {
  return (
    <Button
      variant='contained'
      sx={{
        flexGrow: 1,
        bgcolor: '#509E2F',
        m: 1,
        p: 2,
        typography: 'h6',
        '@media (min-width:768px)': {
          width: '200px',
        },
      }}
    >
      {categoryLabel}
    </Button>
  );
};

export default CategoryButton;
