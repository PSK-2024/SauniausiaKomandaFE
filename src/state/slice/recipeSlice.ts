import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeData, RecipeState } from '../model/recipeModel';
import { fetchRecipe } from '../thunk/recipeThunk';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipe: null,
    status: 'idle',
    error: null,
  } as RecipeState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipe.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchRecipe.fulfilled,
        (state, action: PayloadAction<RecipeData>) => {
          state.status = 'succeeded';
          state.recipe = action.payload;
        }
      )
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default recipeSlice.reducer;
