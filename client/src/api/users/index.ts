import { instance } from '../client';
import { IUser, IUserReq } from '../../types/user';

export const getUsers = () => instance.get('users');

export const getUser = (id: string) => instance.get(`users/${id}`);

export const createUser = (user: IUser) => instance.post<IUserReq>('users', user);

export const updateUser = (id: string, user: IUser) => instance.put<IUserReq>(`users/${id}`, user);

export const deleteUser = (id: string) => instance.delete(`users/${id}`);
