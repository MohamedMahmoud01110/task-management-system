export type UserRole = 'admin' | 'member';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}