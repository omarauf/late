import { Router } from 'express';
import { body, param } from 'express-validator';

import { AuthService, PassportStrategy } from '../../services/auth';

import { IComponentRoutes } from '../helper';

import { ProductController } from './controller';

import { ProductField } from './interface';

export class ProductRoutes implements IComponentRoutes<ProductController> {
	readonly name: string = 'product';
	readonly controller: ProductController = new ProductController();
	readonly router: Router = Router();
	authService: AuthService;

	constructor(defaultStrategy?: PassportStrategy) {
		this.authService = new AuthService(defaultStrategy);
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.authService.isAuthorized(), this.controller.readProducts);

		this.router.get(
			'/:productID',
			this.authService.isAuthorized(),
			param('productID').isString(),
			this.authService.validateRequest,
			this.controller.readProduct
		);

		this.router.post(
			'/',
			this.authService.isAuthorized(),
			// this.authService.hasPermission(this.name, 'read'),
			body(ProductField.name).isString(),
			body(ProductField.price).isNumeric(),
			this.authService.validateRequest,
			this.controller.createProduct
		);

		this.router.put(
			'/:productID',
			this.authService.isAuthorized(),
			param('productID').isString(),
			body(ProductField.name).isString(),
			body(ProductField.price).isNumeric(),
			this.authService.validateRequest,
			this.controller.updateProduct
		);

		this.router.delete(
			'/:productID',
			this.authService.isAuthorized(),
			param('productID').isString(),
			this.authService.validateRequest,
			this.controller.deleteProduct
		);
	}
}
