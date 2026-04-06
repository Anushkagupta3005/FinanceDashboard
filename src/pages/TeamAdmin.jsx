import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, UserPlus, Shield, Info, Download, Filter, Search, MoreHorizontal, CheckCircle2, ChevronRight, AlertTriangle, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const TeamAdmin = () => {
  const { currentRole } = useAppContext();
  
  // If not admin, show access restricted
  if (currentRole !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-red-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Lock className="w-10 h-10 text-red-500 dark:text-rose-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-3 tracking-tight">Access Restricted</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md text-center leading-relaxed">
          The Team Management module is restricted to administrators. Your current role (<span className="capitalize font-medium text-slate-700 dark:text-slate-300">{currentRole}</span>) does not have permission to view or modify team access levels.
        </p>
      </div>
    );
  }

  const [members, setMembers] = useState([
    { id: 1, name: 'Elias Vance', email: 'elias.vance@archledger.com', role: 'Admin', lastActive: '2 mins ago', initial: 'EV', bg: 'bg-[#0A192F] dark:bg-emerald-600' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@archledger.com', role: 'Analyst', lastActive: '1 hr ago', initial: 'SJ', bg: 'bg-emerald-600' },
    { id: 3, name: 'Marcus Dupré', email: 'm.dupre@archledger.com', role: 'Viewer', lastActive: 'Yesterday', initial: 'MD', bg: 'bg-amber-500' },
    { id: 4, name: 'Dr. Lin Zhao', email: 'lzhao@archledger.com', role: 'Analyst', lastActive: '3 days ago', initial: 'LZ', bg: 'bg-blue-500 flex' }
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">Admin</span>;
      case 'Analyst':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">Analyst</span>;
      case 'Viewer':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">Viewer</span>;
      default:
        return null;
    }
  };

  const handleRoleChange = (memberId, newRole) => {
    const member = members.find(m => m.id === memberId);
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
    setOpenDropdown(null);
    toast.success(`${member?.name}'s role updated to ${newRole}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-1 tracking-tight">Team Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Orchestrate access levels and invite institutional collaborators.</p>
        </div>
        <button 
          onClick={() => toast.success('Invitation sent! Member will receive an email shortly.', { icon: '📧' })}
          className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm btn-press hover:shadow-md max-w-max"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. LEFT PANEL */}
        <div className="lg:col-span-1 space-y-6">
          {/* Role Hierarchy Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-[#0A192F] dark:text-white tracking-tight">Role Hierarchy</h2>
            </div>
            <div className="p-5 space-y-5">
              <div className="flex space-x-4">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0A192F] dark:text-slate-200">Admin</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded">Full Access</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Can modify system settings, execute all transfers, manage billing, and alter user roles.</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0A192F] dark:text-slate-200">Analyst</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded">Read/Write</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Can view all dashboards, export reports, and stage transfers for admin approval.</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0A192F] dark:text-slate-200">Viewer</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">Read Only</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Can view dashboards and underlying transaction data. No modification rights.</p>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Security Overview</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> 100% Secure</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">2FA Compliance across all active accounts.</div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Seat Usage Card */}
          <div className="bg-[#0A192F] dark:bg-emerald-900 rounded-xl shadow-md p-6 text-white relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 dark:bg-white/5 rounded-full blur-xl -ml-10 -mb-10 group-hover:scale-150 transition-transform duration-700 delay-100"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-white tracking-tight">Seat Usage</h2>
                <div className="bg-white/10 px-2 py-1 rounded text-xs font-medium tracking-wide">Enterprise Plan</div>
              </div>
              <div className="flex items-end space-x-2 mb-2">
                <span className="text-3xl font-bold tracking-tight">14</span>
                <span className="text-slate-400 dark:text-emerald-200 mb-1">/ 20</span>
              </div>
              <p className="text-sm text-slate-300 dark:text-emerald-100">Active institution seats currently occupied.</p>
              
              <div className="mt-5 h-1.5 w-full bg-slate-700 dark:bg-emerald-950/50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-lg font-semibold text-[#0A192F] dark:text-white tracking-tight">Authorized Personnel</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toast('Filter panel opened', { icon: '🔍' })}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors btn-press"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => toast.success('Personnel list exported successfully', { icon: '📥' })}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors btn-press"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-xs text-slate-500 dark:text-slate-400">
                    <th className="px-6 py-4 font-medium uppercase tracking-wider">Member</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${member.bg}`}>
                            {member.initial}
                          </div>
                          <div>
                            <div className="font-medium text-[#0A192F] dark:text-slate-200 text-sm whitespace-nowrap">{member.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(member.role)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {member.lastActive}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium hover:underline flex items-center justify-end w-full"
                            onClick={() => setOpenDropdown(openDropdown === member.id ? null : member.id)}
                          >
                            Edit Role
                          </button>
                          
                          {openDropdown === member.id && (
                            <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 z-20 focus:outline-none animate-in fade-in zoom-in-95 duration-150">
                              <div className="py-1" role="menu" aria-orientation="vertical">
                                {['Admin', 'Analyst', 'Viewer'].map((roleOp) => (
                                  <button
                                    key={roleOp}
                                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${member.role === roleOp ? 'bg-slate-50 dark:bg-slate-700/50 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'}`}
                                    role="menuitem"
                                    onClick={() => handleRoleChange(member.id, roleOp)}
                                  >
                                    {roleOp}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Showing 4 of 14 active members</span>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => toast('Page 1 — currently viewing', { icon: '📄' })}
                  className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 btn-press"
                >1</button>
                <button 
                  onClick={() => toast('Loading page 2...', { icon: '📄' })}
                  className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 btn-press"
                >2</button>
                <button 
                  onClick={() => toast('Loading page 3...', { icon: '📄' })}
                  className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 btn-press"
                >3</button>
                <button 
                  onClick={() => toast('Loading next page...', { icon: '➡️' })}
                  className="w-7 h-7 flex items-center justify-center rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 btn-press"
                ><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. COMPLIANCE NOTE */}
      <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30 p-4 flex items-start md:items-center justify-between flex-col md:flex-row gap-4 group hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-colors">
        <div className="flex items-start md:items-center space-x-3 text-indigo-800 dark:text-indigo-200">
          <Info className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 md:mt-0" />
          <p className="text-sm leading-relaxed">
            Role modifications are logged in the sovereign audit trail. Changing an Admin role requires secondary verification from another authorized administrator.
          </p>
        </div>
        <button 
          onClick={() => toast('Opening sovereign audit trail log...', { icon: '📋' })}
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 whitespace-nowrap shrink-0 ml-8 md:ml-0 hover:underline"
        >
          View Audit Trail
        </button>
      </div>
    </div>
  );
};

export default TeamAdmin;
