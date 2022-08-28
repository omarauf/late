import React from 'react';

interface InputProps {
  checked: boolean;
  name: string;
  title: string;
  disabled?: boolean;
  pattern?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: React.Dispatch<any>;
}

export const Checkbox: React.FC<InputProps> = (props) => {
  const { checked, name, title, disabled, onChange } = props;

  return (
    <div className="mb-6 flex items-start">
      <div className="flex h-5 items-center">
        <input
          checked={checked}
          id={name}
          name={name}
          type="checkbox"
          disabled={disabled}
          onChange={(e) => onChange?.({ type: e.target.name, payload: e.target.checked })}
          className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 checked:bg-[#00AB55] focus:ring-[#00AB55] 
            dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-[#00AB55]"
          required={false}
        />
      </div>
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        {title}
      </label>
    </div>
  );
};
