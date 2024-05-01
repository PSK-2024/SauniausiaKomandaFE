import React from 'react';

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
    <div className='nutrition-container'>
      <div className='ingredients-container'>
        <p className='count'>{ingredientCount}</p>
        <p className='label'>Ingredients</p>
      </div>
      <div className='duration-container'>
        <p className='count'>{duration}</p>
        <p className='label'>Minutes</p>
      </div>
      <div className='calories-container'>
        <p className='count'>{calories}</p>
        <p className='label'>Calories</p>
      </div>
    </div>
  );
};

export default NutritionalInfo;
