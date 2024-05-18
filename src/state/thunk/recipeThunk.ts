import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipeCard } from '../model/recipeCardModel';
import { RecipeData, ReviewPost } from '../model/recipeModel';
import axios from 'axios';

const RECIPE_BASE_URL = 'https://api.yourdomain.com/recipes';

export const fetchRecipe = createAsyncThunk<
  RecipeData,
  string,
  { rejectValue: string }
>('recipe/fetchRecipe', async (recipeId, { rejectWithValue }) => {
  try {
    const response = await axios.get<RecipeData>(
      `${RECIPE_BASE_URL}/${recipeId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch recipe');
    }
    throw error;
  }
});

export const fetchAllRecipes = createAsyncThunk<
  RecipeCard[],
  void,
  { rejectValue: string }
>('recipe/fetchAllRecipes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<RecipeCard[]>(`${RECIPE_BASE_URL}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch recipes');
    }
    throw error;
  }
});

export const fetchRecommendedRecipes = createAsyncThunk<
  RecipeCard[],
  void,
  { rejectValue: string }
>('recipes/fetchRecommendedRecipes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<RecipeCard[]>(`${RECIPE_BASE_URL}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch recipes');
    }
    throw error;
  }
});

export const addReview = createAsyncThunk<
  RecipeData,
  { recipeId: string; review: ReviewPost },
  { rejectValue: string }
>('recipe/addReview', async ({ recipeId, review }, { rejectWithValue }) => {
  try {
    const response = await axios.post<RecipeData>(
      `${RECIPE_BASE_URL}/${recipeId}/reviews`,
      review
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to add review');
    }
    throw error;
  }
});
