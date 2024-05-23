import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RecipeUploadData,
  UploadRecipeState,
} from '../model/uploadRecipeModel';
import { uploadRecipe } from '../thunk/uploadRecipeThunk';

const initialState: UploadRecipeState = {
  status: 'idle',
  error: null,
  recipeData: null,
};

const uploadRecipeSlice = createSlice({
  name: 'uploadRecipe',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadRecipe.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        uploadRecipe.fulfilled,
        (state, action: PayloadAction<RecipeUploadData>) => {
          state.status = 'succeeded';
          state.recipeData = action.payload;
        }
      )
      .addCase(uploadRecipe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default uploadRecipeSlice.reducer;
