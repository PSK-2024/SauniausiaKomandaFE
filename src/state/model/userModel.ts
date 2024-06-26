export interface User extends UserIdentity {
  firstName: string;
  lastName: string;
  about: string;
  image: string;
}

export interface UserIdentity {
  id: number;
  email: string;
}

export interface UserUpdateRequest {
  firstName: string;
  lastName: string;
  about: string;
  image: string;
}
