## Overview

Architectural Ledger is a frontend-only finance dashboard built as part of a UI engineering assignment. It simulates an institutional finance management platform where users can monitor balances, explore transactions, analyze spending patterns, and manage team access — all gated by a role-based access control (RBAC) system simulated entirely on the frontend.

The project focuses on clean component architecture, intuitive UX, and meaningful data visualization — without any backend dependency.

---

## Live Demo

🔗 **[View Live →]([https://your-deployment-url.vercel.app](https://financedashboardd-f4r3lxrl6-anushkagupta3005s-projects.vercel.app/))**

> Switch between roles using the role selector in the top header to see how the UI adapts in real time.

---

## Screenshots

| Overview | Transactions |
|----------|-------------|
| ![Overview](./screenshots/overview.png) | ![Transactions](./screenshots/transactions.png) |

| Insights | Team Admin |
|----------|-----------|
| ![Insights](C:\Users\Lenovo\OneDrive\Pictures\Screenshots\Screenshot 2026-04-06 214911.png) | ![Team](./screenshots/team.png) |

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 | Component model, hooks, Context API |
| Styling | Tailwind CSS | Utility-first, no style conflicts |
| Charts | Recharts | React-native API, no DOM side effects |
| State | Context API + useReducer | Scope doesn't justify Redux overhead |
| Persistence | localStorage | Survives page refresh for demo continuity |
| Tooling | Vite | Fast dev server, optimized builds |
| Language | JavaScript (ES2022) | Assignment scope; TypeScript-ready structure |

---

## Features

### Core

- **Dashboard Overview** — Summary cards for Total Balance, Monthly Income, and Monthly Expenses with trend indicators
- **Cash Flow Chart** — Smooth area chart with 1M / 6M / 1Y time range tabs (Recharts)
- **Quick Actions Panel** — New Transfer, Pay Bill, Request Money (role-gated visibility)
- **Recent Activity Feed** — Last 5 transactions with category badges and color-coded amounts

### Transactions

- Full transaction list with 12+ mock institutional finance entries
- Filter by date range, transaction type (income/expense), and category
- Client-side search across description and entity fields
- Sortable columns (date, amount)
- Pagination with "Showing X of Y" count
- Monthly Cash Velocity summary card at the bottom
- **Admin only:** Export CSV and PDF Report buttons
- Empty state UI when filters return no results

### Insights

- Spending by Category — interactive donut chart with legend
- Inflow vs. Outflow — grouped bar chart by month
- Net Profit Margin indicator with over/under target badge
- Top Institutional Merchants table (merchant, sector, volume, total spent)
- Savings Efficacy dark card with progress toward capital retention goal
- Budget utilization cards — Operational, Development, Reserve Contingency

### Team Admin

- Role Hierarchy panel — Admin, Analyst, Viewer with permission descriptions
- Authorized Personnel table — avatar, name, email, role badge, last active, actions
- Edit Role modal — Admin can change any member's role
- 2FA Compliance progress bar
- Seat Usage card — 14 / 20 occupied
- Compliance note with audit trail link
- **Access restricted** message for Viewer and Analyst roles

### UX & Polish

- Skeleton loaders on initial render (800ms simulated delay)
- Smooth fade transitions between pages
- Hover lift effect on cards
- Button press scale micro-interaction
- Fully responsive — sidebar collapses on tablet, drawer on mobile
- Empty state illustrations for no-data scenarios
- Dark mode toggle (persists in localStorage)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/architectural-ledger.git

# 2. Navigate into the project
cd architectural-ledger

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
architectural-ledger/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx          # Nav links, logo, settings
│   │   │   ├── TopBar.jsx           # Search, role switcher, user avatar
│   │   │   └── Layout.jsx           # Shell wrapper
│   │   ├── overview/
│   │   │   ├── SummaryCards.jsx     # Balance, Income, Expenses
│   │   │   ├── CashFlowChart.jsx    # Area chart with time tabs
│   │   │   ├── QuickActions.jsx     # Transfer, Pay Bill, Request
│   │   │   └── RecentActivity.jsx   # Last 5 transactions table
│   │   ├── transactions/
│   │   │   ├── FilterBar.jsx        # Date, type, category dropdowns
│   │   │   ├── TransactionTable.jsx # Main list with pagination
│   │   │   ├── TransactionRow.jsx   # Single row component
│   │   │   ├── CashVelocity.jsx     # Bottom summary card
│   │   │   └── EmptyState.jsx       # No results UI
│   │   ├── insights/
│   │   │   ├── SpendingDonut.jsx    # Category breakdown chart
│   │   │   ├── InflowOutflow.jsx    # Bar chart comparison
│   │   │   ├── MerchantsTable.jsx   # Top merchants list
│   │   │   └── SavingsEfficacy.jsx  # Dark retention card
│   │   ├── team/
│   │   │   ├── RoleHierarchy.jsx    # Admin/Analyst/Viewer cards
│   │   │   ├── PersonnelTable.jsx   # Members list
│   │   │   ├── EditRoleModal.jsx    # Role change dialog
│   │   │   └── SeatUsage.jsx        # Seat count card
│   │   └── shared/
│   │       ├── Badge.jsx            # Category and role pills
│   │       ├── SkeletonLoader.jsx   # Loading placeholders
│   │       └── RoleGuard.jsx        # Access restriction wrapper
│   ├── context/
│   │   ├── RoleContext.jsx          # Current role + switcher
│   │   └── TransactionContext.jsx   # Transactions, filters, dispatch
│   ├── data/
│   │   └── mockData.js              # All static mock data
│   ├── hooks/
│   │   ├── useFilteredTransactions.js
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Overview.jsx
│   │   ├── Transactions.jsx
│   │   ├── Insights.jsx
│   │   └── TeamAdmin.jsx
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── exportCSV.js
│   │   └── dateHelpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Role-Based Access

Roles are simulated entirely on the frontend. Switch roles using the **dropdown in the top header bar**.

| Feature | Viewer | Analyst | Admin |
|---|:---:|:---:|:---:|
| View Overview | ✅ | ✅ | ✅ |
| View Transactions | ✅ | ✅ | ✅ |
| Filter & Search | ✅ | ✅ | ✅ |
| View Insights | ✅ | ✅ | ✅ |
| New Transfer button | ❌ | ✅ | ✅ |
| Export CSV / PDF | ❌ | ❌ | ✅ |
| Add Transaction | ❌ | ❌ | ✅ |
| Edit Transaction | ❌ | ❌ | ✅ |
| Team Admin page | ❌ | ❌ | ✅ |
| Edit Member Roles | ❌ | ❌ | ✅ |

> **Security Note:** This RBAC is UI-only and not secure. It is intended solely for frontend evaluation and demonstration purposes. A production system would validate roles via authenticated API tokens.

---

## State Management

Two separate React Contexts prevent unnecessary re-renders from unrelated state changes.

### RoleContext
```js
{
  currentRole: "admin" | "analyst" | "viewer",
  setRole: (role) => void
}
```

### TransactionContext
```js
{
  transactions: Transaction[],
  filters: {
    dateRange: "7D" | "30D" | "90D" | "all",
    type: "all" | "income" | "expense",
    category: string,
    searchQuery: string
  },
  dispatch: (action) => void
}
```

Actions: `SET_FILTER`, `ADD_TRANSACTION`, `EDIT_TRANSACTION`, `DELETE_TRANSACTION`, `RESET`

Both contexts persist to **localStorage** and rehydrate on page load.

---

## Technical Decisions

| Decision | Chosen | Why |
|---|---|---|
| Framework | React 18 | Composability, ecosystem, Context fits RBAC cleanly |
| Styling | Tailwind CSS | No style drift, rapid layout, purged in production |
| Charts | Recharts | React-native, no imperative DOM, composable API |
| State | Context + useReducer | State surface too small to justify Redux/Zustand |
| Data | Static mock JSON | Keeps focus on UI; no network variables in evaluation |
| Persistence | localStorage | Demo continuity across refreshes |
| Build | Vite | Instant HMR, faster than CRA |
| Responsiveness | Tailwind breakpoints | Full control; MUI Grid would require heavy overrides |

---

## Known Limitations

- **RBAC is frontend-only** — roles can be switched by any user; not production-safe
- **No real API** — all data is static; pagination does not fetch new pages
- **Charts are not real-time** — data does not update dynamically
- **No form validation** — the Add/Edit transaction modal has minimal validation
- **localStorage only** — data resets if browser storage is cleared

---

## Future Improvements

- [ ] TypeScript migration for full type safety
- [ ] React Query for mock API integration (MSW)
- [ ] Animated chart transitions on time range switch
- [ ] Advanced multi-field filtering with URL query params
- [ ] Real export to CSV using Papa Parse
- [ ] Storybook component documentation
- [ ] Cypress end-to-end tests for role switching flows
- [ ] Internationalization (i18n) for currency and date formatting

---

## Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## License

This project was built as part of a frontend engineering assignment and is intended for evaluation purposes only.

---

<p align="center">Built with React · Tailwind CSS · Recharts</p>
[README.md](https://github.com/user-attachments/files/26513632/README.md)
om/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
