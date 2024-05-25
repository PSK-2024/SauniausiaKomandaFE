import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@mui/material';
import RecipeReviewCard from '../recipeCard/RecipeReviewCard';
import { RecipeCard } from '../../state/model/recipeCardModel';

interface RecipesGridProps {
  recipes: RecipeCard[];
  title: string;
}

const RecipesGrid: React.FC<RecipesGridProps> = ({ recipes, title }) => {
  const slidesToShow = Math.min(recipes.length, 4);
  const slidesToScroll = slidesToShow;

  const settings = {
    dots: true,
    infinite: slidesToShow > 1,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(recipes.length, 3),
          slidesToScroll: Math.min(recipes.length, 3),
          infinite: recipes.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(recipes.length, 2),
          slidesToScroll: Math.min(recipes.length, 2),
          initialSlide: 2,
          infinite: recipes.length > 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: recipes.length > 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography
        variant='h6'
        sx={{ mb: 2, fontWeight: 'bold', fontSize: '2rem' }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          maxWidth: slidesToShow === 1 ? '500px' : '100%',
          margin: '0 auto',
        }}
      >
        <Slider {...settings}>
          {recipes.map(recipe => (
            <Box key={recipe.id} sx={{ padding: '0 5px' }}>
              <RecipeReviewCard
                id={recipe.id}
                title={recipe.title}
                rating={recipe.rating}
                img={recipe.img}
                duration={recipe.duration}
                categories={recipe.categories}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default RecipesGrid;
