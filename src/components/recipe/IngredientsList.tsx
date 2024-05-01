import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

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
          <ListItemText primary={`${ingredient.amount} ${ingredient.name}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default IngredientsList;
