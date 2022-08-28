import { BaseRepository } from '../helper';

import { IUser, IUserDoc, IUserModel } from './interface';
import { User } from './model';

export class UserRepository extends BaseRepository<IUser, IUserDoc, IUserModel> {
	constructor() {
		super(User, 'user');
	}

	findByEmail(email: string) {
		return this._model.findOne({ email }).exec();
	}

	// addUserRoles(userId: string, role: UserRole) {
	// 	return this._model.updateOne({ _id: userId }, { role }).exec();
	// }
}
