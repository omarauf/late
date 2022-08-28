import React, { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  value?: string;
  name: string;
  title: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  pattern?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: React.Dispatch<any>;
}

export const Input: React.FC<InputProps> = (props) => {
  const { value, name, title, type, placeholder, onChange } = props;

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
        {title}
      </label>
      <input
        type={type || 'text'}
        value={value}
        id={name}
        name={name}
        onChange={(e) => onChange?.({ type: e.target.name, payload: e.target.value })}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 
          focus:border-[#00AB55] focus:ring-[#00AB55] dark:border-gray-600 dark:bg-gray-700 dark:text-white
          dark:placeholder-gray-400 dark:focus:border-[#00AB55] dark:focus:ring-[#00AB55]"
        placeholder={placeholder || ''}
        required={false}
      />
    </div>
  );
};
