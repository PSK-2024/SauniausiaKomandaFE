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
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  postedRecipes: [],
  favoriteRecipes: [],
  loading: false,
  error: null,
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(fetchPostedRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostedRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.postedRecipes = action.payload;
      })
      .addCase(fetchPostedRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posted recipes';
      })
      .addCase(fetchFavoriteRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteRecipes = action.payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch favorite recipes';
      })
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileReducer.reducer;
