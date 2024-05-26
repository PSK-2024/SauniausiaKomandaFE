export interface Review {
  id: number;
  text: string;
  author: ReviewAuthor;
  rating: number;
}

export interface ReviewAuthor {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ReviewRequest {
  recipeId: number;
  text: string;
  rating: number;
}
