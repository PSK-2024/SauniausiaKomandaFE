import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipeCard } from '../model/recipeCardModel';
import { RecipeData, ReviewPost } from '../model/recipeModel';
import axios from 'axios';

const RECIPE_BASE_URL = 'https://pskbackendapi.azurewebsites.net/api/Recipe';
const IMAGE_BASE_URL = 'https://pskbackendapi.azurewebsites.net/images';

const fetchImageUrl = async (imageName: string): Promise<string> => {
  const response = await axios.get(`${IMAGE_BASE_URL}/${imageName}`, {
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
};

export const fetchRecipe = createAsyncThunk<
  RecipeData,
  string,
  { rejectValue: string }
>('recipe/fetchRecipe', async (recipeId, { rejectWithValue }) => {
  try {
    const response = await axios.get<RecipeData>(
      `${RECIPE_BASE_URL}/${recipeId}`
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

export const fetchAllRecipes = createAsyncThunk<
  RecipeCard[],
  void,
  { rejectValue: string }
>('recipe/fetchAllRecipes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<RecipeCard[]>(
      `${RECIPE_BASE_URL}/preview`
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
    const response = await axios.get<RecipeCard[]>(
      `${RECIPE_BASE_URL}/recommended?top=5`
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
