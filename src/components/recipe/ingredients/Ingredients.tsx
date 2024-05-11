import React from 'react';
import { List, ListItem } from '@mui/material';
import StepNumber from '../step/StepNumber';
import './Ingredients.css';
import { Ingredient, IngredientGroup } from '../../../state/model/recipeModel';

interface IngredientsListProps {
  ingredients: Ingredient[] | IngredientGroup[];
}

const Ingredients: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const isGrouped = (
    ingredient: Ingredient | IngredientGroup
  ): ingredient is IngredientGroup => {
    return (ingredient as IngredientGroup).groupName !== undefined;
  };

  return (
    <List>
      {ingredients.map((ingredient, index) => {
        if (isGrouped(ingredient)) {
          return (
            <li key={index}>
              <ul>
                <p className='group-name'>{ingredient.groupName}</p>
                {ingredient.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex}>
                    <div className='step-container'>
                      <StepNumber number={itemIndex + 1} />
                      <p>
                        {item.amount} of {item.name}
                      </p>
                    </div>
                  </ListItem>
                ))}
              </ul>
            </li>
          );
        } else {
          return (
            <ListItem key={index}>
              <div className='step-container'>
                <StepNumber number={index + 1} />
                <p>
                  {ingredient.amount} of {ingredient.name}
                </p>
              </div>
            </ListItem>
          );
        }
      })}
    </List>
  );
};

export default Ingredients;
