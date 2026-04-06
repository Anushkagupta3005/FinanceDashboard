import React from 'react';
import { LayoutGrid, List, BarChart2, Users, Settings, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { activeTab, setActiveTab } = useAppContext();

  const navItems = [
    { name: 'Overview', icon: LayoutGrid },
    { name: 'Transactions', icon: List },
    { name: 'Insights', icon: BarChart2 },
    { name: 'Team Admin', icon: Users },
  ];

  const bottomItems = [
    { name: 'Settings', icon: Settings },
    { name: 'Support', icon: HelpCircle },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 bg-white dark:bg-[#0A192F] border-r border-gray-200 dark:border-slate-800 flex flex-col z-30 transition-all duration-300
      ${isOpen ? 'translate-x-0 w-[240px]' : '-translate-x-full md:translate-x-0 md:w-16 lg:w-[210px]'}
    `}>
      {/* Logo Block */}
      <div className="bg-[#0A192F] text-white p-4 h-16 flex flex-col justify-center shrink-0 overflow-hidden">
        <h1 className={`font-semibold text-sm tracking-tight leading-tight whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'md:opacity-0 lg:opacity-100'}`}>Architectural Ledger</h1>
        <span className={`text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5 whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'md:opacity-0 lg:opacity-100'}`}>Institutional Finance</span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                if(window.innerWidth < 768) setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left btn-press group relative
                ${isActive 
                  ? 'bg-slate-100 dark:bg-slate-800 text-[#0A192F] dark:text-emerald-400' 
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
                }`}
              title={(!isOpen && window.innerWidth >= 768 && window.innerWidth < 1024) ? item.name : undefined}
            >
              <Icon size={20} className={`shrink-0 ${isActive ? 'text-[#0A192F] dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300'}`} />
              <span className={`whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'md:opacity-0 lg:opacity-100 md:hidden lg:inline-block delay-100'}`}>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Pinned Items */}
      <div className="p-3 border-t border-gray-100 flex flex-col gap-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200 transition-colors w-full text-left group btn-press"
              title={(!isOpen && window.innerWidth >= 768 && window.innerWidth < 1024) ? item.name : undefined}
            >
              <Icon size={20} className="shrink-0 text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300" />
              <span className={`whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'md:opacity-0 lg:opacity-100 md:hidden lg:inline-block delay-100'}`}>{item.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};


export default Sidebar;
