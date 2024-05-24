import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserIdentity } from '../model/userModel';
import { fetchUserData, updateUserData } from '../thunk/userThunk';
import { RootState } from '../../app/store';

const initialUser: User = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  about: '',
  image: '',
};

export interface UserState {
  user: User;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: initialUser,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = initialUser;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'succeeded';
          state.user = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user data';
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update profile';
      })
      .addCase(updateUserData.pending, state => {
        state.error = null;
      });
  },
});

const selectUser = (state: RootState) => state.user.user;

export const selectUserIdentity = createSelector(
  [selectUser],
  (user): UserIdentity => ({
    id: user.id,
    email: user.email,
  })
);

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
