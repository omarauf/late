import React, { ReactNode } from 'react';

import { classNames } from '../../utils';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    type="button"
    disabled={disabled}
    className={classNames(
      'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
      className || '',
    )}>
    {children}
  </button>
);

interface PageButtonProps {
  className?: string;
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

export const PageButton: React.FC<PageButtonProps> = ({ children, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    type="button"
    disabled={disabled}
    className={classNames(
      'relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50',
      className || '',
    )}>
    {children}
  </button>
);

// export const PageButton: React.FC<PageButtonProps> = ({ children, onClick, disabled, className }) => (
//   <HiOutlineDotsVertical className="cursor-pointer" />
// );
