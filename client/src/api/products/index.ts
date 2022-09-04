import { instance } from '../client';
import { IProduct, IProductReq } from '../../types/products';

export const getProducts = () => instance.get('products');

export const getProduct = (id: string) => instance.get(`products/${id}`);

export const searchProducts = (value: string) => instance.get<IProductReq[]>(`products/search/${value}`);

export const createProduct = (product: IProduct) => instance.post<IProductReq>('products', product);

export const createProducts = (products: IProduct[]) =>
  instance.post<IProductReq[]>('products/many', products);

export const updateProduct = (id: string, product: IProduct) => instance.put(`products/${id}`, product);

export const deleteProduct = (id: string) => instance.delete(`products/${id}`);
