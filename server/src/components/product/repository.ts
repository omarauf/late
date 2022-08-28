import { BaseRepository } from '../helper';

import { IProduct, IProductDoc, IProductModel } from './interface';
import { Product } from './model';

export class ProductRepository extends BaseRepository<IProduct, IProductDoc, IProductModel> {
	constructor() {
		super(Product, 'product');
	}
}
