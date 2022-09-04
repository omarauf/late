import React from 'react';
import { read, utils } from 'xlsx';
import { createProducts } from '../../api';
import { Button } from '../../components/ui/button';
import { notify } from '../../components/ui/toast';
import { IProduct } from '../../types/products';

const ImportProduct: React.FC = () => {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [products, setProducts] = React.useState<IProduct[]>();

  // triggers when file is selected with click
  const fileHandeler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) sheetParser(file);
  };

  // triggers when file is dropped
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    sheetParser(file);
  };

  // handle drag events
  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const sheetParser = async (file: File) => {
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = read(data, { type: 'array' });
    const xlsjson = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

    const keys: string[] = Object.keys(xlsjson[0] as object);
    const errorInHeaderName = !keys.includes('name' && 'description' && 'price' && 'quantity');

    if (errorInHeaderName) notify('Error', 'File syntax is not valid', true);
    else setProducts(xlsjson as IProduct[]);
  };

  const uploadHandler = async () => {
    if (products)
      try {
        const { data } = await createProducts(products);
        notify('Done', `A ${data.length} have been uploaded`);
        console.log(data);
      } catch (error) {
        console.log('error', error);
      }
  };
  return (
    <>
      <h1 className="mb-6">Import Products</h1>
      <div className="rounded bg-white p-8 shadow">
        <p className="block text-sm font-medium text-gray-700">Upload Product File</p>
        <form className="relative" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={fileHandeler}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">XLS, XLSX up to 10MB</p>
            </div>
          </div>
          {dragActive && (
            <div
              className="absolute inset-0 h-full w-full bg-slate-500 opacity-10"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}
        </form>
      </div>
      {products && (
        <div className="mt-5 flex items-baseline justify-between rounded bg-white p-8 shadow">
          <p>There are {products.length} products, Do you want to upload?</p>
          <Button onClick={uploadHandler} className="w-36">
            Upload
          </Button>
        </div>
      )}
    </>
  );
};

export default ImportProduct;
