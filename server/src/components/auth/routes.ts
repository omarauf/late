import { Router } from 'express';
import { body } from 'express-validator';

import { AuthService, PassportStrategy } from '../../services/auth';

import { IComponentRoutes } from '../helper';

import { AuthController } from './controller';

export class AuthRoutes implements IComponentRoutes<AuthController> {
	readonly name: string = 'auth';
	readonly controller: AuthController = new AuthController();
	readonly router: Router = Router();
	authService: AuthService;

	constructor(defaultStrategy?: PassportStrategy) {
		this.authService = new AuthService(defaultStrategy);
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.post(
			'/signin',
			body('email').isEmail(),
			body('password').isString(),
			this.authService.validateRequest,
			this.controller.signinUser
		);

		this.router.post(
			'/register',
			body('email').isEmail(),
			body('password').isString(),
			this.authService.validateRequest,
			this.controller.registerUser
		);

		this.router.get('/signout', this.controller.signoutUser);

		this.router.post('/refresh_token', this.authService.isAuthorized(), this.controller.refreshToken);
	}
}
