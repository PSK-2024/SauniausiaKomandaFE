import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PATHS } from '../../api/paths';
import api from '../../api/api';

interface Category {
  name: string;
}

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Category[]>(
      `${BASE_URL}${PATHS.CATEGORIES_PATH}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch categories');
    }
    throw error;
  }
});
