import { instance } from '../client';

export const getProducts = () => instance.get('products');

export const getProduct = (id: string) => instance.get(`products/${id}`);

export const createProduct = (product: {
  name: string;
  price: number;
  quantity: number;
  description: string;
}) => instance.post('products', product);

export const updateProduct = (id: string, product: { name: string; price: number }) =>
  instance.put(`products/${id}`, product);

export const deleteProduct = (id: string) => instance.delete(`products/${id}`);
