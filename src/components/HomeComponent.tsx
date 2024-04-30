import React, { useState, useEffect } from 'react';
import RecipeReviewCard from './RecipeReviewCard';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const cardsData = [
  {
    id: 1,
    title: 'Russian Salad',
    rating: 4.5,
    img: 'https://placehold.co/300x200',
    duration: 40,
  },
  {
    id: 2,
    title: 'Caesar Salad',
    rating: 4.0,
    img: 'https://placehold.co/300x200',
    duration: 30,
  },
  {
    id: 3,
    title: 'Greek Salad',
    rating: 4.2,
    img: 'https://placehold.co/300x200',
    duration: 20,
  },
  {
    id: 4,
    title: 'Pasta Salad',
    rating: 4.8,
    img: 'https://placehold.co/300x200',
    duration: 60,
  },
  {
    id: 5,
    title: 'Ramen',
    rating: 5,
    img: 'https://placehold.co/300x200',
    duration: 30,
  },
  {
    id: 6,
    title: 'Russian Salad',
    rating: 4.5,
    img: 'https://placehold.co/300x200',
    duration: 40,
  },
  {
    id: 7,
    title: 'Caesar Salad',
    rating: 4.0,
    img: 'https://placehold.co/300x200',
    duration: 30,
  },
  {
    id: 8,
    title: 'Greek Salad',
    rating: 4.2,
    img: 'https://placehold.co/300x200',
    duration: 20,
  },
  {
    id: 9,
    title: 'Pasta Salad',
    rating: 4.8,
    img: 'https://placehold.co/300x200',
    duration: 60,
  },
  {
    id: 10,
    title: 'Ramen',
    rating: 5,
    img: 'https://placehold.co/300x200',
    duration: 30,
  },
];

function HomeComponent() {
  const [redirectToUploadRecipePage, setRedirectToUploadRecipePage] =
    useState(false);

  useEffect(() => {
    if (redirectToUploadRecipePage) {
      window.location.href = '/uploadRecipe';
    }
  }, [redirectToUploadRecipePage]);

  const handleClickShareRecipe = () => {
    setRedirectToUploadRecipePage(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'auto' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 12,
            width: '100%',
          }}
        >
          <Button
            variant='contained'
            sx={{ padding: 2, bgcolor: '#509E2F' }}
            onClick={handleClickShareRecipe}
          >
            Share your recipe
          </Button>
        </Box>
        {cardsData.map(card => (
          <Link
            key={card.id}
            to={`/recipes/${card.id}`}
            style={{ textDecoration: 'none', flex: '1 0 300px' }}
          >
            <RecipeReviewCard
              key={card.id}
              title={card.title}
              rating={card.rating}
              img={card.img}
              duration={card.duration}
            />
          </Link>
        ))}
      </Box>
    </>
  );
}

export default HomeComponent;
