export interface User extends UserIdentity {
  firstName: string;
  lastName: string;
  about: string;
  image: string;
}

export interface UserIdentity {
  userId: number;
  email: string;
}
