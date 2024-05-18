import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../state/slice/recipeSlice';
import recipeCardReducer from '../state/slice/recipeCardSlice';
import { mockRecipe } from '../data/mockRecipe';
import { RecipeState } from '../state/model/recipeModel';

const preloadedState = {
  recipe: {
    recipe: mockRecipe,
    status: 'succeeded',
    error: null,
  } as RecipeState,
};

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipeCard: recipeCardReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
