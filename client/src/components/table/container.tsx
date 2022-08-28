import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children } = props;

  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">{children}</div>
        </div>
      </div>
    </div>
  );
};
