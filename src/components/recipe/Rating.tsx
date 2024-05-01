import React from 'react';
import { Rating as MuiRating } from '@mui/material';

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <div className='rating-container'>
      <MuiRating name='recipe-rating' value={value} readOnly />
    </div>
  );
};

export default Rating;
