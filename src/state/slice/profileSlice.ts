import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchProfile,
  fetchPostedRecipes,
  fetchFavoriteRecipes,
  updateProfile,
} from '../thunk/userProfileThunk';
import { UserProfile } from '../model/userProfileModel';
import { RecipeCard } from '../model/recipeCardModel';

interface ProfileState {
  profile: UserProfile | null;
  postedRecipes: RecipeCard[];
  favoriteRecipes: RecipeCard[];
  profileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  postedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  favoriteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  postedRecipes: [],
  favoriteRecipes: [],
  profileStatus: 'idle',
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
      .addCase(fetchProfile.pending, state => {
        state.profileStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch profile';
      })
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
      .addCase(updateProfile.pending, state => {
        state.profileStatus = 'loading';
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.profileStatus = 'succeeded';
          state.profile = action.payload;
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export default profileReducer.reducer;
