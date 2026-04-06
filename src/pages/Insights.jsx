import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Server, Building2, CreditCard, Monitor, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext';

// --- MOCK DATA ---
const donutData = [
  { name: 'Operations', value: 45, color: '#0A192F', darkColor: '#34d399' },
  { name: 'Payroll', value: 28, color: '#334155', darkColor: '#10b981' },
  { name: 'Marketing', value: 18, color: '#64748B', darkColor: '#059669' },
  { name: 'Other', value: 9, color: '#94A3B8', darkColor: '#047857' },
];

const barData = [
  { name: 'JUL', income: 420000, expense: 380000 },
  { name: 'AUG', income: 480000, expense: 410000 },
  { name: 'SEP', income: 510000, expense: 420000 },
];

const merchantsData = [
  { name: 'Amazon Web Services', icon: Server, sector: 'Cloud Infrastructure', volume: '142', spent: '$84,500' },
  { name: 'WeWork Global', icon: Building2, sector: 'Real Estate', volume: '12', spent: '$45,200' },
  { name: 'Amex Travel Corp', icon: CreditCard, sector: 'Corporate Travel', volume: '284', spent: '$38,900' },
  { name: 'Microsoft 365', icon: Monitor, sector: 'Software Licenses', volume: '45', spent: '$22,400' },
];

const budgetData = [
  { title: 'Operational Budget', amount: '$180,000', utilizedText: '82% Utilized', utilizedValue: 82, colorClass: 'bg-emerald-500', isOver: false, textClass: 'text-emerald-600 dark:text-emerald-400' },
  { title: 'Development Budget', amount: '$45,000', utilizedText: '105% Utilized', utilizedValue: 100, colorClass: 'bg-red-500', isOver: true, textClass: 'text-red-600 dark:text-rose-400' },
  { title: 'Reserve Contingency', amount: '$120,500', utilizedText: '12% Growth', utilizedValue: 12, colorClass: 'bg-blue-500', isOver: false, textClass: 'text-blue-600 dark:text-blue-400' },
];

