import { IUserReq } from '../../types/user';
import { instance } from '../client';

export const signIn = (body: { email: string; password: string }) =>
  instance.post<{ accessToken: string; user: IUserReq }>(`auth/signin`, body);

export const signOut = () => instance.get<{ done: boolean }>(`auth/signout`);

export const register = (id: string, body: { name: string; email: string; password: string }) =>
  instance.post(`auth/register`, body);

export const refreshToken = () => instance.post(`auth/refresh_token`, {});
