import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../state/slice/recipeSlice';
import recipeCardReducer from '../state/slice/recipeCardSlice';
import profileReducer from '../state/slice/profileSlice';

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipes: recipeCardReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
