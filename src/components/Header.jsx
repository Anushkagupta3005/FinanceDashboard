import React from 'react';
import { Search, Bell, HelpCircle, Menu, Moon, Sun, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ROLE_LABELS = { admin: 'Admin', analyst: 'Analyst', viewer: 'Viewer' };

const Header = ({ toggleSidebar }) => {
  const { currentRole, theme, setTheme } = useAppContext();
  const { user, logout } = useAuth();

  const displayName = user?.name || 'User';
  const avatar = user?.avatarUrl || `https://i.pravatar.cc/150?u=${user?.email || 'user'}`;

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

        {/* Real role badge (from the logged-in user, server-verified) */}
        <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-md bg-gray-50 dark:bg-slate-800 px-2.5 py-1 mr-1">
          <span className="text-xs text-gray-500 dark:text-slate-400 font-medium mr-1.5">Role:</span>
          <span className="text-xs font-semibold text-[#0A192F] dark:text-emerald-400">
            {ROLE_LABELS[currentRole] || currentRole}
          </span>
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
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white translate-x-1/2 -translate-y-1/4"></span>
        </button>
        <button
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors btn-press"
          onClick={() => toast('Help Center coming soon!', { icon: '❓' })}
        >
          <HelpCircle size={20} />
        </button>

        <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1 sm:mx-2"></div>

        {/* User Profile (real logged-in user) */}
        <div className="flex items-center gap-2 sm:gap-3 p-1 sm:pr-2 rounded-full border border-transparent">
          <img
            src={avatar}
            alt={displayName}
            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 leading-none">{displayName}</p>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5 capitalize">{currentRole}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => { logout(); toast.success('Signed out'); }}
          title="Sign out"
          className="text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors btn-press"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
