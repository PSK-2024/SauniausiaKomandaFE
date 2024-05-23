import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  name: string;
}

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Category[]>(
      'https://pskbackendapi.azurewebsites.net/api/Category/all'
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch categories');
    }
    throw error;
  }
});
