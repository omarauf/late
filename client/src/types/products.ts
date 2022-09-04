export interface IProduct {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export interface IProductReq extends IProduct {
  id: string;
  createdBy: string;
  createdAt: string;
}
