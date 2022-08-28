import React from 'react';

interface InputProps {
  name: string;
  title: string;
  placeholder?: string;
  disabled?: boolean;
  pattern?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: React.Dispatch<any>;
}

export const TextArea: React.FC<InputProps> = (props) => {
  const { name, title, placeholder, disabled, onChange } = props;

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
        {title}
      </label>
      <textarea
        id={name}
        name={name}
        disabled={disabled}
        rows={4}
        onChange={(e) => onChange?.({ type: e.target.name, payload: e.target.value })}
        className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 
          focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
          dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
        placeholder={placeholder || ''}
        required={false}
      />
    </div>
  );
};
