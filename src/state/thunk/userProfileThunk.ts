import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserProfile } from '../model/userProfileModel';
import { RecipeCard } from '../model/recipeCardModel';

export const fetchProfile = createAsyncThunk<UserProfile>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch profile');
    }
  }
);

export const fetchPostedRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchPostedRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/recipes');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch posted recipes');
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchFavoriteRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/favorites');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch favorite recipes');
    }
  }
);

export const updateProfile = createAsyncThunk<UserProfile, FormData>(
  'profile/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  }
);
