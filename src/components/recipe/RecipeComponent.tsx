import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, CardMedia, Card } from '@mui/material';
import Header from './header/Header';
import Rating from './rating/Rating';
import NutritionalInfo from './nutrition/NutritionalInfo';
import Ingredients from './ingredients/Ingredients';
import Instructions from './instructions/Instructions';
import ReviewSection from './review/ReviewSection';
import { RootState } from '../../app/store';
import { fetchRecipe } from '../../state/thunk/recipeThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './RecipeComponent.css';
import SectionName from './section/SectionName';

const RecipeComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const recipe = useAppSelector((state: RootState) => state.recipe.recipe);
  const status = useAppSelector((state: RootState) => state.recipe.status);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipe(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <CircularProgress />;
  if (!recipe) return <div>No recipe found or error loading.</div>;

  return (
    <div className='recipe-container'>
      <div className='header-container'>
        <div className='info-container'>
          <Header title={recipe.title} />
          <Rating value={recipe.rating} />
          <NutritionalInfo
            ingredientCount={recipe.ingredients.length}
            duration={recipe.duration}
            calories={recipe.calories}
          />
        </div>
        <Card>
          <CardMedia
            component='img'
            height='270'
            image={recipe.image}
            alt={`Image of ${recipe.title}`}
          />
        </Card>
      </div>
      <div className='flex-container'>
        <div className='flex-item'>
          <SectionName name={'Ingredients'} />
          <Ingredients ingredients={recipe.ingredients} />
        </div>
        <div className='flex-item'>
          <SectionName name={'Instructions'} />
          <Instructions steps={recipe.instructions} />
        </div>
      </div>
      <div className='reviews-container'>
        <SectionName name={'Reviews'} />
        <ReviewSection recipeId={id as string} reviews={recipe.reviews} />
      </div>
    </div>
  );
};

export default RecipeComponent;
