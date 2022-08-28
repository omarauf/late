import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  name?: string;
  title?: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  pattern?: string;
  children?: string;
  path?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, name, onClick, title, type, disabled, children } = props;

  return (
    <button
      onClick={onClick}
      style={{ boxShadow: '0 8px 16px 0 rgb(0 171 85 / 24%)' }}
      id={name}
      disabled={disabled}
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${className} w-full rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none 
        focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-green-500 dark:focus:ring-green-800`}
      // sm:w-auto
    >
      {title || children}
    </button>
  );
};

export const LinkButton: React.FC<ButtonProps> = (props) => {
  const { name, title, children, path } = props;

  return (
    <Link
      to={path || '/'}
      style={{ boxShadow: '0 8px 16px 0 rgb(0 171 85 / 24%)' }}
      id={name}
      type="button"
      className="w-full rounded-lg bg-green-500 px-6 py-3 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none 
        focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
      // sm:w-auto
    >
      {title || children}
    </Link>
  );
};
