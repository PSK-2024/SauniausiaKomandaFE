import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchPostedRecipes,
  fetchFavoriteRecipes,
} from '../thunk/userProfileThunk';
import { RecipeCard } from '../model/recipeCardModel';
import { addToFavorite, removeFromFavorite } from '../thunk/recipeThunk';

interface ProfileState {
  postedRecipes: RecipeCard[];
  favoriteRecipes: RecipeCard[];
  postedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  favoriteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  removeFromFavoriteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  addToFavoriteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  postedRecipes: [],
  favoriteRecipes: [],
  postedStatus: 'idle',
  favoriteStatus: 'idle',
  removeFromFavoriteStatus: 'idle',
  addToFavoriteStatus: 'idle',
  error: null,
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostedRecipes.pending, state => {
        state.postedStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPostedRecipes.fulfilled, (state, action) => {
        state.postedStatus = 'succeeded';
        state.postedRecipes = action.payload;
      })
      .addCase(fetchPostedRecipes.rejected, (state, action) => {
        state.postedStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch posted recipes';
      })
      .addCase(fetchFavoriteRecipes.pending, state => {
        state.favoriteStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.favoriteStatus = 'succeeded';
        state.favoriteRecipes = action.payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.favoriteStatus = 'failed';
        state.error =
          action.error.message || 'Failed to fetch favorite recipes';
      })
      .addCase(removeFromFavorite.pending, state => {
        state.removeFromFavoriteStatus = 'loading';
      })
      .addCase(
        removeFromFavorite.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.removeFromFavoriteStatus = 'succeeded';
          const recipeId = action.payload;
          state.favoriteRecipes = state.favoriteRecipes.filter(
            recipe => recipe.id !== recipeId
          );
          const postedRecipe = state.postedRecipes.find(r => r.id === recipeId);
          if (postedRecipe) {
            postedRecipe.favorite = false;
          }
        }
      )
      .addCase(removeFromFavorite.rejected, (state, action) => {
        state.removeFromFavoriteStatus = 'failed';
        state.error =
          action.error.message || 'Failed to remove recipe from favorite';
      })
      .addCase(addToFavorite.pending, state => {
        state.addToFavoriteStatus = 'loading';
      })
      .addCase(
        addToFavorite.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.addToFavoriteStatus = 'succeeded';
          const recipeId = action.payload;
          const recipe = state.postedRecipes.find(r => r.id === recipeId);
          if (recipe) {
            recipe.favorite = true;
          }
          const favoriteRecipe = state.favoriteRecipes.find(
            r => r.id === recipeId
          );
          if (!favoriteRecipe) {
            const newFavoriteRecipe = state.postedRecipes.find(
              r => r.id === recipeId
            );
            if (newFavoriteRecipe) {
              state.favoriteRecipes.push(newFavoriteRecipe);
            }
          }
        }
      )
      .addCase(addToFavorite.rejected, (state, action) => {
        state.addToFavoriteStatus = 'failed';
        state.error =
          action.error.message || 'Failed to add recipe to favorite';
      });
  },
});

export default profileReducer.reducer;
