import React from 'react';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import TeamAdmin from './pages/TeamAdmin';
import { useAppContext } from './context/AppContext';

function App() {
  const { activeTab, isLoading } = useAppContext();

  return (
    <Layout>
      {isLoading ? (
        <div className="w-full h-full flex flex-col space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-36 skeleton"></div>
            <div className="h-36 skeleton"></div>
            <div className="h-36 skeleton"></div>
          </div>
          <div className="h-[400px] skeleton"></div>
        </div>
      ) : (
        <>

      {activeTab === 'Overview' && <Overview />}
      {activeTab === 'Transactions' && <Transactions />}
      {activeTab === 'Insights' && <Insights />}
      {activeTab === 'Team Admin' && <TeamAdmin />}
      {activeTab !== 'Overview' && activeTab !== 'Transactions' && activeTab !== 'Insights' && activeTab !== 'Team Admin' && (
        <div className="w-full h-[60vh] flex items-center justify-center flex-col animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          </div>
          <h2 className="text-xl font-semibold text-[#0A192F] mb-2">{activeTab}</h2>
          <p className="text-gray-500">This module is currently under development.</p>
        </div>
      )}
      </>
      )}
    </Layout>
  );
}

export default App;
