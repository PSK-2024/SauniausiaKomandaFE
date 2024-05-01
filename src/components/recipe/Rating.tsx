import React from 'react';
import { Rating as MuiRating } from '@mui/material';

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  return <MuiRating name='recipe-rating' value={value} readOnly />;
};

export default Rating;
