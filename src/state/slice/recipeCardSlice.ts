import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeCard } from '../model/recipeCardModel';
import {
  fetchAllRecipes,
  fetchRecommendedRecipes,
  fetchRecipesByCategory,
} from '../thunk/recipeThunk';

interface RecipeState {
  recipes: RecipeCard[];
  recommendedRecipes: RecipeCard[];
  filteredRecipes: RecipeCard[];
  statusAll: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusRecommended: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusFiltered: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  recommendedRecipes: [],
  filteredRecipes: [],
  statusAll: 'idle',
  statusRecommended: 'idle',
  statusFiltered: 'idle',
  error: null,
};

const recipeCardReducer = createSlice({
  name: 'recipes',
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
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.statusAll = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      })
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
      .addCase(fetchRecommendedRecipes.rejected, (state, action) => {
        state.statusRecommended = 'failed';
        state.error =
          action.error.message || 'Failed to fetch recommended recipes';
      })
      .addCase(fetchRecipesByCategory.pending, state => {
        state.statusFiltered = 'loading';
      })
      .addCase(
        fetchRecipesByCategory.fulfilled,
        (state, action: PayloadAction<RecipeCard[]>) => {
          state.statusFiltered = 'succeeded';
          state.filteredRecipes = action.payload;
        }
      )
      .addCase(fetchRecipesByCategory.rejected, (state, action) => {
        state.statusFiltered = 'failed';
        state.error =
          action.error.message || 'Failed to fetch filtered recipes';
      });
  },
});

export default recipeCardReducer.reducer;
