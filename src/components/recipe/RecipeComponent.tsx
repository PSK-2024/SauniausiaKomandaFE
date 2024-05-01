import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  CardMedia,
  Card,
} from '@mui/material';
import Header from './Header';
import Rating from './Rating';
import NutritionalInfo from './NutritionalInfo';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';
import CommentsSection from './CommentsSection';
import { RootState } from '../../app/store';
import { fetchRecipe } from '../../state/thunk/recipeThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const RecipeComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const recipe = useAppSelector((state: RootState) => state.recipe.recipe);
  const status = useAppSelector((state: RootState) => state.recipe.status);

  useEffect(() => {
    if (!recipe && id) {
      dispatch(fetchRecipe(id));
    }
  }, [dispatch, id, recipe]);

  if (status === 'loading') return <CircularProgress />;
  if (!recipe) return <div>No recipe found or error loading.</div>;

  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Card>
          <CardMedia
            component='img'
            height='140'
            image={recipe.image}
            alt={`Image of ${recipe.title}`}
          />
        </Card>
        <Header title={recipe.title} />
        <Rating value={recipe.rating} />
        <NutritionalInfo
          ingredientCount={recipe.ingredients.length}
          duration={recipe.duration}
          calories={recipe.calories}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <IngredientsList ingredients={recipe.ingredients} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Instructions steps={recipe.instructions} />
          </Grid>
        </Grid>
        <CommentsSection comments={recipe.comments} />
      </Box>
    </Container>
  );
};

export default RecipeComponent;
