import React, { useState, useEffect } from 'react';
import RecipeReviewCard from './RecipeReviewCard';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SidebarComponent from './SidebarComponent';

import { allRecipesData, recommendedRecipesData } from '../data/MockRecipes';

import '../styles/homeComponent.css';

function HomeComponent() {
  const [redirectToUploadRecipePage, setRedirectToUploadRecipePage] =
    useState(false);
  const [showAllRecipes, setShowAllRecipes] = useState(false);

  useEffect(() => {
    if (redirectToUploadRecipePage) {
      window.location.href = '/uploadRecipe';
    }
  }, [redirectToUploadRecipePage]);

  const handleClickShareRecipe = () => {
    setRedirectToUploadRecipePage(true);
  };

  const toggleRecipesDisplay = () => {
    setShowAllRecipes(!showAllRecipes);
  };

  return (
    <>
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
            allRecipesData.map(card => (
              <RecipeReviewCard
                key={card.id}
                id={card.id}
                title={card.title}
                rating={card.rating}
                img={card.img}
                duration={card.duration}
              />
            ))
          ) : (
            <>
              {recommendedRecipesData.map(card => (
                <RecipeReviewCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  rating={card.rating}
                  img={card.img}
                  duration={card.duration}
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
