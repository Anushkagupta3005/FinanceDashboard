// Central API client for the finance dashboard backend.
// Handles the base URL, attaches the JWT, and parses errors consistently.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const TOKEN_KEY = 'archLedger_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Core request helper. Throws an Error with a readable .message on failure.
async function request(path, { method = 'GET', body, auth = true, raw = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const token = tokenStore.get();
  if (auth && token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // For file downloads (CSV) we want the raw response.
  if (raw) {
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return res;
  }

  // 204 No Content (e.g. delete)
  if (res.status === 204) return null;

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg = data?.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  // ---- Auth ----
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: { email, password }, auth: false }),
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: { name, email, password }, auth: false }),
  me: () => request('/auth/me'),

  // ---- Transactions ----
  // Load a large page so the existing client-side filtering/pagination keeps working.
  listTransactions: (params = {}) => {
    const q = new URLSearchParams({ pageSize: '100', sort: 'date', order: 'desc', ...params });
    return request(`/transactions?${q.toString()}`);
  },
  createTransaction: (payload) =>
    request('/transactions', { method: 'POST', body: payload }),
  updateTransaction: (id, payload) =>
    request(`/transactions/${id}`, { method: 'PUT', body: payload }),
  deleteTransaction: (id) =>
    request(`/transactions/${id}`, { method: 'DELETE' }),
  exportCsvResponse: () => request('/transactions/export/csv', { raw: true }),

  // ---- Insights ----
  insightsSummary: () => request('/insights/summary'),
  insightsByCategory: () => request('/insights/by-category'),
  insightsTopEntities: () => request('/insights/top-entities'),

  // ---- Users / admin ----
  listUsers: () => request('/users'),
  changeRole: (id, role) => request(`/users/${id}/role`, { method: 'PATCH', body: { role } }),
  auditLog: () => request('/audit-log'),
};

export default api;
