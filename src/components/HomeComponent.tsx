import React, { useState, useEffect } from 'react';
import RecipeReviewCard from './RecipeReviewCard';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SidebarComponent from './SidebarComponent';

import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRecipes,
  fetchRecommendedRecipes,
} from '../state/thunk/recipeThunk';

import { allRecipesData, recommendedRecipesData } from '../data/MockRecipes';

import '../styles/homeComponent.css';

function HomeComponent() {
  const dispatch = useDispatch<AppDispatch>();

  // const recipes = useSelector((state: RootState) => state.recipeCard.recipes);
  // const recommendedRecipes = useSelector((state: RootState) => state.recipeCard.recommendedRecipes);
  const isLoading = useSelector((state: RootState) => state.recipeCard.loading);
  const error = useSelector((state: RootState) => state.recipeCard.error);

  const [redirectToUploadRecipePage, setRedirectToUploadRecipePage] =
    useState(false);
  const [showAllRecipes, setShowAllRecipes] = useState(false);

  const handleClickShareRecipe = () => {
    setRedirectToUploadRecipePage(true);
  };

  const toggleRecipesDisplay = () => {
    setShowAllRecipes(!showAllRecipes);
  };

  useEffect(() => {
    if (redirectToUploadRecipePage) {
      window.location.href = '/uploadRecipe';
    }
  }, [redirectToUploadRecipePage]);

  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchRecommendedRecipes());
  }, [dispatch]);

  return (
    <>
      {isLoading === 'pending' && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}

      <Link
        to={`/recipes/${allRecipesData[0].id}`}
        style={{ textDecoration: 'none' }}
      >
        <Box className='hero-image'>
          <img src={allRecipesData[0].img} alt='Hero' />
          <Box className='hero-image-text'>
            <Typography
              sx={{ color: '#DC582A', fontWeight: '400', fontSize: '30px' }}
            >
              Trending now
            </Typography>
            <Typography
              sx={{ color: '#ffffff', fontWeight: '600', fontSize: '50px' }}
            >
              {allRecipesData[0].title}
            </Typography>
          </Box>
        </Box>
      </Link>

      <Box className='button-container'>
        <Button variant='text' onClick={toggleRecipesDisplay}>
          {showAllRecipes ? 'Show Recommended Recipes' : 'Show All Recipes'}
        </Button>
        <Button onClick={handleClickShareRecipe}>Share your recipe</Button>
      </Box>

      <Box className='home-container-content'>
        <SidebarComponent />
        <Box className='recipes-container'>
          {showAllRecipes ? (
            allRecipesData.map(recipe => (
              <RecipeReviewCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                rating={recipe.rating}
                img={recipe.img}
                duration={recipe.duration}
              />
            ))
          ) : (
            <>
              {recommendedRecipesData.map(recommendedRecipe => (
                <RecipeReviewCard
                  key={recommendedRecipe.id}
                  id={recommendedRecipe.id}
                  title={recommendedRecipe.title}
                  rating={recommendedRecipe.rating}
                  img={recommendedRecipe.img}
                  duration={recommendedRecipe.duration}
                />
              ))}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default HomeComponent;
