import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../containers/sidebar';

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Side bar & Static sidebar for desktop */}
      <Sidebar isSidebarOpen={open} onCloseSidebar={() => setOpen(false)} />

      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        {/* Main  */}
        <main className="relative flex-1 overflow-y-auto bg-gray-100 focus:outline-none">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
