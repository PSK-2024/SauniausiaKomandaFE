import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../api/authService';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    return await authService.getUserData();
    //return response.data;
  }
);
