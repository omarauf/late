import React from 'react';
import { CellContext } from '@tanstack/react-table';

import { classNames } from '../../utils';

interface AvatarCellProps {
  name: string;
  imgUrl: string;
  email: string;
}

export const AvatarCell = <T extends object>(props: CellContext<T, AvatarCellProps>) => {
  const { getValue } = props;
  const { name, imgUrl, email } = getValue();

  return (
    <div className="flex items-center">
      <div className="h-10 w-10 flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={imgUrl} alt="No " />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
    </div>
  );
};

export const StatusPill = <T extends object>(props: CellContext<T, string>) => {
  const { getValue } = props;
  const value = getValue();
  const status = value ? value.toLowerCase() : 'unknown';

  return (
    <span
      className={classNames(
        'leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm',
        status.startsWith('active') ? 'bg-green-100 text-green-700' : '',
        status.startsWith('inactive') ? 'bg-yellow-100 text-yellow-700' : '',
        status.startsWith('offline') ? 'bg-red-100 text-red-700' : '',
      )}>
      {status}
    </span>
    // <div>sa</div>
  );
};
