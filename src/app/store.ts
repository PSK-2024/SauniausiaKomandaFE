import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../state/slice/recipeSlice';
import recipeCardReducer from '../state/slice/recipeCardSlice';
import uploadRecipeReducer from '../state/slice/uploadRecipeSlice';
import categoriesReducer from '../state/slice/categoriesSlice';
import profileReducer from '../state/slice/profileSlice';
import userReducer from '../state/slice/userSlice';

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipes: recipeCardReducer,
    uploadRecipe: uploadRecipeReducer,
    categories: categoriesReducer,
    profile: profileReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
