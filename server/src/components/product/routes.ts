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
			param('productID').isString().isMongoId(),
			this.authService.validateRequest,
			this.controller.readProduct
		);

		this.router.get(
			'/search/:value',
			this.authService.isAuthorized(),
			param('value').isString(),
			this.authService.validateRequest,
			this.controller.serachProduct
		);

		this.router.post(
			'/',
			this.authService.isAuthorized(),
			// this.authService.hasPermission(this.name, 'read'),
			body(ProductField.name).isString().trim(),
			body(ProductField.quantity).isNumeric(),
			body(ProductField.price).isNumeric(),
			body(ProductField.description).isString().trim(),
			this.authService.validateRequest,
			this.controller.createProduct
		);

		this.router.post(
			'/many',
			this.authService.isAuthorized(),
			body().isArray(),
			this.authService.validateRequest,
			this.controller.createProducts
		);

		this.router.put(
			'/:productID',
			this.authService.isAuthorized(),
			param('productID').isString().isMongoId(),
			body(ProductField.name).isString().trim(),
			body(ProductField.quantity).isNumeric(),
			body(ProductField.price).isNumeric(),
			body(ProductField.description).isString().trim(),
			this.authService.validateRequest,
			this.controller.updateProduct
		);

		this.router.delete(
			'/:productID',
			this.authService.isAuthorized(),
			param('productID').isString().isMongoId(),
			this.authService.validateRequest,
			this.controller.deleteProduct
		);
	}
}
