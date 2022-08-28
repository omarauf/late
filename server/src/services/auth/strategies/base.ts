import { BasicStrategy as Strategy_Basic } from 'passport-http';
import { Strategy as Strategy_Jwt } from 'passport-jwt';

// import { policy } from '../../../config/policy';

import { UserRepository } from '../../../components/user/repository';

export interface Payload {
	userId: string;
	isAdmin: boolean;
	iat: number;
	exp: number;
	aud: string;
	iss: string;
}

/**
 * Abstract BaseStrategy
 *
 * Other strategies inherits from this one
 */
export abstract class BaseStrategy {
	// protected readonly userRepo: Repository<User> = getManager().getRepository('User');
	protected readonly userRepo: UserRepository = new UserRepository();
	protected _strategy: Strategy_Jwt | Strategy_Basic;

	/**
	 * Get strategy
	 *
	 * @returns Returns Passport strategy
	 */
	public get strategy(): Strategy_Jwt | Strategy_Basic {
		return this._strategy;
	}

	/**
	 * Sets acl permission for user
	 *
	 * @param user
	 * @returns
	 */
	// protected async setPermissions(user: User): Promise<void> {
	// add role from db
	// await policy.addUserRoles(user.id, user.userRole.name);
	// userRepo.addUserRoles(user.id, user.userRole.name);
	// }
}
