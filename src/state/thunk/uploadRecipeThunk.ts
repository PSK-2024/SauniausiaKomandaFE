import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RecipeUploadData } from '../model/uploadRecipeModel';
import { BASE_URL, PATHS } from '../../api/paths';
import api from '../../api/api';
import { toast } from 'react-toastify';

export const uploadRecipe = createAsyncThunk<
  RecipeUploadData,
  RecipeUploadData,
  { rejectValue: string }
>('uploadRecipe/uploadRecipe', async (recipeData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<RecipeUploadData> =
      await api.post<RecipeUploadData>(
        `${BASE_URL}${PATHS.UPLOAD_RECIPE_PATH}`,
        recipeData
      );
    toast.success('Recipe was uploaded successfully!');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error('Failed to upload recipe');
      return rejectWithValue('Failed to upload recipe');
    }
    throw error;
  }
});
