import React, { useEffect } from 'react';
import { fetchAllRecipes } from '../state/thunk/recipeThunk';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const RecipeComponent = () => {
  const recipes = useAppSelector(state => state.recipes.recipes);
  const loading = useAppSelector(state => state.recipes.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  if (loading === 'pending') return <div>Loading...</div>;

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </div>
  );
};

export default RecipeComponent;
