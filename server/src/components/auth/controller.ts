import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../../services/auth';
import { UtilityService } from '../../services/utility';

import { UserRepository } from '../user/repository';
import { IUserDoc } from '../user/interface';

export class AuthController {
	private readonly authService: AuthService = new AuthService();

	private readonly userRepo: UserRepository = new UserRepository();

	/**
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async signinUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, password } = req.body;

			const user: IUserDoc | null = await this.userRepo.findByEmail(email);

			if (!user || !(await UtilityService.verifyPassword(password, user.password))) {
				return res.status(401).json({ status: 401, error: 'Wrong email or password' });
			}

			// Create jwt -> required for further requests
			const accessToken: string = this.authService.tokenService.createAccessToken(user.id, user.isAdmin);
			const refreshToken: string = this.authService.tokenService.createRefreshToken(user.id, user.tokenVersion);

			this.sentToken(res, refreshToken);

			// Don't send user password in response
			// delete user.password;

			return res.json({ accessToken, user });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async signoutUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			this.sentToken(res, '');

			// Don't send user password in response
			// delete user.password;

			return res.json({ done: true });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Register new user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async registerUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, firstName, lastName, company, phone, password, isAdmin } = req.body;

			const user: IUserDoc | null = await this.userRepo.findByEmail(email);

			if (user) {
				return res.status(400).json({ error: 'Email is already taken' });
			}

			const hashedPassword: string = await UtilityService.hashPassword(password);

			const newUser: IUserDoc = await this.userRepo.create({
				firstName,
				isAdmin,
				lastName,
				company,
				phone,
				email,
				password: hashedPassword
			});

			return res.status(200).json(newUser);
		} catch (err) {
			return next(err);
		}
	}

	@bind
	async refreshToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const user = req.user as IUserDoc;

			const accessToken: string = this.authService.tokenService.createAccessToken(user.id, user.isAdmin);
			const refreshToken: string = this.authService.tokenService.createRefreshToken(user.id, user.tokenVersion);

			this.sentToken(res, refreshToken);

			return res.status(200).json({ accessToken, user });
		} catch (err) {
			return next(err);
		}
	}

	private sentToken(res: Response, refreshToken: string): void {
		res.cookie('jid', refreshToken, {
			httpOnly: true,
			path: '/v1/auth/refresh_token'
		});
	}
}
