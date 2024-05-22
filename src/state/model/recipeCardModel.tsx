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
  statusRecommended: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusAll: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}
