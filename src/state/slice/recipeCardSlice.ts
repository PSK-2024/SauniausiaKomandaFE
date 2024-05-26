import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeCard } from '../model/recipeCardModel';
import {
  addToFavorite,
  fetchAllRecipes,
  fetchRecommendedRecipes,
  removeFromFavorite,
} from '../thunk/recipeThunk';

export interface RecipeCardState {
  recipes: RecipeCard[];
  recommendedRecipes: RecipeCard[];
  statusRecommended: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusAll: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusAddToFavorite: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusRemoveFromFavorite: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: RecipeCardState = {
  recipes: [],
  recommendedRecipes: [],
  statusRecommended: 'idle',
  statusAll: 'idle',
  statusAddToFavorite: 'idle',
  statusRemoveFromFavorite: 'idle',
  error: '',
};

const recipeCardSlice = createSlice({
  name: 'recipeCard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllRecipes.pending, state => {
        state.statusAll = 'loading';
      })
      .addCase(
        fetchAllRecipes.fulfilled,
        (state, action: PayloadAction<RecipeCard[]>) => {
          state.statusAll = 'succeeded';
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecommendedRecipes.pending, state => {
        state.statusRecommended = 'loading';
      })
      .addCase(
        fetchRecommendedRecipes.fulfilled,
        (state, action: PayloadAction<RecipeCard[]>) => {
          state.statusRecommended = 'succeeded';
          state.recommendedRecipes = action.payload;
        }
      )
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.statusAll = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(fetchRecommendedRecipes.rejected, (state, action) => {
        state.statusRecommended = 'failed';
        state.error =
          action.error.message || 'Failed to fetch recommended recipes';
      })
      .addCase(addToFavorite.pending, state => {
        state.statusAddToFavorite = 'loading';
      })
      .addCase(
        addToFavorite.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.statusAddToFavorite = 'succeeded';
          const recipeId = action.payload;
          const recipe = state.recipes.find(r => r.id === recipeId);
          if (recipe) {
            recipe.favorite = true;
          }
          const recommendedRecipe = state.recommendedRecipes.find(
            r => r.id === recipeId
          );
          if (recommendedRecipe) {
            recommendedRecipe.favorite = true;
          }
        }
      )
      .addCase(addToFavorite.rejected, (state, action) => {
        state.statusAddToFavorite = 'failed';
        state.error = action.payload;
      })
      .addCase(removeFromFavorite.pending, state => {
        state.statusRemoveFromFavorite = 'loading';
      })
      .addCase(
        removeFromFavorite.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.statusRemoveFromFavorite = 'succeeded';
          const recipeId = action.payload;
          const recipe = state.recipes.find(r => r.id === recipeId);
          if (recipe) {
            recipe.favorite = false;
          }
          const recommendedRecipe = state.recommendedRecipes.find(
            r => r.id === recipeId
          );
          if (recommendedRecipe) {
            recommendedRecipe.favorite = false;
          }
        }
      )
      .addCase(removeFromFavorite.rejected, (state, action) => {
        state.statusRemoveFromFavorite = 'failed';
        state.error = action.payload;
      });
  },
});

export default recipeCardSlice.reducer;
