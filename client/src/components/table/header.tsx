import React from 'react';
import { HeaderGroup, flexRender } from '@tanstack/react-table';

import { SortDownIcon, SortIcon, SortUpIcon } from '../../assets/svg';

interface HeaderProps<T extends object> {
  getHeaderGroups: () => HeaderGroup<T>[];
}

export const Header = <T extends object>(props: HeaderProps<T>) => {
  const { getHeaderGroups } = props;

  return (
    <tbody className="bg-gray-50">
      {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            // Add the sorting props to control sorting. For this example
            // we can add them into the header props

            <th
              scope="col"
              className={`${
                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
              } group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500`}
              colSpan={header.colSpan}
              key={header.id}>
              {header.isPlaceholder ? null : (
                <div
                  className="flex items-center justify-between"
                  role="presentation"
                  onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span>
                    {header.column.getCanSort()
                      ? {
                          asc: <SortUpIcon className="h-4 w-4 text-gray-400" />,
                          desc: <SortDownIcon className="h-4 w-4 text-gray-400" />,
                        }[header.column.getIsSorted() as string] ?? (
                          <SortIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                        )
                      : null}
                  </span>
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
