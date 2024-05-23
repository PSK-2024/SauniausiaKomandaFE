import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeUploadData } from '../model/uploadRecipeModel';
import { BASE_URL, PATHS } from '../../api/paths';

export const uploadRecipe = createAsyncThunk<
  RecipeUploadData,
  RecipeUploadData,
  { rejectValue: string }
>('uploadRecipe/uploadRecipe', async (recipeData, { rejectWithValue }) => {
  try {
    const response = await axios.post<RecipeUploadData>(
      `${BASE_URL}${PATHS.UPLOAD_RECIPE_PATH}`,
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
