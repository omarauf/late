import { model, Schema } from 'mongoose';

import { IProduct, IProductDoc, IProductModel } from './interface';

const ProductSchema = new Schema<IProduct, IProductModel>(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		description: { type: String },
		createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		createdAt: { type: Date, default: Date.now }
	},
	{
		toJSON: {
			transform(doc, ret: IProductDoc) {
				return {
					id: ret._id,
					name: ret.name,
					price: ret.price,
					quantity: ret.quantity,
					createdBy: ret.createdBy,
					createdAt: ret.createdAt,
					description: ret.description
				};
			}
		}
	}
);

export const Product = model<IProduct, IProductModel>('Product', ProductSchema);
