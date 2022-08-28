import React from 'react';
import { rankItem } from '@tanstack/match-sorter-utils';
import { flexRender, RowModel, HeaderGroup, Row, FilterMeta, HeaderContext } from '@tanstack/react-table';

import { useDebouncedCallback } from '../../hooks/useDebounce';

export function fuzzyFilter<T>(
  row: Row<T>,
  columnId: string,
  value: string,
  addMeta: (meta: FilterMeta) => void,
) {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
}

// This is a custom filter UI for selecting
// a unique option from a list
export const SelectColumnFilter = <T extends object>(props: HeaderContext<T, unknown>) => {
  const { table, column } = props;

  // console.log(props.header.getLeafHeaders());

  const preFilteredRows = table.getPreFilteredRowModel().rows;
  const filterValue = column.getFilterValue() as string;
  const { id } = column;
  const header =
    typeof column.columnDef.header === 'function' ? column.columnDef.header(props) : column.columnDef.header;

  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo<string[]>(() => {
    const optionsSet = new Set<string>();

    preFilteredRows.forEach((row: Row<T>) => {
      optionsSet.add(row.getValue(id));
    });
    return [...optionsSet.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <label htmlFor="filter" className="flex items-baseline gap-x-2">
      <span className="text-gray-700">{header}:</span>
      <select
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          table.setPageIndex(0); // go to first page
          column.setFilterValue(e.target.value || undefined);
        }}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

interface GlobalFilterProps<T extends object> {
  getFilteredRowModel: () => RowModel<T>;
  // globalFilter: TableState<DataType>;
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
}

// Define a default UI for filtering
export const GlobalFilter = <T extends object>(filter: GlobalFilterProps<T>) => {
  const { getFilteredRowModel, globalFilter, setGlobalFilter } = filter;

  const count = getFilteredRowModel().rows.length;
  const [value, setValue] = React.useState(globalFilter);

  const onChange = useDebouncedCallback((debValue) => {
    setGlobalFilter(debValue as string);
  }, 350);

  return (
    <label htmlFor="search" className="flex items-baseline gap-x-2">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
};

interface FilterPropsRender<T extends object> {
  getHeaderGroups: () => HeaderGroup<T>[];
  getFilteredRowModel: () => RowModel<T>;
  setGlobalFilter: (filterValue: string) => void;
  globalFilter: string;
}

const Filter = <T extends object>(props: FilterPropsRender<T>) => {
  const { globalFilter, setGlobalFilter, getHeaderGroups, getFilteredRowModel } = props;

  return (
    <div className="flex gap-x-2">
      <GlobalFilter<T>
        getFilteredRowModel={getFilteredRowModel}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {/* Filter */}
      {getHeaderGroups().map((headerGroup) =>
        headerGroup.headers.map((header) => {
          const CustomFilter = header.column.columnDef.meta?.Filter;
          return CustomFilter ? (
            <div key={header.id}>{flexRender(CustomFilter, header.getContext())}</div>
          ) : null;
        }),
      )}
    </div>
  );
};

export default Filter;
