// example models, might change later
import { Comment } from './commentsModel';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  comments: Comment[];
}

export interface RecipeState {
  recipe: Recipe | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | undefined;
}
