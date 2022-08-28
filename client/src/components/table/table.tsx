import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  ColumnDef,
} from '@tanstack/react-table';

import Filter, { fuzzyFilter } from './filter';
import { TABLE_LOGGER } from '../../constant';
import { Rows } from './row';
import { Pagination } from './pagination';
import { Header } from './header';
import { Container } from './container';
import { IRowMenu } from './interface';

interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  clickedRow?: React.Dispatch<React.SetStateAction<T | undefined>>;
  rowMenu?: IRowMenu<T>[];
  autoResetPageIndex?: boolean;
}

const Table = <T extends object>(props: TableProps<T>) => {
  const { data, columns, rowMenu, autoResetPageIndex, clickedRow } = props;

  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    //
    debugTable: TABLE_LOGGER,
    debugHeaders: TABLE_LOGGER,
    debugColumns: TABLE_LOGGER,
  });

  // Render the UI for your table
  return (
    <>
      {/* Filter */}
      <Filter<T>
        getHeaderGroups={table.getHeaderGroups}
        getFilteredRowModel={table.getFilteredRowModel}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {/* table */}
      <Container>
        <table className="min-w-full divide-y divide-gray-200">
          <Header<T> getHeaderGroups={table.getHeaderGroups} />
          <tbody className="divide-y divide-gray-200 bg-white">
            <Rows<T> getRowModel={table.getRowModel} clickedRow={clickedRow} rowMenu={rowMenu} />
          </tbody>
        </table>
      </Container>

      {/* Pagination */}
      <Pagination<T> table={table} />

      {/* Logger */}
      {TABLE_LOGGER ? (
        <pre>
          <code>{JSON.stringify(table.getState(), null, 2)}</code>
        </pre>
      ) : null}
    </>
  );
};

export default Table;