const Insights = () => {
  const [timePeriod, setTimePeriod] = useState('30 Days');
  const { theme } = useAppContext();

  return (
    <div className="w-full mx-auto animate-in fade-in duration-500 pb-10 space-y-6">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A192F] dark:text-slate-100 mb-1 tracking-tight">Spending Insights</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Deep analysis of fiscal flows for Q3 Fiscal Year.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-1 shadow-sm">
          {['30 Days', '90 Days', 'YTD'].map(period => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer btn-press tracking-tight ${timePeriod === period ? 'bg-slate-100 dark:bg-slate-700 text-[#0A192F] dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-[#0A192F] dark:hover:text-slate-200'}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TOP ROW — TWO CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Spending by Category */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm flex flex-col relative group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#0A192F] dark:text-white tracking-tight">Spending by Category</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"><MoreHorizontal size={20} /></button>
          </div>
          
          <div className="flex-1 relative min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={theme === 'dark' ? entry.darkColor : entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: theme === 'dark' ? '1px solid #334155' : 'none', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    backgroundColor: theme === 'dark' ? '#0A192F' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#000000'
                  }}
                  itemStyle={{ color: theme === 'dark' ? '#34d399' : '#0A192F' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
              <span className="text-2xl font-bold text-[#0A192F] dark:text-white">$412.5k</span>
              <span className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-widest">Total Monthly</span>
            </div>
          </div>
          
          {/* Custom Legend Below */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2">
            {donutData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme === 'dark' ? item.darkColor : item.color }}></span>
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{item.name}</span>
                <span className="text-sm text-gray-400 dark:text-slate-500">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Inflow vs. Outflow */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#0A192F] dark:text-white tracking-tight">Inflow vs. Outflow</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"><MoreHorizontal size={20} /></button>
          </div>
          
          <div className="flex-1 min-h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#E2E8F0'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(val) => `$${val/1000}k`} />
                <RechartsTooltip 
                  cursor={{fill: theme === 'dark' ? '#1e293b' : '#F1F5F9'}} 
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: theme === 'dark' ? '1px solid #334155' : 'none',
                    backgroundColor: theme === 'dark' ? '#0A192F' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#000000'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="income" name="Income" fill={theme === 'dark' ? '#34d399' : '#0A192F'} radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Expense" fill={theme === 'dark' ? '#f43f5e' : '#94A3B8'} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-emerald-100 dark:border-emerald-800/50">
              <TrendingUp size={14} />
              Net Profit Margin +24.8% — Over Target
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Institutional Merchants Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-700 bg-[#fbfbfb] dark:bg-slate-800/50">
            <h3 className="font-semibold text-[#0A192F] dark:text-white tracking-tight">Top Institutional Merchants</h3>
            <button className="text-sm font-medium text-[#0A192F] dark:text-emerald-400 hover:text-indigo-600 dark:hover:text-emerald-500 transition-colors cursor-pointer tracking-tight">View All Report &rarr;</button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[500px]">
              <thead className="bg-slate-50 dark:bg-slate-900/30 text-gray-500 dark:text-slate-400 tracking-wider">
                <tr className="border-b border-gray-100 dark:border-slate-700 w-full">
                  <th className="font-medium p-4 py-3">Merchant</th>
                  <th className="font-medium p-4 py-3">Sector</th>
                  <th className="font-medium p-4 py-3">Volume</th>
                  <th className="font-medium p-4 py-3 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                {merchantsData.map((merchant, idx) => {
                  const Icon = merchant.icon;
                  return (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors group/row cursor-default">
                      <td className="p-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 group-hover/row:scale-110 transition-transform">
                          <Icon size={16} />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-slate-200">{merchant.name}</span>
                      </td>
                      <td className="p-4 py-3 text-gray-500 dark:text-slate-400">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                          {merchant.sector}
                        </span>
                      </td>
                      <td className="p-4 py-3 text-gray-500 dark:text-slate-400">{merchant.volume} txns</td>
                      <td className="p-4 py-3 text-right font-bold text-[#0A192F] dark:text-white">{merchant.spent}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Savings Efficacy Card */}
        <div className="bg-[#0A192F] dark:bg-emerald-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/10 dark:bg-black/20 rounded-lg flex items-center justify-center">
                <ArrowUpRight size={18} className="text-emerald-400" />
              </div>
              <span className="text-slate-300 dark:text-emerald-100 font-medium text-sm tracking-wide">Savings Efficacy</span>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-bold tracking-tight">32.4%</span>
                <span className="text-emerald-400 dark:text-emerald-300 text-sm font-medium pb-1">+4.2% from previous quarter</span>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 dark:text-emerald-200 font-medium uppercase tracking-wider text-[11px]">Capital Retention</span>
                <span className="text-slate-400 dark:text-emerald-300/80 font-medium text-[11px]">Goal: 35%</span>
              </div>
              <div className="w-full bg-slate-700 dark:bg-emerald-950/50 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-400 dark:bg-emerald-300 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-slate-700/50 dark:border-emerald-800/50 relative z-10">
            <p className="text-sm text-slate-400 dark:text-emerald-200/80 leading-relaxed italic">
              "Your current retention rate puts you in the top 5% of architectural firms in the Northwest sector."
            </p>
          </div>
        </div>
        
      </div>

      {/* BOTTOM ROW — BUDGET CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {budgetData.map((budget, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400">{budget.title}</h4>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${budget.colorClass.replace('bg-', 'bg-').replace('500', '100')} ${budget.colorClass.replace('bg-', 'text-').replace('500', '600')}`}>
                <ArrowUpRight size={14} />
              </div>
            </div>
            
            <div className="text-2xl font-bold text-[#0A192F] dark:text-white mb-4 tracking-tight">{budget.amount}</div>
            
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className={budget.textClass}>{budget.utilizedText}</span>
              {budget.isOver && <span className="text-red-500 dark:text-rose-400 bg-red-50 dark:bg-rose-900/30 px-1.5 rounded animate-pulse">Over Budget</span>}
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div className={`${budget.colorClass} h-2 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${Math.min(budget.utilizedValue, 100)}%` }}></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Insights;
