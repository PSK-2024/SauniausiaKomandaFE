import { Review } from './reviewModel';
import { Category } from '../slice/categoriesSlice';

export interface Ingredient {
  name: string;
}

export interface IngredientGroup {
  groupName: string;
  items: Ingredient[];
}

interface Instruction {
  step: string;
}

export interface RecipeData {
  title: string;
  rating: number;
  category: string;
  duration: number;
  calories: number;
  image: string;
  ingredients: Ingredient[] | IngredientGroup[];
  instructions: Instruction[];
  reviews: Review[];
  categories: Category[];
}
