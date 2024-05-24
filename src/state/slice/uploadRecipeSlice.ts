import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeUploadData } from '../model/uploadRecipeModel';
import { uploadRecipe } from '../thunk/uploadRecipeThunk';

export interface UploadRecipeState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  recipeData: RecipeUploadData | null;
}

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
        state.error = action.error.message || 'Failed to upload recipe';
      });
  },
});

export default uploadRecipeSlice.reducer;
