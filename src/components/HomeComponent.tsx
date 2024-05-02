import React, { useState, useEffect } from 'react';
import RecipeReviewCard from './RecipeReviewCard';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SidebarComponent from './SidebarComponent';

import '../styles/homeComponent.css';

const cardsData = [
  {
    id: 1,
    title: 'Russian Salad',
    rating: 4.5,
    img: '/hero.png',
    duration: 40,
  },
  {
    id: 2,
    title: 'Caesar Salad',
    rating: 4.0,
    img: '/food.png',
    duration: 30,
  },
  {
    id: 3,
    title: 'Greek Salad',
    rating: 4.2,
    img: '/food.png',
    duration: 20,
  },
  {
    id: 4,
    title: 'Pasta Salad',
    rating: 4.8,
    img: '/food.png',
    duration: 60,
  },
  {
    id: 5,
    title: 'Ramen',
    rating: 5,
    img: '/food.png',
    duration: 30,
  },
  {
    id: 6,
    title: 'Russian Salad',
    rating: 4.5,
    img: '/food.png',
    duration: 40,
  },
  {
    id: 7,
    title: 'Caesar Salad',
    rating: 4.0,
    img: '/food.png',
    duration: 30,
  },
  {
    id: 8,
    title: 'Greek Salad',
    rating: 4.2,
    img: '/food.png',
    duration: 20,
  },
  {
    id: 9,
    title: 'Caesar Salad',
    rating: 4.0,
    img: '/food.png',
    duration: 30,
  },
  {
    id: 10,
    title: 'Greek Salad',
    rating: 4.2,
    img: '/food.png',
    duration: 20,
  },
];

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
        to={`/recipes/${cardsData[0].id}`}
        style={{ textDecoration: 'none' }}
      >
        <Box className='hero-image'>
          <img src={cardsData[0].img} alt='Hero' />
          <Box className='hero-image-text'>
            <Typography
              sx={{ color: '#DC582A', fontWeight: '400', fontSize: '30px' }}
            >
              Trending now
            </Typography>
            <Typography
              sx={{ color: '#ffffff', fontWeight: '600', fontSize: '50px' }}
            >
              {cardsData[0].title}
            </Typography>
          </Box>
        </Box>
      </Link>

      <Box className='button-container'>
        <Button onClick={handleClickShareRecipe}>Share your recipe</Button>
        <Button variant='text' onClick={toggleRecipesDisplay}>
          {showAllRecipes ? 'Show Recommended' : 'Show All Recipes'}
        </Button>
      </Box>

      <Box className='home-container-content'>
        <SidebarComponent />
        <Box className='recipes-container'>
          {showAllRecipes ? (
            // Show all recipes if showAllRecipes is true
            cardsData.map(card => (
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
            // Otherwise, show this as the "Recommended Recipes" section
            <>
              {/* <Box className='recommended-recipes-container'>
                <Typography
                  sx={{
                    padding: 2,
                    color: '#000000',
                    fontSize: '30px',
                    fontWeight: 'bold',
                  }}
                >
                  Recommended Recipes
                </Typography>
              </Box> */}
              {cardsData.slice(0, 5).map(
                (
                  card // Assuming first 5 are recommended
                ) => (
                  <RecipeReviewCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    rating={card.rating}
                    img={card.img}
                    duration={card.duration}
                  />
                )
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default HomeComponent;
