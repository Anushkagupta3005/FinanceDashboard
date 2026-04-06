import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans flex text-gray-800">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content Area - padded left by sidebar width */}
      <div className="flex-1 ml-[210px] flex flex-col min-h-screen">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 p-8">
          {/* We pass the activeTab so the Overview page knows if it's active. For a real app, this would be handled by React Router */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
