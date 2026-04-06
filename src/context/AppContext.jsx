import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Mock initial transactions
const initialTransactions = [
  {
    id: 'TRX-101',
    date: '2026-04-06T10:00:00Z',
    description: 'Blackstone Logistics Park Acquisition',
    subtext: 'Wire transfer - Real Estate Portfolio',
    category: 'Capital Expenditure',
    type: 'expense',
    status: 'completed',
    amount: 145000000.00,
    entity: 'Blackstone Group'
  },
  {
    id: 'TRX-102',
    date: '2026-04-05T14:30:00Z',
    description: 'Q1 Dividend Disbursement',
    subtext: 'Direct deposit to LP accounts',
    category: 'Dividends',
    type: 'expense',
    status: 'completed',
    amount: 22000000.00,
    entity: 'Multiple Entities'
  },
  {
    id: 'TRX-103',
    date: '2026-04-04T09:15:00Z',
    description: 'Tech Ventures Seed Fund',
    subtext: 'Capital call funding',
    category: 'Investments',
    type: 'expense',
    status: 'completed',
    amount: 5000000.00,
    entity: 'Tech Ventures LP'
  },
  {
    id: 'TRX-104',
    date: '2026-04-03T16:45:00Z',
    description: 'Kirkland & Ellis Legal Retainer',
    subtext: 'Q2 Corporate Counsel',
    category: 'Legal & Professional',
    type: 'expense',
    status: 'pending',
    amount: 450000.00,
    entity: 'Kirkland & Ellis LLP'
  },
  {
    id: 'TRX-105',
    date: '2026-04-02T11:20:00Z',
    description: 'Treasury Bond Yield Credit',
    subtext: 'Interest payment received',
    category: 'Interest Income',
    type: 'income',
    status: 'completed',
    amount: 1250000.00,
    entity: 'US Treasury'
  },
  {
    id: 'TRX-106',
    date: '2026-04-01T08:00:00Z',
    description: 'Commercial Property Lease Revenue',
    subtext: 'Monthly rent collection - 100 Main St',
    category: 'Revenue',
    type: 'income',
    status: 'completed',
    amount: 850000.00,
    entity: 'Cushman & Wakefield'
  },
  {
    id: 'TRX-107',
    date: '2026-03-30T10:10:00Z',
    description: 'Software Infrastructure Renewal',
    subtext: 'AWS Enterprise Support & Hosting',
    category: 'Operating Expense',
    type: 'expense',
    status: 'completed',
    amount: 320000.00,
    entity: 'Amazon Web Services'
  },
  {
    id: 'TRX-108',
    date: '2026-03-28T13:40:00Z',
    description: 'Private Equity Secondary Sale',
    subtext: 'Liquidation of Series B stake',
    category: 'Asset Sale',
    type: 'income',
    status: 'completed',
    amount: 18500000.00,
    entity: 'Sequoia Capital'
  },
  {
    id: 'TRX-109',
    date: '2026-03-25T15:25:00Z',
    description: 'Executive Bonus Allocation',
    subtext: 'FY2025 Performance Bonuses',
    category: 'Payroll',
    type: 'expense',
    status: 'pending',
    amount: 3400000.00,
    entity: 'Internal Payroll'
  },
  {
    id: 'TRX-110',
    date: '2026-03-24T09:30:00Z',
    description: 'European Real Estate Fund IV',
    subtext: 'Initial commitment draw',
    category: 'Investments',
    type: 'expense',
    status: 'completed',
    amount: 25000000.00,
    entity: 'Apollo Global Management'
  },
  {
    id: 'TRX-111',
    date: '2026-03-22T11:00:00Z',
    description: 'Syndicated Loan Interest Payment',
    subtext: 'Tranche A debt service',
    category: 'Debt Service',
    type: 'expense',
    status: 'completed',
    amount: 1800000.00,
    entity: 'JPMorgan Chase'
  },
  {
    id: 'TRX-112',
    date: '2026-03-20T14:15:00Z',
    description: 'Venture Fund Distributions',
    subtext: 'Returned capital & initial gain',
    category: 'Distributions',
    type: 'income',
    status: 'completed',
    amount: 8750000.00,
    entity: 'Andreessen Horowitz'
  }
];

// Provider component
export const AppProvider = ({ children }) => {
  // Load from localStorage or use defaults
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('archLedger_role') || 'admin';
  });
  
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('archLedger_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('archLedger_theme') || 'light';
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('archLedger_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('archLedger_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('archLedger_theme', theme);
  }, [theme]);
  const [activeTab, setActiveTab] = useState('Overview');
  const [filters, setFilters] = useState({
    dateRange: 'all', // e.g. 'all', 'thisMonth', 'lastMonth'
    type: 'all',      // 'all', 'income', 'expense'
    category: 'all',
    searchQuery: ''
  });

  const value = {
    currentRole,
    setCurrentRole,
    transactions,
    setTransactions,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    theme,
    setTheme,
    isLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
