import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import { useAuth } from './AuthContext';

// Same context + hook name as before, so every existing page keeps working.
const AppContext = createContext();

// Normalize an API transaction into the shape the UI already expects.
// The UI shows `tx.id` as the human reference (e.g. "TRX-101"), so we map
// reference -> id and keep the real database id under dbId for writes.
function normalizeTx(tx) {
  return {
    id: tx.reference || tx.id,
    dbId: tx.id,
    date: tx.date,
    description: tx.description,
    subtext: tx.subtext,
    category: tx.category,
    type: tx.type,
    status: tx.status,
    amount: Number(tx.amount),
    entity: tx.entity,
  };
}

export const AppProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Role now comes from the logged-in user (server-verified), not a dropdown.
  // Lowercased to match existing checks like currentRole === 'admin'.
  const currentRole = user ? user.role.toLowerCase() : 'viewer';

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [theme, setTheme] = useState(() => localStorage.getItem('archLedger_theme') || 'light');
  const [activeTab, setActiveTab] = useState('Overview');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    type: 'all',
    category: 'all',
    searchQuery: '',
  });

  useEffect(() => {
    localStorage.setItem('archLedger_theme', theme);
  }, [theme]);

  // Fetch real transactions from the backend whenever the user is authenticated.
  const refreshTransactions = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await api.listTransactions();
      setTransactions((res.data || []).map(normalizeTx));
    } catch (err) {
      console.error('Failed to load transactions:', err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshTransactions();
    } else {
      setTransactions([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, refreshTransactions]);

  // Create a transaction via the API, then refresh the list.
  const createTransaction = useCallback(
    async (payload) => {
      const created = await api.createTransaction(payload);
      await refreshTransactions();
      return created;
    },
    [refreshTransactions]
  );

  const value = {
    currentRole,
    user,
    transactions,
    setTransactions,
    refreshTransactions,
    createTransaction,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    theme,
    setTheme,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
