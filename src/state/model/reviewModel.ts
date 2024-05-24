import { UserIdentity } from './userModel';

export interface Review {
  id: number;
  text: string;
  author: ReviewAuthor;
  rating: number;
}

export interface ReviewAuthor extends UserIdentity {
  firstName: string;
  lastName: string;
}

export interface ReviewRequest {
  text: string;
  rating: number;
}
