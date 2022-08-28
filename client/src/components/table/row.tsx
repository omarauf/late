import React, { useState } from 'react';
import { flexRender, Row as IRow, RowModel } from '@tanstack/react-table';
import { ControlledMenu, MenuItem, MenuState, useMenuState } from '@szhsin/react-menu';
import { IRowMenu } from './interface';

interface RowsProps<T> {
  getRowModel: () => RowModel<T>;
  clickedRow?: React.Dispatch<React.SetStateAction<T | undefined>>;
  rowMenu?: IRowMenu<T>[];
}

export const Rows = <T extends object>({ getRowModel, clickedRow, rowMenu }: RowsProps<T>) => {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [contextUserId, setContextUserId] = useState<number>();

  const { rows, rowsById } = getRowModel();

  const contextClickedRow = contextUserId !== undefined ? rowsById[contextUserId].original : undefined;

  return (
    <>
      {rows.map((row) => (
        <Row<T>
          row={row}
          key={row.id}
          onClick={clickedRow}
          menuProps={menuProps}
          toggleMenu={rowMenu && toggleMenu} // if there is menu then pass toggleMenu
          setAnchorPoint={setAnchorPoint}
          contextUserId={contextUserId}
          setContextUserId={setContextUserId}
        />
      ))}
      {rowMenu && (
        <tr>
          <td>
            <ControlledMenu
              state={menuProps.state}
              endTransition={menuProps.endTransition}
              anchorPoint={anchorPoint}
              onClose={() => {
                toggleMenu(false);
                setContextUserId(undefined);
              }}>
              <div className="min-w-[160px] rounded bg-white shadow">
                {rowMenu.map((menu, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      menu.onClick(contextClickedRow as T);
                    }}
                    className="px-6 py-2 hover:bg-green-100">
                    {menu.title}
                  </MenuItem>
                ))}
              </div>
            </ControlledMenu>
          </td>
        </tr>
      )}
    </>
  );
};

interface Point {
  x: number;
  y: number;
}

interface RowProps<T> {
  row: IRow<T>;
  onClick?: React.Dispatch<React.SetStateAction<T | undefined>>;
  menuProps: {
    state?: MenuState | undefined;
    endTransition: () => void;
  };
  toggleMenu?: (open?: boolean | undefined) => void;
  setAnchorPoint: React.Dispatch<React.SetStateAction<Point>>;
  contextUserId: number | undefined;
  setContextUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Row = <T extends object>(props: RowProps<T>) => {
  const { row, menuProps, contextUserId } = props;
  const { onClick, toggleMenu, setAnchorPoint, setContextUserId } = props;

  let style = '';
  if (menuProps.state !== 'open') style = 'hover:bg-green-50';
  else if (contextUserId === row.index) style = 'bg-green-50';

  return (
    <tr
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu?.(true);
        setContextUserId(row.index);
      }}
      onClick={() => {
        onClick?.(row.original);
      }}
      key={row.id}
      className={style}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="whitespace-nowrap px-6 py-4" role="cell">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
