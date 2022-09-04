import React, { useEffect } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { getProducts } from '../../api';
import Table from '../../components/table';
import { notify } from '../../components/ui/toast';
import { IProductReq } from '../../types/products';

const columnHelper = createColumnHelper<IProductReq>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<IProductReq, any>[] = [
  columnHelper.accessor('name', {
    header: 'Product Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Product Price</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('quantity', {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Quantity</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: () => <span>Description</span>,
    footer: (info) => info.column.id,
  }),
];

const ListProducts: React.FC = () => {
  const [products, setProducts] = React.useState<IProductReq[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (error) {
      notify('Error', error.message, true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="">
        <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
      </div>
      <div className="mt-4">
        <Table<IProductReq> columns={columns} data={products} />
      </div>
    </div>
  );
};

export default ListProducts;
