import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipeCard } from '../model/recipeCardModel';
import { RecipeData } from '../model/recipeModel';
import axios from 'axios';
import { BASE_URL, PATHS } from '../../api/paths';
import api from '../../api/api';
import { fetchImageUrl } from '../../utils/imageUtils';
import { ReviewRequest } from '../model/reviewModel';

export const fetchRecipe = createAsyncThunk<
  RecipeData,
  string,
  { rejectValue: string }
>('recipe/fetchRecipe', async (recipeId, { rejectWithValue }) => {
  try {
    const response = await api.get<RecipeData>(
      `${BASE_URL}${PATHS.RECIPE_PATH}/${recipeId}`
    );
    const recipe: RecipeData = response.data;
    const [imageUrl] = await Promise.all([fetchImageUrl(recipe.image)]);
    recipe.image = imageUrl;
    return recipe;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch recipe');
    }
    throw error;
  }
});

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const fetchAllRecipes = createAsyncThunk<
  RecipeCard[],
  string | void,
  { rejectValue: string }
>('recipe/fetchAllRecipes', async (categories, { rejectWithValue }) => {
  try {
    let capitalizedCategories = '';

    if (categories) {
      capitalizedCategories = categories
        .split(',')
        .map(category => capitalizeFirstLetter(category.trim()))
        .join(',');
    }

    const response = await api.get<RecipeCard[]>(
      `${BASE_URL}${PATHS.PREVIEW_RECIPE_PATH}${capitalizedCategories ? `?categoryFilter=${capitalizedCategories}` : ''}`
    );
    const recipes = response.data;

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
    // TODO: specify from somewhere in UI recommended recipe count
    const response = await api.get<RecipeCard[]>(
      `${BASE_URL}${PATHS.PREVIEW_RECIPE_PATH}?top=5`
    );
    const recipes = response.data;

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
      return rejectWithValue('Failed to fetch recipes');
    }
    throw error;
  }
});

export const addReview = createAsyncThunk<
  RecipeData,
  { recipeId: string; review: ReviewRequest },
  { rejectValue: string }
>('recipe/addReview', async ({ recipeId, review }, { rejectWithValue }) => {
  try {
    const response = await api.post<RecipeData>(
      `${BASE_URL}${PATHS.RECIPE_PATH}/${recipeId}/reviews`,
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

export const addToFavorite = createAsyncThunk<
  number,
  { recipeId: number },
  { rejectValue: string }
>('recipe/addToFavorite', async ({ recipeId }, { rejectWithValue }) => {
  try {
    await api.post(`${BASE_URL}${PATHS.FAVORITE_RECIPE_PATH}`, {
      recipeId,
    });
    return recipeId;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to add to favorites');
    }
    throw error;
  }
});
