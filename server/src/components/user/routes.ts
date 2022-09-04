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
			param('userId').isString().isMongoId(),
			this.authService.validateRequest,
			this.controller.readUser
		);

		this.router.post(
			'/',
			this.authService.isAuthorized(),
			this.authService.adminOnly(),
			body(UserField.email).isEmail().normalizeEmail({ gmail_remove_dots: false }),
			body(UserField.firstName).isString().trim(),
			body(UserField.lastName).isString().trim(),
			body(UserField.company).isString().trim(),
			body(UserField.phone).isString().trim(),
			body(UserField.password).isString().trim(),
			body(UserField.isAdmin).isBoolean(),
			this.authService.validateRequest,
			this.controller.createUser
		);

		this.router.put(
			'/:userId',
			this.authService.isAuthorized(),
			this.authService.adminOnly(),
			param('userId').isString().isMongoId(),
			body(UserField.firstName).isString().trim(),
			body(UserField.lastName).isString().trim(),
			body(UserField.company).isString().trim(),
			body(UserField.phone).isString().trim(),
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
			param('userId').isString().isMongoId(),
			this.authService.validateRequest,
			this.controller.deleteUser
		);
	}
}
