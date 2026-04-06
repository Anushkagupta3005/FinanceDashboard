import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Download, FileText, Search, SlidersHorizontal, ChevronLeft, ChevronRight,
  TrendingDown, Plus, X, ArrowUpRight, DollarSign, Activity
} from 'lucide-react';

const Transactions = () => {
  const { currentRole, transactions, filters, setFilters } = useAppContext();
  const isAdmin = currentRole === 'admin';

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Selected Transaction for modal
  const [selectedTx, setSelectedTx] = useState(null);

  // Local state for dropdowns
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset page on filter change
  };

  const clearFilters = () => {
    setFilters({
      dateRange: 'all',
      type: 'all',
      category: 'all',
      searchQuery: ''
    });
    setCurrentPage(1);
  };

  // Derived state: Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      // Very basic filtering implementation matching the requirements
      if (filters.type !== 'all' && tx.type !== filters.type) return false;
      if (filters.category !== 'all' && tx.category !== filters.category) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!tx.description.toLowerCase().includes(query) && 
            !tx.entity.toLowerCase().includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [transactions, filters]);

  // Derived state: Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique categories for dropdown
  const uniqueCategories = useMemo(() => {
    const cats = new Set(transactions.map(t => t.category));
    return ['all', ...Array.from(cats)];
  }, [transactions]);

  // Summary Metrics
  const summaryMetrics = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    
    // Using un-filtered transactions for the total overview as requested: "shows $4.2M total..."
    transactions.forEach(t => {
      if (t.type === 'income') inflow += t.amount;
      if (t.type === 'expense') outflow += t.amount;
    });

    const net = inflow - outflow;

    // Top Entities
    const entityMap = {};
    transactions.forEach(t => {
      if (!entityMap[t.entity]) entityMap[t.entity] = 0;
      entityMap[t.entity] += t.amount; 
    });
    
    const topEntities = Object.entries(entityMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, amount]) => ({ name, amount }));

    return { inflow, outflow, net, topEntities };
  }, [transactions]);

  return (
    <div className="w-full mx-auto animate-in fade-in duration-500 pb-10">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#0A192F] tracking-tight">Transaction History</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and track your institutional capital flows</p>
        </div>
        
        {isAdmin && (
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-[#0A192F] hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 cursor-pointer">
              <Download size={16} />
              Export CSV
            </button>
            <button className="bg-[#0A192F] hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 cursor-pointer">
              <FileText size={16} />
              PDF Report
            </button>
          </div>
        )}
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search entity..." 
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0A192F]/20 focus:border-[#0A192F] transition-all w-[200px]"
            />
          </div>

          <select 
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#0A192F]/20 cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>

          <select 
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#0A192F]/20 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select 
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#0A192F]/20 cursor-pointer capitalize"
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={clearFilters}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            Clear all
          </button>
          <button className="p-2 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        {filteredTransactions.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-medium text-[#0A192F] mb-1">No transactions found</h3>
            <p className="text-gray-500 text-sm">No transactions match your current filters. Try adjusting them.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTransactions.map((tx) => (
                    <tr 
                      key={tx.id} 
                      onClick={() => setSelectedTx(tx)}
                      className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium whitespace-nowrap">
                        {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 min-w-[280px]">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {tx.type === 'income' ? <Plus size={16} /> : <TrendingDown size={16} />}
                          </div>
                          <div>
                            <p className="font-semibold text-[#0A192F] text-sm truncate max-w-[250px]" title={tx.description}>{tx.description}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{tx.subtext}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 capitalize w-max cursor-default">
                          {tx.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${tx.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-400 animate-pulse'}`}></div>
                          <span className="text-xs font-medium text-gray-700 capitalize">{tx.status}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm font-bold text-right whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600' : 'text-[#0A192F]'}`}>
                        {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-gray-100 bg-[#fbfbfb] flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing <span className="font-semibold text-[#0A192F]">{(currentPage - 1) * itemsPerPage + (filteredTransactions.length > 0 ? 1 : 0)}</span>–<span className="font-semibold text-[#0A192F]">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="font-semibold text-[#0A192F]">{filteredTransactions.length}</span> transactions
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md text-gray-400 hover:text-[#0A192F] hover:bg-gray-200 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  if (totalPages > 5 && idx > 0 && idx < totalPages - 1 && Math.abs(idx - (currentPage - 1)) > 1) {
                    if (idx === 1 || idx === totalPages - 2) return <span key={idx} className="px-2 text-gray-400 text-xs">...</span>;
                    return null;
                  }
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`min-w-[32px] h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === idx + 1 
                          ? 'bg-[#0A192F] text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-md text-gray-400 hover:text-[#0A192F] hover:bg-gray-200 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* BOTTOM SUMMARY SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Monthly Cash Velocity */}
        <div className="bg-[#0A192F] rounded-xl border border-slate-800 shadow-md p-6 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
          
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-widest mb-6">Monthly Cash Velocity</h3>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Flow Summary</p>
              <h4 className="text-4xl font-bold tracking-tight">${(summaryMetrics.inflow + summaryMetrics.outflow).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
            </div>
            
            {/* Donut Accent */}
            <div className="w-16 h-16 rounded-full border-[6px] border-emerald-500 border-r-rose-500 border-b-rose-500 flex items-center justify-center rotate-45 transform">
              <div className="w-8 h-8 rounded-full bg-slate-800 -rotate-45 flex items-center justify-center">
                <Activity size={14} className="text-slate-300" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <ArrowUpRight size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Inflow</span>
              </div>
              <p className="text-lg font-bold">+${summaryMetrics.inflow.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2 text-rose-400">
                <TrendingDown size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Outflow</span>
              </div>
              <p className="text-lg font-bold">-${summaryMetrics.outflow.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>

        {/* Right: Top Entity Activity */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#0A192F]">Top Entity Activity</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer">
              View Entity Map
            </button>
          </div>
          
          <div className="space-y-4">
            {summaryMetrics.topEntities.map((entity, i) => (
              <div key={entity.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-gray-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0A192F]">{entity.name}</p>
                    <p className="text-xs text-gray-500">Top volume partner</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-[#0A192F]">${entity.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal/Drawer Overlay */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-sm animate-in fade-in transition-all">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedTx(null)}></div>
          <div className="relative bg-white w-full max-w-md h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col z-10">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-[#0A192F]">Transaction Details</h3>
              <button 
                onClick={() => setSelectedTx(null)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${selectedTx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    <DollarSign size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#0A192F] mb-1">
                    {selectedTx.type === 'income' ? '+' : '-'}${Math.abs(selectedTx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    selectedTx.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {selectedTx.status}
                  </span>
                </div>
              </div>

              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">General Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Transaction ID</span>
                      <span className="text-sm font-medium text-[#0A192F]">{selectedTx.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Date & Time</span>
                      <span className="text-sm font-medium text-[#0A192F]">{new Date(selectedTx.date).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Entity</span>
                      <span className="text-sm font-medium text-[#0A192F]">{selectedTx.entity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Category</span>
                      <span className="text-sm font-medium text-[#0A192F]">{selectedTx.category}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Description</span>
                      <span className="text-sm font-medium text-[#0A192F]">{selectedTx.description}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Subtext / Memo</span>
                      <span className="text-sm text-gray-700">{selectedTx.subtext}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button className="w-full bg-[#0A192F] hover:bg-slate-800 text-white py-3 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer">
                  Edit Transaction Record
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Transactions;
