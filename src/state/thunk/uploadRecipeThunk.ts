import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeUploadData } from '../model/uploadRecipeModel';

const UPLOAD_RECIPE_URL = 'https://pskbackendapi.azurewebsites.net/api/Recipe';

export const uploadRecipe = createAsyncThunk<
  RecipeUploadData,
  RecipeUploadData,
  { rejectValue: string }
>('uploadRecipe/uploadRecipe', async (recipeData, { rejectWithValue }) => {
  try {
    const response = await axios.post<RecipeUploadData>(
      UPLOAD_RECIPE_URL,
      recipeData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to upload recipe');
    }
    throw error;
  }
});
