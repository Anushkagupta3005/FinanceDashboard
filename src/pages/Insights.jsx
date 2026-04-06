import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Server, Building2, CreditCard, Monitor, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

// --- MOCK DATA ---
const donutData = [
  { name: 'Operations', value: 45, color: '#0A192F' },
  { name: 'Payroll', value: 28, color: '#334155' },
  { name: 'Marketing', value: 18, color: '#64748B' },
  { name: 'Other', value: 9, color: '#94A3B8' },
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
  { title: 'Operational Budget', amount: '$180,000', utilizedText: '82% Utilized', utilizedValue: 82, colorClass: 'bg-emerald-500', isOver: false, textClass: 'text-emerald-600' },
  { title: 'Development Budget', amount: '$45,000', utilizedText: '105% Utilized', utilizedValue: 100, colorClass: 'bg-red-500', isOver: true, textClass: 'text-red-600' },
  { title: 'Reserve Contingency', amount: '$120,500', utilizedText: '12% Growth', utilizedValue: 12, colorClass: 'bg-blue-500', isOver: false, textClass: 'text-blue-600' },
];

const Insights = () => {
  const [timePeriod, setTimePeriod] = useState('30 Days');

  return (
    <div className="p-8 pb-12 animate-in fade-in duration-500 max-w-7xl mx-auto space-y-6">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A192F] mb-1">Spending Insights</h1>
          <p className="text-gray-500 text-sm">Deep analysis of fiscal flows for Q3 Fiscal Year.</p>
        </div>
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
          {['30 Days', '90 Days', 'YTD'].map(period => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${timePeriod === period ? 'bg-slate-100 text-[#0A192F] shadow-sm' : 'text-gray-500 hover:text-[#0A192F]'}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TOP ROW — TWO CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Spending by Category */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#0A192F]">Spending by Category</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
          </div>
          
          <div className="flex-1 relative min-h-[250px]">
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
              <span className="text-2xl font-bold text-[#0A192F]">$412.5k</span>
              <span className="text-xs text-gray-500">Total Monthly</span>
            </div>
          </div>
          
          {/* Custom Legend Below */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2">
            {donutData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Inflow vs. Outflow */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#0A192F]">Inflow vs. Outflow</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
          </div>
          
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(val) => `$${val/1000}k`} />
                <RechartsTooltip cursor={{fill: '#F1F5F9'}} formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="income" name="Income" fill="#0A192F" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Expense" fill="#94A3B8" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-emerald-100">
              <TrendingUp size={14} />
              Net Profit Margin +24.8% — Over Target
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Institutional Merchants Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <h3 className="font-semibold text-[#0A192F]">Top Institutional Merchants</h3>
            <button className="text-sm font-medium text-[#0A192F] hover:text-blue-600 transition-colors">View All Report &rarr;</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-gray-500 tracking-wider">
                <tr>
                  <th className="font-medium p-4 py-3">Merchant</th>
                  <th className="font-medium p-4 py-3">Sector</th>
                  <th className="font-medium p-4 py-3">Volume</th>
                  <th className="font-medium p-4 py-3 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {merchantsData.map((merchant, idx) => {
                  const Icon = merchant.icon;
                  return (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <Icon size={16} />
                        </div>
                        <span className="font-medium text-gray-900">{merchant.name}</span>
                      </td>
                      <td className="p-4 py-3 text-gray-500">{merchant.sector}</td>
                      <td className="p-4 py-3 text-gray-500">{merchant.volume} txns</td>
                      <td className="p-4 py-3 text-right font-medium text-[#0A192F]">{merchant.spent}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Savings Efficacy Card */}
        <div className="bg-[#0A192F] text-white rounded-xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <ArrowUpRight size={18} className="text-emerald-400" />
              </div>
              <span className="text-slate-300 font-medium text-sm">Savings Efficacy</span>
            </div>
            
            <div className="mt-4">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold tracking-tight">32.4%</span>
                <span className="text-emerald-400 text-sm font-medium pb-1">+4.2% from previous quarter</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Capital Retention</span>
                <span className="text-slate-400">Goal: 35%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-400 leading-relaxed">
              Your current retention rate puts you in the top 5% of architectural firms in the Northwest sector.
            </p>
          </div>
        </div>
        
      </div>

      {/* BOTTOM ROW — BUDGET CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {budgetData.map((budget, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-1">{budget.title}</h4>
            <div className="text-2xl font-bold text-[#0A192F] mb-4">{budget.amount}</div>
            
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className={budget.textClass}>{budget.utilizedText}</span>
              {budget.isOver && <span className="text-red-500 bg-red-50 px-1.5 rounded">Over Budget</span>}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className={`${budget.colorClass} h-2 rounded-full`} style={{ width: `${budget.utilizedValue}%` }}></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Insights;
