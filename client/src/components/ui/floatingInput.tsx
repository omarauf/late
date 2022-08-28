import React, { HTMLInputTypeAttribute } from 'react';

interface FloatingInputProps {
  value?: string;
  name: string;
  title: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  pattern?: string;
}

export const FloatingInput: React.FC<FloatingInputProps> = (props) => {
  const { name, title, type, placeholder, disabled } = props;

  return (
    <div className="relative">
      <input
        type={type || 'text'}
        disabled={disabled}
        id={name}
        className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-white px-2.5 pb-2.5 pt-4 text-sm text-gray-900 autofill:bg-red-500
          focus:border-[#00AB55] focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
        placeholder={placeholder || ''}
      />
      <label
        htmlFor={name}
        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4
          peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#00AB55] dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500">
        {title}
      </label>
    </div>
  );
};
