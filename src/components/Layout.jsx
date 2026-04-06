import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppContext } from '../context/AppContext';

const Layout = ({ children }) => {
  const { theme } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[#F4F6F9] dark:bg-slate-900 font-sans flex text-gray-800 dark:text-slate-100 transition-colors duration-300">
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-[#0A192F]/50 z-20 md:hidden animate-in fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <Sidebar activeTab="Overview" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main Content Area - responsive padding */}
        <div className="flex-1 ml-0 md:ml-16 lg:ml-[210px] flex flex-col min-h-screen w-full transition-all duration-300">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
