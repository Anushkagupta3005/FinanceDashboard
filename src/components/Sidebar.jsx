import React from 'react';
import { LayoutGrid, List, BarChart2, Users, Settings, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
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
    <aside className="w-[210px] fixed inset-y-0 left-0 bg-white border-r border-gray-200 flex flex-col z-20">
      {/* Logo Block */}
      <div className="bg-[#0A192F] text-white p-4 h-16 flex flex-col justify-center shrink-0">
        <h1 className="font-semibold text-sm tracking-tight leading-tight">Architectural Ledger</h1>
        <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">Institutional Finance</span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left
                ${isActive 
                  ? 'bg-slate-100 text-[#0A192F]' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <Icon size={18} className={isActive ? 'text-[#0A192F]' : 'text-gray-400'} />
              {item.name}
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
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left"
            >
              <Icon size={18} className="text-gray-400" />
              {item.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
};


export default Sidebar;
