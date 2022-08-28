import React from 'react';
import { Table } from '@tanstack/react-table';

import { Button, PageButton } from './button';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '../../assets/icons';

interface PaginationProps<T extends object> {
  table: Table<T>;
}

export const Pagination = <T extends object>({ table }: PaginationProps<T>) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex flex-1 justify-between sm:hidden">
      <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage}>
        Previous
      </Button>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage}>
        Next
      </Button>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div className="flex items-baseline gap-x-2">
        <span className="text-sm text-gray-700">
          Page <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> of{' '}
          <span className="font-medium">{table.getPageCount()}</span>
        </span>
        <label htmlFor="perPage">
          <span className="sr-only">Items Per Page</span>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}>
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <PageButton
            className="rounded-l-md"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton onClick={table.nextPage} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton
            className="rounded-r-md"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
        </nav>
      </div>
    </div>
  </div>
);
