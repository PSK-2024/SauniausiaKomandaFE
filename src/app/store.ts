import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../state/slice/recipeSlice';
import recipeCardReducer from '../state/slice/recipeCardSlice';
import { mockRecipe } from '../data/mockRecipe';
import { recommendedRecipesData } from '../data/MockRecipes';
import { allRecipesData } from '../data/MockRecipes';
import { RecipeState } from '../state/model/recipeModel';
import { RecipeCardState } from '../state/model/recipeCardModel';

const preloadedState = {
  recipe: {
    recipe: mockRecipe,
    status: 'succeeded',
    error: null,
  } as RecipeState,
  recipes: {
    recipes: allRecipesData,
    recommendedRecipes: recommendedRecipesData,
    loading: 'idle',
    error: '',
  } as RecipeCardState,
};

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipes: recipeCardReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
