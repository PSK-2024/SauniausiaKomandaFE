import React, { useState, useEffect } from 'react';
import RecipeReviewCard from '../recipeCard/RecipeReviewCard';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SidebarComponent from '../navBar/SidebarComponent';

import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRecipes,
  fetchRecommendedRecipes,
} from '../../state/thunk/recipeThunk';

import './homeComponent.css';

function HomeComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const recommendedRecipes = useSelector(
    (state: RootState) => state.recipes.recommendedRecipes
  );
  const filteredRecipes = useSelector(
    (state: RootState) => state.recipes.filteredRecipes
  );

  const statusAll = useSelector((state: RootState) => state.recipes.statusAll);
  const statusRecommended = useSelector(
    (state: RootState) => state.recipes.statusRecommended
  );
  const statusFiltered = useSelector(
    (state: RootState) => state.recipes.statusFiltered
  );
  const error = useSelector((state: RootState) => state.recipes.error);

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
    if (recipes.length < 1) {
      dispatch(fetchAllRecipes());
    }
    if (recommendedRecipes.length < 1) {
      dispatch(fetchRecommendedRecipes());
    }
  }, [dispatch, recipes, recommendedRecipes]);

  if (
    statusAll === 'loading' ||
    statusRecommended === 'loading' ||
    statusFiltered === 'loading'
  ) {
    return <CircularProgress />;
  }
  if (error) return <Typography>Error occurred. Try again!</Typography>;

  return (
    <>
      <Link to={`/recipes/${recipes[0].id}`} style={{ textDecoration: 'none' }}>
        <Box className='hero-image'>
          <img src={recipes[0].img} alt='Hero' />
          <Box className='hero-image-text'>
            <Typography
              sx={{ color: '#DC582A', fontWeight: '400', fontSize: '30px' }}
            >
              Trending now
            </Typography>
            <Typography
              sx={{ color: '#ffffff', fontWeight: '600', fontSize: '50px' }}
            >
              {recipes[0].title}
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
          {statusFiltered === 'succeeded' && filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <RecipeReviewCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                rating={recipe.rating}
                img={recipe.img}
                duration={recipe.duration}
                categories={recipe.categories || []}
              />
            ))
          ) : showAllRecipes ? (
            recipes.map(recipe => (
              <RecipeReviewCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                rating={recipe.rating}
                img={recipe.img}
                duration={recipe.duration}
                categories={recipe.categories || []}
              />
            ))
          ) : (
            <>
              {recommendedRecipes.map(recommendedRecipe => (
                <RecipeReviewCard
                  key={recommendedRecipe.id}
                  id={recommendedRecipe.id}
                  title={recommendedRecipe.title}
                  rating={recommendedRecipe.rating}
                  img={recommendedRecipe.img}
                  duration={recommendedRecipe.duration}
                  categories={recommendedRecipe.categories || []}
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
