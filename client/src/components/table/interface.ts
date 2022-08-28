import { RankingInfo } from '@tanstack/match-sorter-utils';
import { FilterFn, HeaderContext, RowData } from '@tanstack/react-table';

export interface IRowMenu<T> {
  title: string;
  onClick: (row: T) => void;
}

export interface DataType {
  id: number;
  name: string;
  email: string;
  title: string;
  department: string;
  status: string;
  role: string;
  age: number;
  imgUrl: string;
}

// export interface DataType {
//   _id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   company: string;
//   phone: string;
//   isAdmin: boolean;
// }

// export type ColumnProps = Column<DataType> & { imgAccessor?: string; emailAccessor?: string };

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    Filter: (props: HeaderContext<TData, unknown>) => JSX.Element;
  }
  // interface TableMeta<TData extends RowData> {
  //   updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  // }
  // interface TableMeta<TData extends RowData> {
  //   clickedRow: any;
  //   setClickedRow: any;
  // }
}
