export interface UserModel {
  id: number;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role?: string;
}
