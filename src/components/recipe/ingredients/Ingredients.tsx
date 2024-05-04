import React from 'react';
import { List, ListItem } from '@mui/material';
import StepNumber from '../step/StepNumber';
import './Ingredients.css';

interface Ingredient {
  name: string;
  amount: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
}

const Ingredients: React.FC<IngredientsListProps> = ({ ingredients }) => {
  return (
    <List>
      {ingredients.map((ingredient, index) => (
        <ListItem key={index}>
          <div className='step-container'>
            <StepNumber number={index + 1} />
            <p>
              {ingredient.amount} {ingredient.name}
            </p>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default Ingredients;
