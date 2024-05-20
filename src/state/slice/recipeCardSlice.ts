import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeCard, RecipeCardState } from '../model/recipeCardModel';
import { fetchAllRecipes, fetchRecommendedRecipes } from '../thunk/recipeThunk';

const initialState: RecipeCardState = {
  recipes: [],
  recommendedRecipes: [],
  loading: 'idle',
  error: '',
};

const recipeCardSlice = createSlice({
  name: 'recipeCard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllRecipes.pending, state => {
        state.loading = 'pending';
      })
      .addCase(
        fetchAllRecipes.fulfilled,
        (state, action: PayloadAction<RecipeCard[]>) => {
          state.loading = 'succeeded';
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecommendedRecipes.pending, state => {
        state.loading = 'pending';
      })
      .addCase(
        fetchRecommendedRecipes.fulfilled,
        (state, action: PayloadAction<RecipeCard[]>) => {
          state.loading = 'succeeded';
          state.recommendedRecipes = action.payload;
        }
      )
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(fetchRecommendedRecipes.rejected, (state, action) => {
        state.loading = 'failed';
        state.error =
          action.error.message || 'Failed to fetch recommended recipes';
      });
  },
});

export default recipeCardSlice.reducer;
