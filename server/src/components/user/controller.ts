import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found';

import { UtilityService } from '../../services/utility';

import { IUserDoc } from './interface';
import { UserRepository } from './repository';

export class UserController {
	private readonly repo: UserRepository = new UserRepository();

	/**
	 * Read users
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async readUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const users: IUserDoc[] = await this.repo.getAll(false);

			return res.json(users);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async readUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { userId } = req.params;

			const user: IUserDoc | null = await this.repo.findById(userId);

			return res.json(user);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { firstName, lastName, phone, company, email, password, isAdmin } = req.body;

			const existingUser: IUserDoc | null = await this.repo.findByEmail(email);

			if (existingUser) {
				return res.status(400).json({ error: 'Email is already taken' });
			}

			const hashedPassword: string = await UtilityService.hashPassword(password);

			const updatedUser: IUserDoc = await this.repo.create({
				firstName,
				lastName,
				phone,
				company,
				email,
				isAdmin,
				password: hashedPassword
			});

			return res.json(updatedUser);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { userId } = req.params;
			const { firstName, lastName, phone, company, isAdmin } = req.body;

			if (!userId) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const existingUser: IUserDoc | null = await this.repo.findById(userId);

			if (!existingUser) {
				return res.status(404).json({ error: 'User not found' });
			}

			existingUser.firstName = firstName;
			existingUser.lastName = lastName;
			existingUser.company = company;
			existingUser.phone = phone;
			existingUser.isAdmin = isAdmin;

			const updatedUser = await existingUser.save();

			return res.json(updatedUser);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { userId } = req.params;

			const user: IUserDoc | null = await this.repo.findById(userId);

			if (!user) {
				throw new NotFoundError('User not found');
			}

			await this.repo.delete(user.id);

			return res.status(204).send();
		} catch (err) {
			next(new NotFoundError(err));
		}
	}

	/**
	 * Delete all user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async deleteAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			await this.repo.deleteAll();

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * readUserRoles
	 * readUserRole
	 * createUserRole
	 * deleteUserRole
	 */
}
