import React from 'react';
import { Search, Bell, HelpCircle, Menu, Moon, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Header = ({ toggleSidebar }) => {
  const { currentRole, setCurrentRole, theme, setTheme } = useAppContext();

  return (
    <header className="h-16 bg-white dark:bg-[#0A192F] border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>

      {/* Search Bar */}
      <div className="hidden sm:block flex-1 max-w-md ml-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A192F] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]/20 focus:border-[#0A192F] transition-all text-gray-800 placeholder:text-gray-400"
          />
        </div>
      </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Role Switcher */}
        <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 pl-2 pr-1 py-1 mr-2">
          <span className="text-xs text-gray-500 font-medium mr-2">Role:</span>
          <select 
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="text-xs font-semibold bg-transparent border-none text-[#0A192F] dark:text-gray-700 outline-none cursor-pointer"
          >
            <option value="viewer">Viewer</option>
            <option value="analyst">Analyst</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <button 
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors btn-press"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button 
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors relative btn-press"
          onClick={() => toast('You have 3 new notifications', { icon: '🔔' })}
        >
          <Bell size={20} />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white translate-x-1/2 -translate-y-1/4"></span>
        </button>
        <button 
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors btn-press"
          onClick={() => toast('Help Center coming soon!', { icon: '❓' })}
        >
          <HelpCircle size={20} />
        </button>

        <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1 sm:mx-2"></div>

        {/* User Profile */}
        <button 
          className="flex items-center gap-2 sm:gap-3 text-left hover:bg-gray-50 dark:hover:bg-slate-800 p-1 sm:pr-2 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-slate-700 transition-all btn-press"
          onClick={() => toast('Profile menu opened', { icon: '👤' })}
        >
          <img
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            alt="Eleanor Pena"
            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 leading-none">Eleanor Pena</p>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5 capitalize">{currentRole}</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
