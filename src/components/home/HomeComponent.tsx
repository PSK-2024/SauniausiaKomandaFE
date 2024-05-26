import React, { useState, useEffect } from 'react';
import RecipeReviewCard from '../recipeCard/RecipeReviewCard';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SidebarComponent from '../navBar/SidebarComponent';

import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRecipes,
  fetchRecommendedRecipes,
} from '../../state/thunk/recipeThunk';

import './homeComponent.css';
import { RecipeCard } from '../../state/model/recipeCardModel';
import { unwrapResult } from '@reduxjs/toolkit';

function HomeComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const recommendedRecipes = useSelector(
    (state: RootState) => state.recipes.recommendedRecipes
  );
  const statusAll = useSelector((state: RootState) => state.recipes.statusAll);
  const statusRecommended = useSelector(
    (state: RootState) => state.recipes.statusRecommended
  );
  const error = useSelector((state: RootState) => state.recipes.error);

  const [redirectToUploadRecipePage, setRedirectToUploadRecipePage] =
    useState(false);
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);

  const handleClickShareRecipe = () => {
    setRedirectToUploadRecipePage(true);
  };

  const toggleRecipesDisplay = () => {
    setShowAllRecipes(!showAllRecipes);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    dispatch(fetchAllRecipes(categories.join(',')))
      .then(unwrapResult)
      .then((recipes: RecipeCard[]) => {
        if (recipes.length === 0) {
          setIsCategoryEmpty(true);
        } else {
          setIsCategoryEmpty(false);
        }
      })
      .catch(error => {
        console.error('Failed to fetch recipes:', error);
        setIsCategoryEmpty(false);
      });
  };

  useEffect(() => {
    if (redirectToUploadRecipePage) {
      window.location.href = '/uploadRecipe';
    }
  }, [redirectToUploadRecipePage]);

  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchRecommendedRecipes(5));
  }, [dispatch]);

  if (
    ((statusAll === 'idle' || statusAll === 'loading') && showAllRecipes) ||
    ((statusRecommended === 'idle' || statusRecommended === 'loading') &&
      !showAllRecipes)
  ) {
    return <CircularProgress />;
  }

  if (error) return <Typography>Error occurred. Try again!</Typography>;

  return (
    <>
      {recommendedRecipes.length > 0 && (
        <Link
          to={`/recipes/${recommendedRecipes[0].id}`}
          style={{ textDecoration: 'none' }}
        >
          <Box className='hero-image'>
            <img src={recommendedRecipes[0].img} alt='Hero' />
            <Box className='hero-image-text'>
              <Typography
                sx={{ color: '#DC582A', fontWeight: '400', fontSize: '30px' }}
              >
                Trending now
              </Typography>
              <Typography
                sx={{ color: '#ffffff', fontWeight: '600', fontSize: '50px' }}
              >
                {recommendedRecipes[0].title}
              </Typography>
            </Box>
          </Box>
        </Link>
      )}

      <Box className='button-container'>
        <Button variant='text' onClick={toggleRecipesDisplay}>
          {showAllRecipes ? 'Show Recommended Recipes' : 'Show All Recipes'}
        </Button>
        <Button onClick={handleClickShareRecipe}>Share your recipe</Button>
      </Box>

      <Box className='home-container-content'>
        <SidebarComponent
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <Box className='recipes-container'>
          {showAllRecipes ? (
            recipes.length > 0 ? (
              recipes.map(recipe => (
                <RecipeReviewCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  rating={recipe.rating}
                  img={recipe.img}
                  favorite={recipe.favorite}
                  duration={recipe.duration}
                  categories={recipe.categories || []}
                />
              ))
            ) : isCategoryEmpty ? (
              <Typography>
                No recipes available for the selected category. Please try
                another category!
              </Typography>
            ) : (
              <Typography>
                No recipes available. Please add some recipes!
              </Typography>
            )
          ) : recommendedRecipes.length > 0 ? (
            recommendedRecipes.map(recommendedRecipe => (
              <RecipeReviewCard
                key={recommendedRecipe.id}
                id={recommendedRecipe.id}
                title={recommendedRecipe.title}
                rating={recommendedRecipe.rating}
                img={recommendedRecipe.img}
                duration={recommendedRecipe.duration}
                favorite={recommendedRecipe.favorite}
                categories={recommendedRecipe.categories || []}
              />
            ))
          ) : (
            <Typography>No recommended recipes available.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default HomeComponent;
