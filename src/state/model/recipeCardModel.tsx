export interface RecipeCard {
  id: number;
  title: string;
  rating: number;
  img: string;
  duration: number;
}

export interface RecipeCardState {
  recipes: RecipeCard[];
  recommendedRecipes: RecipeCard[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | undefined;
}
