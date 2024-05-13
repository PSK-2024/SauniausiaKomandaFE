import React, { useEffect } from 'react';
import { fetchRecipeById } from '../../state/thunk/recipeThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';

const RecipeComponent = () => {
  const { id } = useParams<{ id: string }>();
  const loading = useAppSelector(state => state.recipe.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (loading === 'pending') return <div>Loading...</div>;

  return (
    <div>
      <h1>Recipe page</h1>
      <h2>{id}</h2>
    </div>
  );
};

export default RecipeComponent;
