import React, { useState } from 'react';
import { Plus, Wallet, TrendingUp, TrendingDown, ArrowRightLeft, CreditCard, Download, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const chartData = [
  { name: 'MAR 01', netWorth: 110000 },
  { name: 'MAR 08', netWorth: 115000 },
  { name: 'MAR 15', netWorth: 112000 },
  { name: 'MAR 22', netWorth: 118000 },
  { name: 'TODAY', netWorth: 124500.50 }
];

const recentActivity = [
  { id: 1, entity: 'Stripe Payout', description: 'Monthly subscription revenue', category: 'Revenue', timestamp: 'Today, 2:30 PM', amount: 12400.00, type: 'income' },
  { id: 2, entity: 'AWS Services', description: 'Cloud infrastructure', category: 'Infrastructure', timestamp: 'Yesterday, 10:15 AM', amount: -450.00, type: 'expense' },
  { id: 3, entity: 'WeWork', description: 'Office lease', category: 'Office', timestamp: 'Mar 20, 2026', amount: -1200.00, type: 'expense' },
  { id: 4, entity: 'Client Payment', description: 'Consulting invoice #402', category: 'Consulting', timestamp: 'Mar 18, 2026', amount: 4500.00, type: 'income' },
  { id: 5, entity: 'Acme Corp', description: 'Software licenses', category: 'Software', timestamp: 'Mar 15, 2026', amount: -120.50, type: 'expense' }
];

const Overview = () => {
  const [timeFilter, setTimeFilter] = useState('1M');
  const { currentRole, theme } = useAppContext();

  const canAction = currentRole === 'admin' || currentRole === 'analyst';

  return (
    <div className="w-full mx-auto animate-in fade-in duration-500 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#0A192F] dark:text-slate-100 tracking-tight">Overview</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Institutional liquidity and asset management summary.</p>
        </div>
        
        {/* Action Button */}
        {canAction && (
          <button 
            className="bg-[#0A192F] dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2 group cursor-pointer btn-press"
            onClick={() => toast.success('Initiating new transfer...')}
          >
            <Plus size={16} className="group-hover:scale-110 transition-transform" />
            New Transfer
          </button>
        )}
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Balance */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg hover:border-[#0A192F]/20 dark:hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Total Balance</p>
              <h3 className="text-3xl font-bold text-[#0A192F] dark:text-white tracking-tight">$124,500.50</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-[#0A192F] dark:text-emerald-400 group-hover:bg-[#0A192F] dark:group-hover:bg-emerald-500/20 group-hover:text-white transition-colors cursor-pointer">
              <Wallet size={20} />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <TrendingUp size={14} />
            <span>+4.2% from last month</span>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Monthly Income</p>
              <h3 className="text-3xl font-bold text-[#0A192F] dark:text-white tracking-tight">$15,200.00</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500/30 group-hover:text-white transition-colors cursor-pointer">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">75% of quarterly target</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-emerald-500 dark:bg-emerald-400 h-2 rounded-full transition-all duration-1000 ease-in-out" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg hover:border-rose-200 dark:hover:border-rose-500/30 transition-all duration-300 md:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Monthly Expenses</p>
              <h3 className="text-3xl font-bold text-[#0A192F] dark:text-white tracking-tight">$9,450.25</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 dark:group-hover:bg-rose-500/30 group-hover:text-white transition-colors cursor-pointer">
              <TrendingDown size={20} />
            </div>
          </div>
          <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1.5">
            Outflow trend: Stable
          </p>
        </div>
      </div>

      {/* Chart and Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Cash Flow Performance Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#0A192F] dark:text-white">Cash Flow Performance</h3>
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
              {['1M', '6M', '1Y'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setTimeFilter(tab);
                    toast(`Chart data mocked for ${tab}`, { icon: '📊' });
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer btn-press ${
                    timeFilter === tab
                      ? 'bg-white dark:bg-slate-700 text-[#0A192F] dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-slate-400 hover:text-[#0A192F] dark:hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme === 'dark' ? '#34d399' : '#0A192F'} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={theme === 'dark' ? '#34d399' : '#0A192F'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#E5E7EB'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} width={60} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: theme === 'dark' ? '1px solid #334155' : 'none', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    backgroundColor: theme === 'dark' ? '#0A192F' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#000000'
                  }}
                  itemStyle={{ color: theme === 'dark' ? '#34d399' : '#0A192F' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Net Worth']}
                />
                <Area type="monotone" dataKey="netWorth" stroke={theme === 'dark' ? '#34d399' : '#0A192F'} strokeWidth={2} fillOpacity={1} fill="url(#colorNetWorth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-[#0A192F] dark:text-white mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3 flex-1">
            {/* Action 1 */}
            <button 
              disabled={!canAction}
              onClick={() => toast.success('Transfer flow opened')}
              className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all btn-press ${
                canAction 
                  ? 'border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#0A192F]/50 dark:hover:border-emerald-500/50 hover:shadow-md cursor-pointer group' 
                  : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${canAction ? 'bg-[#0A192F] dark:bg-emerald-900/30 text-white dark:text-emerald-400 group-hover:scale-105' : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-500'}`}>
                <ArrowRightLeft size={18} />
              </div>
              <div>
                <p className={`font-medium ${canAction ? 'text-[#0A192F] dark:text-slate-100' : 'text-gray-500 dark:text-slate-500'}`}>New Transfer</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Move funds between accounts</p>
              </div>
            </button>

            {/* Action 2 */}
            <button 
              disabled={!canAction}
              onClick={() => toast.success('Bill payment flow opened')}
              className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all btn-press ${
                canAction 
                  ? 'border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md cursor-pointer group' 
                  : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${canAction ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-105' : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-500'}`}>
                <CreditCard size={18} />
              </div>
              <div>
                <p className={`font-medium ${canAction ? 'text-[#0A192F] dark:text-slate-100' : 'text-gray-500 dark:text-slate-500'}`}>Pay Bill</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Process vendor payments</p>
              </div>
            </button>

            {/* Action 3 */}
            <button 
              disabled={!canAction}
              onClick={() => toast.success('Money request flow opened')}
              className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all btn-press ${
                canAction 
                  ? 'border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-md cursor-pointer group' 
                  : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${canAction ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-105' : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-500'}`}>
                <Download size={18} />
              </div>
              <div>
                <p className={`font-medium ${canAction ? 'text-[#0A192F] dark:text-slate-100' : 'text-gray-500 dark:text-slate-500'}`}>Request Money</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Send an invoice to a client</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-700 bg-[#fbfbfb] dark:bg-slate-800/50">
          <h3 className="text-lg font-semibold text-[#0A192F] dark:text-white">Recent Activity</h3>
          <a href="#/transactions" className="text-sm font-medium text-[#0A192F] dark:text-emerald-400 hover:text-emerald-600 transition-colors">
            View All History &rarr;
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/30 border-b border-gray-100 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Entity/Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group cursor-default">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'}`}>
                        {activity.type === 'income' ? <Plus size={16} /> : <TrendingDown size={16} />}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A192F] dark:text-slate-200 text-sm">{activity.entity}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{activity.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      {activity.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    {activity.timestamp}
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold text-right whitespace-nowrap ${activity.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {activity.type === 'income' ? '+' : '-'}${Math.abs(activity.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
