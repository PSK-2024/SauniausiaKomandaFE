import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../api/authService';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await authService.getUserData();
    return response.data;
  }
);
