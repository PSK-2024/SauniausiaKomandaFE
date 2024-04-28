import { createAsyncThunk } from '@reduxjs/toolkit';
import { Recipe } from '../model/recipeModel';
import axios from 'axios';

const RECIPE_BASE_URL = 'https://api.yourdomain.com/recipes';

export const fetchRecipeById = createAsyncThunk<
  Recipe,
  string,
  { rejectValue: string }
>('recipes/fetchRecipeById', async (recipeId, { rejectWithValue }) => {
  try {
    const response = await axios.get<Recipe>(`${RECIPE_BASE_URL}/${recipeId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch recipe');
    }
    throw error;
  }
});

export const fetchAllRecipes = createAsyncThunk<
  Recipe[],
  void,
  { rejectValue: string }
>('recipes/fetchAllRecipes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Recipe[]>(`${RECIPE_BASE_URL}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch recipes');
    }
    throw error;
  }
});
