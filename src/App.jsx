import React from 'react';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import TeamAdmin from './pages/TeamAdmin';
import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const { activeTab, isLoading, theme } = useAppContext();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: isDark ? '#1e293b' : '#ffffff',
            color: isDark ? '#f8fafc' : '#1e293b',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          duration: 3000,
        }}
      />
      {isLoading ? (
        <div className="w-full h-full flex flex-col space-y-6 animate-in fade-in duration-500 relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="h-36 bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            <div className="h-36 bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            <div className="h-36 bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            <div className="h-36 bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
             <div className="lg:col-span-2 h-[400px] bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
             <div className="h-[400px] bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-forwards relative z-0">
          {activeTab === 'Overview' && <Overview />}
          {activeTab === 'Transactions' && <Transactions />}
          {activeTab === 'Insights' && <Insights />}
          {activeTab === 'Team Admin' && <TeamAdmin />}
          {activeTab !== 'Overview' && activeTab !== 'Transactions' && activeTab !== 'Insights' && activeTab !== 'Team Admin' && (
            <div className="w-full h-[60vh] flex items-center justify-center flex-col animate-in fade-in duration-500 pt-8 sm:pt-0">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              </div>
              <h2 className="text-xl font-semibold text-[#0A192F] dark:text-gray-100 mb-2">{activeTab}</h2>
              <p className="text-gray-500 dark:text-slate-400 text-center px-4">This module is currently under development.</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default App;
