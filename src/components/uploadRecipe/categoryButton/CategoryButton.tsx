import React from 'react';
import Button from '@mui/material/Button';

interface CategoryButtonProps {
  categoryLabel: string;
  onClick: () => void;
  selected: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  categoryLabel,
  onClick,
  selected,
}) => {
  return (
    <Button
      onClick={onClick}
      variant='contained'
      sx={{
        flexGrow: 1,
        bgcolor: selected ? '#2E3D28' : '#509E2F',
        '&:hover': {
          bgcolor: '#607D3B',
        },
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
