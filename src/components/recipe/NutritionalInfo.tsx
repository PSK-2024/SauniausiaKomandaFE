import React from 'react';
import { Box, Typography } from '@mui/material';

interface NutritionalInfoProps {
  ingredientCount: number;
  duration: number;
  calories: number;
}

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({
  ingredientCount,
  duration,
  calories,
}) => {
  return (
    <Box>
      <Typography>{ingredientCount} Ingredients</Typography>
      <Typography>{duration} Minutes</Typography>
      <Typography>{calories} Calories</Typography>
    </Box>
  );
};

export default NutritionalInfo;
