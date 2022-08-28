import { Router } from 'express';
import { body, param } from 'express-validator';

import { AuthService, PassportStrategy } from '../../services/auth';

import { IComponentRoutes } from '../helper';

import { UserController } from './controller';

import { UserField } from './interface';

export class UserRoutes implements IComponentRoutes<UserController> {
	readonly name: string = 'user';
	readonly controller: UserController = new UserController();
	readonly router: Router = Router();
	authService: AuthService;

	constructor(defaultStrategy?: PassportStrategy) {
		this.authService = new AuthService(defaultStrategy);
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.authService.isAuthorized(), this.authService.adminOnly(), this.controller.readUsers);

		this.router.get(
			'/:userId',
			this.authService.isAuthorized(),
			// this.authService.adminOnly(),
			param('userId').isString(),
			this.authService.validateRequest,
			this.controller.readUser
		);

		this.router.post(
			'/',
			this.authService.isAuthorized(),
			this.authService.adminOnly(),
			body(UserField.email).isEmail(),
			body(UserField.firstName).isString(),
			body(UserField.lastName).isString(),
			body(UserField.company).isString(),
			body(UserField.phone).isString(),
			body(UserField.password).isString(),
			body(UserField.isAdmin).isBoolean(),
			this.authService.validateRequest,
			this.controller.createUser
		);

		this.router.put(
			'/:userId',
			this.authService.isAuthorized(),
			this.authService.adminOnly(),
			param('userId').isString(),
			body(UserField.firstName).isString(),
			body(UserField.lastName).isString(),
			body(UserField.company).isString(),
			body(UserField.phone).isString(),
			body(UserField.isAdmin).isBoolean(),
			this.authService.validateRequest,
			this.controller.updateUser
		);

		this.router.delete(
			'/all',
			this.authService.isAuthorized(),
			this.authService.adminOnly(),
			this.authService.validateRequest,
			this.controller.deleteAllUsers
		);

		this.router.delete(
			'/:userId',
			this.authService.isAuthorized(),
			this.authService.adminOnly(),
			param('userId').isString(),
			this.authService.validateRequest,
			this.controller.deleteUser
		);
	}
}
