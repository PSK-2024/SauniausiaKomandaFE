import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe, RecipeState } from '../model/recipeModel';
import { fetchRecipeById } from '../thunk/recipeThunk';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipe: null,
    loading: 'idle',
    error: '',
  } as RecipeState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipeById.pending, state => {
        state.loading = 'pending';
      })
      .addCase(
        fetchRecipeById.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.loading = 'succeeded';
          state.recipe = action.payload;
        }
      )
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default recipeSlice.reducer;
