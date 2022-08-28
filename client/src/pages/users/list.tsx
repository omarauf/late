import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React, { useEffect } from 'react';

import { deleteUser, getUsers, updateUser } from '../../api';
import { UserForm } from '../../components/form/user';
import Table, { IRowMenu, SelectColumnFilter, useSkipper } from '../../components/table';
import { Button } from '../../components/ui/button';
import Modal from '../../components/ui/modal';
import { notify } from '../../components/ui/toast';
import { IUserReq } from '../../types/user';
import { removeItem, updateItem } from '../../utils/array';
// import { DataType, columns, createData } from '../../fake/tableData';

// interface DataType {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   company: string;
//   phone: string;
//   isAdmin: boolean;
// }

const columnHelper = createColumnHelper<IUserReq>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<IUserReq, any>[] = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: 'fullName',
    header: 'Full Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.email, {
    id: 'email',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Email</span>,
    footer: (info) => info.column.id,
    enableSorting: false,
  }),
  columnHelper.accessor('company', {
    header: () => <span>Company</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => (row.isAdmin ? 'Admin' : 'User'), {
    id: 'isAdmin',
    header: 'Type',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    meta: { Filter: SelectColumnFilter },
  }),
];
// const data = createData(100);

const ListUser: React.FC = () => {
  const [users, setUsers] = React.useState<IUserReq[]>([]);
  const [clickedUser, setClickedUsers] = React.useState<IUserReq>();
  const [deletedUser, setDeletedUser] = React.useState<IUserReq>();
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  useEffect(() => {
    getUsers()
      .then(({ data }) => setUsers(data))
      .catch((error) => notify('Error', error.message, true));
  }, []);

  const rowMenu: IRowMenu<IUserReq>[] = [
    { title: 'Cut', onClick: () => console.log('Cut') },
    { title: 'Copy', onClick: () => console.log('Copy') },
    { title: 'Delete', onClick: (user: IUserReq) => setDeletedUser(user) },
  ];

  const onDeleteUserHandler = async () => {
    try {
      if (!deletedUser) return;
      await deleteUser(deletedUser.id);
      setUsers([...removeItem(users, deletedUser)]); // update users by it's id
      setClickedUsers(undefined);
      skipAutoResetPageIndex(); // Skip page index reset until after next rerender
      notify('Done', `${deletedUser.firstName} ${deletedUser.lastName} has been removed successfully`);
    } catch (error) {
      console.error('error');
    }
  };

  const onUpdateUserHandler = async (formData: IUserReq) => {
    try {
      const { data } = await updateUser(formData.id, formData);
      setUsers([...updateItem(users, data)]); // update users by it's id
      setClickedUsers(undefined);
      skipAutoResetPageIndex(); // Skip page index reset until after next rerender
      notify('Done', `${data.firstName} ${data.lastName} has been updated successfully`);
    } catch (error) {
      console.error('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mt-1">
        <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
      </div>
      <div className="mt-4">
        {/* Table */}
        <Table<IUserReq>
          autoResetPageIndex={autoResetPageIndex}
          clickedRow={setClickedUsers}
          columns={columns}
          data={users}
          rowMenu={rowMenu}
        />

        {/* Model to Update User */}
        {clickedUser && (
          <Modal
            isOpen={!!clickedUser}
            onClose={() => {
              setClickedUsers(undefined);
            }}>
            <UserForm<IUserReq> type="UPDATE" onSubmit={onUpdateUserHandler} initialUser={clickedUser} />
          </Modal>
        )}

        {/* Model for Delete Confirmation User */}
        {deletedUser && (
          <Modal
            isOpen={!!deletedUser}
            onClose={() => {
              setDeletedUser(undefined);
            }}>
            <div>
              <div>
                Do you want to delete {deletedUser.firstName} {deletedUser.lastName}?
              </div>
              <Button onClick={onDeleteUserHandler} className="mt-3 bg-red-500 hover:bg-red-800">
                Delete
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ListUser;
