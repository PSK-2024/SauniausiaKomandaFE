import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeCard } from '../model/recipeCardModel';
import { UserProfile } from '../model/userProfileModel';

export const fetchProfile = createAsyncThunk<UserProfile>(
  'profile/fetchProfile',
  async () => {
    const response = await axios.get('/user/profile');
    return response.data;
  }
);

export const fetchPostedRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchPostedRecipes',
  async () => {
    const response = await axios.get('/user/recipes');
    return response.data;
  }
);

export const fetchFavoriteRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchFavoriteRecipes',
  async () => {
    const response = await axios.get('/user/favorites');
    return response.data;
  }
);
