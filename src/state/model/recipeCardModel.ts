export interface RecipeCard {
  id: number;
  title: string;
  rating: number;
  img: string;
  favorite: boolean;
  duration: number;
  categories: string[];
}
