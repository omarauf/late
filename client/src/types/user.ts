export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  isAdmin: boolean;
}

export interface IUserReq extends IUser {
  id: string;
}

export enum ROLE {
  user = 'user',
  admin = 'admin',
}
