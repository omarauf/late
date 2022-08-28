import { model, Schema } from 'mongoose';

import { IProduct, IProductModel } from './interface';

const ProductSchema = new Schema<IProduct, IProductModel>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	createdAt: { type: Date, default: Date.now }
});

export const Product = model<IProduct, IProductModel>('Product', ProductSchema);
