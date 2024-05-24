import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../api/authService';
import { User } from '../model/userModel';
import { fetchImageUrl } from '../../utils/imageUtils';
import axios from 'axios';
import api from '../../api/api';
import { BASE_URL, PATHS } from '../../api/paths';

export const fetchUserData = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('user/fetchUserData', async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getUserData();

    if (!response || !response.data) {
      return rejectWithValue('Invalid response from auth service');
    }

    const user: User = response.data;

    user.image = await fetchImageUrl(user.image);
    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue('Failed to fetch user data');
    }
    throw error;
  }
});

export const updateUserData = createAsyncThunk<User, FormData>(
  'user/updateUserData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}${PATHS.USER_UPDATE_PATH}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue('Failed to update user data');
      }
      throw error;
    }
  }
);
