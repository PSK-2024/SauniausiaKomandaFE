import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPostedRecipes,
  fetchFavoriteRecipes,
} from '../thunk/userProfileThunk';
import { RecipeCard } from '../model/recipeCardModel';

interface ProfileState {
  postedRecipes: RecipeCard[];
  favoriteRecipes: RecipeCard[];
  postedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  favoriteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  postedRecipes: [],
  favoriteRecipes: [],
  postedStatus: 'idle',
  favoriteStatus: 'idle',
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
      });
  },
});

export default profileReducer.reducer;
