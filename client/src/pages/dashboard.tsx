import React, { useEffect, useState } from 'react';
import { searchProducts } from '../api';

import { Button } from '../components/ui/button';
import { notify } from '../components/ui/toast';
import { useDebounce } from '../hooks/useDebounce';
import { IProductReq } from '../types/products';

const Dashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [foundProducts, setFoundProducts] = useState<IProductReq[]>();
  const debouncedValue = useDebounce(searchValue);

  const serachProductsHandler = async (value: string) => {
    try {
      const { data } = await searchProducts(value);
      if (data.length === 0) console.log('No items founded');

      setFoundProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    serachProductsHandler(debouncedValue as string);
    if (debouncedValue === '') setFoundProducts([]);
  }, [debouncedValue]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    // setSearchValue(e.target.value);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="mt-10 flex flex-col rounded bg-slate-600 p-10 shadow">
        <p className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Search</p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            onChange={changeHandler}
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
            placeholder="Search Mockups, Logos..."
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Search
          </button>
        </div>
        {foundProducts && (
          <div className="mt-2 rounded bg-white">
            <ul>
              {foundProducts.map((p) => (
                <li key={p.id} className="my-1 p-2 hover:bg-green-100">
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default Dashboard;
