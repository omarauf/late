import React from 'react';

import toast from 'react-hot-toast';
import { HiX, HiOutlineCheckCircle, HiOutlineXCircle } from '../../assets/icons';
import { classNames } from '../../utils';

export const notify = (title: string, message: string, error = false) =>
  toast.custom((t) => (
    <div
      className={classNames(
        t.visible ? 'animate-enter' : 'animate-leave',
        'pointer-events-none inset-0 flex sm:items-start',
      )}>
      <div className="flex w-full flex-col items-center sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}

        <div className="w-sm pointer-events-auto overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4" style={{ width: '384px' }}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {error ? (
                  <HiOutlineXCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
                ) : (
                  <HiOutlineCheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => {
                    toast.dismiss(t.id);
                  }}>
                  <span className="sr-only">Close</span>
                  <HiX className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
