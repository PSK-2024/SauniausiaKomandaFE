import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserProfile } from '../model/userProfileModel';
import { RecipeCard } from '../model/recipeCardModel';
import { BASE_URL, PATHS } from '../../api/paths';
import api from '../../api/api';

// Fetch user profile
export const fetchProfile = createAsyncThunk<UserProfile>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}${PATHS.USER_PROFILE_PATH}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue('Failed to fetch profile');
      }
      throw error;
    }
  }
);

// Fetch posted recipes
export const fetchPostedRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchPostedRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}${PATHS.USER_RECIPES_PATH}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue('Failed to fetch posted recipes');
      }
      throw error;
    }
  }
);

// Fetch favorite recipes
export const fetchFavoriteRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchFavoriteRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}${PATHS.USER_FAVORITES_PATH}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue('Failed to fetch favorite recipes');
      }
      throw error;
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk<UserProfile, FormData>(
  'profile/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}${PATHS.USER_PROFILE_UPDATE_PATH}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue('Failed to update profile');
      }
      throw error;
    }
  }
);
