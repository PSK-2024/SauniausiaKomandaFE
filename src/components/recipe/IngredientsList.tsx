import React from 'react';
import { List, ListItem } from '@mui/material';
import ListNumber from './ListNumber';

interface Ingredient {
  name: string;
  amount: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  return (
    <List>
      {ingredients.map((ingredient, index) => (
        <ListItem key={index}>
          <div className='step-container'>
            <ListNumber number={index + 1} />
            <p>
              {ingredient.amount} {ingredient.name}
            </p>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default IngredientsList;
