import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe, RecipeState } from '../model/recipeModel';
import { fetchAllRecipes } from '../thunk/recipeThunk';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipes: [],
    loading: 'idle',
    error: '',
  } as RecipeState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllRecipes.pending, state => {
        state.loading = 'pending';
      })
      .addCase(
        fetchAllRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = 'succeeded';
          state.recipes = action.payload;
        }
      )
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default recipeSlice.reducer;
