import { Document, Model, Types } from 'mongoose';

export interface IProduct {
	name: string;
	price: number;
	quantity: number;
	description: string;
	createdBy: string | Types.ObjectId;
	createdAt?: Date;
}

export enum ProductField {
	name = 'name',
	price = 'price',
	quantity = 'quantity',
	description = 'description'
}

// export type ProductField = keyof IProduct;

export interface IProductDoc extends Document, IProduct {
	createdAt: Date;
	_id: Types.ObjectId;
	createdBy: Types.ObjectId;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProductModel extends Model<IProductDoc> {}
