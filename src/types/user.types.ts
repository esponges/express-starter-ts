export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserUpdate {
  email?: string;
  firstName?: string;
  lastName?: string;
}
