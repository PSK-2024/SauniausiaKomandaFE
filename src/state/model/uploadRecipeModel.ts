export interface Ingredient {
  header: string;
  steps: string[];
}

export interface RecipeUploadData {
  categories: string[];
  recipeName: string;
  instructions: string[];
  time: number;
  calories: number;
  ingredients: Ingredient[];
  imageBase64: string;
}
