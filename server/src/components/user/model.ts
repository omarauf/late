import { model, Schema } from 'mongoose';

import { IUser, IUserDoc, IUserModel } from './interface';

const UserSchema = new Schema<IUser, IUserModel>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		company: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
		tokenVersion: { type: Number, default: 0 }
	},
	{
		toJSON: {
			transform(doc, ret: IUserDoc) {
				return {
					id: ret._id,
					firstName: ret.firstName,
					lastName: ret.lastName,
					company: ret.company,
					phone: ret.phone,
					email: ret.email,
					isAdmin: ret.isAdmin
				};
			}
		}
	}
);

export const User = model<IUser, IUserModel>('User', UserSchema);
