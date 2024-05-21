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

export interface Review {
  id: number;
  text: string;
  author: string;
  rating: number;
}

export interface ReviewPost {
  text: string;
  rating: number;
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
  ingredients: Ingredient[] | IngredientGroup[];
  instructions: Instruction[];
  reviews: Review[];
}
