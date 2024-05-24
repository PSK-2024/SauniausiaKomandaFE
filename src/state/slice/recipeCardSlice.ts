import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeCard } from '../model/recipeCardModel';
import { fetchAllRecipes, fetchRecommendedRecipes } from '../thunk/recipeThunk';

export interface RecipeCardState {
  recipes: RecipeCard[];
  recommendedRecipes: RecipeCard[];
  statusRecommended: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusAll: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: RecipeCardState = {
  recipes: [],
  recommendedRecipes: [],
  statusRecommended: 'idle',
  statusAll: 'idle',
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
      });
  },
});

export default recipeCardSlice.reducer;
