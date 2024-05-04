// example models, might change later
import { Comment } from './commentsModel';

interface Ingredient {
  name: string;
  amount: string;
}

interface Instruction {
  step: string;
}

export interface RecipeState {
  recipe: RecipeData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface RecipeData {
  title: string;
  rating: number;
  duration: number;
  calories: number;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  comments: Comment[];
}
