import { Document, Model, Types } from 'mongoose';

export enum UserRole {
	admin = 'admin',
	user = 'user'
}

export interface IUser {
	firstName: string;
	lastName: string;
	company: string;
	phone: string;
	email: string;
	password: string;
	tokenVersion?: number;
	isAdmin?: boolean;
}

export enum UserField {
	firstName = 'firstName',
	lastName = 'lastName',
	company = 'company',
	phone = 'phone',
	email = 'email',
	password = 'password',
	isAdmin = 'isAdmin'
}

// export type UserField = keyof IUser;

export interface IUserDoc extends Document, IUser {
	_id: Types.ObjectId;
	tokenVersion: number;
	isAdmin: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserModel extends Model<IUserDoc> {}
