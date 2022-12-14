import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found';

import { IUserDoc } from '../user/interface';
import { IProduct } from './interface';

import { ProductRepository } from './repository';

export class ProductController {
	private readonly repo: ProductRepository = new ProductRepository();

	/**
	 * Read products
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async readProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const products = await this.repo.getAll(true);

			return res.json(products);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read product
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async readProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { productID } = req.params;

			const product = await this.repo.findById(productID);

			if (!product) {
				throw new NotFoundError('No Product Found');
			}

			return res.json(product);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Serach product
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async serachProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { value } = req.params;

			const foundProducts = await this.repo.search(value);

			return res.json(foundProducts);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create product
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async createProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { name, price, quantity, description } = req.body;
			const user = req.user as IUserDoc;

			const product = await this.repo.create({
				name,
				quantity,
				description,
				price,
				createdBy: user.id
			});

			return res.json(product);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create products
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async createProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const products = req.body;

			const user = req.user as IUserDoc;

			const createProducts = products.map((p: IProduct) => {
				return { ...p, createdBy: user.id };
			});

			const createdProducts = await this.repo.create(createProducts);

			return res.json(createdProducts);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update product
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { productID } = req.params;
			const { name, price } = req.body;

			if (!productID) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const existingProduct = await this.repo.findById(productID);

			if (!existingProduct) {
				return res.status(404).json({ error: 'User not found' });
			}

			existingProduct.name = name;
			existingProduct.price = price;

			const updatedProduct = await existingProduct.save();

			return res.json(updatedProduct);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete product
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { productID } = req.params;

			const product = await this.repo.findById(productID);

			if (!product) {
				return res.status(404).json({ error: 'User not found' });
			}

			await this.repo.delete(product.id);

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
