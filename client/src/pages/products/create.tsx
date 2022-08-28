import React from 'react';
import { ProductCreate } from '../../components/form/productCreate';

const CreateProduct: React.FC = () => (
  <>
    <h1 className="mb-6">Create a New Product</h1>
    <div className="rounded bg-white p-8 shadow">
      <ProductCreate />
    </div>
  </>
);

export default CreateProduct;
