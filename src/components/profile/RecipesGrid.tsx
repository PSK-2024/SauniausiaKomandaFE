import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@mui/material';
import RecipeReviewCard from '../recipeCard/RecipeReviewCard';
import { RecipeCard } from '../../state/model/recipeCardModel';
import { NextArrow, PrevArrow } from './SliderArrows';

interface RecipesGridProps {
  recipes: RecipeCard[];
  title: string;
}

const RecipesGrid: React.FC<RecipesGridProps> = ({ recipes, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
  );
};

export default RecipesGrid;
