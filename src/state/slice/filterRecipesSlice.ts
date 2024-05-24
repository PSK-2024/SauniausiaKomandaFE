import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeCard } from '../model/recipeCardModel';
import { fetchRecipesByCategory } from '../thunk/recipeThunk';

interface RecipeState {
  recipes: RecipeCard[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  status: 'idle',
  error: null,
};

const filterRecipesReducer = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipesByCategory.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchRecipesByCategory.fulfilled,
        (state, action: PayloadAction<RecipeCard[]>) => {
          state.status = 'succeeded';
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message || 'Failed to fetch recipes by category';
      });
  },
});

export default filterRecipesReducer.reducer;
