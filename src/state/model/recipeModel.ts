// example models, might change later
export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

export interface RecipeState {
  recipes: Recipe[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | undefined;
}
