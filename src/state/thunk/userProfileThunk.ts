import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeCard } from '../model/recipeCardModel';
import { BASE_URL, PATHS } from '../../api/paths';
import api from '../../api/api';
import { fetchImageUrl } from '../../utils/imageUtils';

export const fetchPostedRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchPostedRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}${PATHS.USER_RECIPES_PATH}`);
      const recipes: RecipeCard[] = response.data;

      return await Promise.all(
        recipes.map(async recipe => {
          if (recipe.img) {
            const imageUrl = await fetchImageUrl(recipe.img);
            return { ...recipe, img: imageUrl };
          }
          return recipe;
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue('Failed to fetch posted recipes');
      }
      throw error;
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk<RecipeCard[]>(
  'profile/fetchFavoriteRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}${PATHS.USER_FAVORITES_PATH}`);
      const recipes: RecipeCard[] = response.data;

      return await Promise.all(
        recipes.map(async recipe => {
          if (recipe.img) {
            const imageUrl = await fetchImageUrl(recipe.img);
            return { ...recipe, img: imageUrl };
          }
          return recipe;
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue('Failed to fetch favorite recipes');
      }
      throw error;
    }
  }
);
