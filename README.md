# Architectural Ledger - Institutional Finance Dashboard

Architectural Ledger is a highly polished, responsive, and data-rich finance dashboard prototype designed to simulate institutional liquidity and asset management tracking. It offers an intuitive, premium interface featuring dark mode, extensive micro-interactions, responsive constraints, and role-based access control.

## 🚀 Project Overview

The dashboard visualizes capital flows, tracks transaction history across multiple entities, provides deep analytical spending insights, and facilitates team access administration. Built with modern web development standards, it prioritizes visual excellence and user experience, incorporating features such as skeleton loaders, dynamic empty states, and comprehensive responsiveness.

### Key Features
- **Overview Dashboard**: High-level fiscal metrics, interactive net worth area chart, and recent activity summary.
- **Transactions Ledger**: Advanced filterable transaction history with pagination and detailed sliding drawer overlays.
- **Spending Insights**: Deep dive analytics featuring donut charts, grouped bar charts, and operational budget trackers.
- **Team Management**: Role hierarchy administration with mock institutional security restrictions.
- **Role-Based Access Control (RBAC)**: Switch between `Admin`, `Analyst`, and `Viewer` to see UI adjust intelligently (e.g., restricted access to Team Management for non-admins, disabled "Transfer" features for Viewers).
- **Dark Mode Support**: Context-driven theme toggling (Light/Navy Dark Mode) with comprehensive styling adjustments across all charts and UI components.
- **Data Persistence**: Uses `localStorage` to save user preferences, currently active role, theme settings, and simulated transaction states upon refresh.
- **Premium Micro-Interactions**: Smooth page transitions, hover-lift shadow effects on cards, click feedback on buttons, and custom tooltip logic.

## 🛠 Tech Stack

- **React / Vite**: Core framework and development environment.
- **Tailwind CSS**: Styling, typography, responsive design, and CSS micro-interactions.
- **Recharts**: Data visualization for complex area, pie, and bar charts.
- **React Context API**: Global state management (RBAC, Theming, Active Navigation, Transaction Filtering).
- **Lucide-React**: Consistent and crisp vector icons.

##  How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **View in Browser:**
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

## 🎭 Role Switching Instructions

To simulate the dashboard's Role-Based Access Control (RBAC), locate the **Role Switcher Dropdown** in the top-right header navigation bar.

1. **Viewer**: Limited permissions. Action buttons (like "New Transfer") are disabled. Cannot access the Team Management dashboard.
2. **Analyst**: Has read/write visualization. Can initiate mock transfers.
3. **Admin**: Full access. Can modify roles in the "Team Admin" tab and edit raw transaction records.

*Note: Selected roles are stored in `localStorage`, maintaining your mocked authorization state across visits.*

## 📸 Screenshots

*(Replace placeholder links with direct image repository paths)*

### 1. Dashboard Overview
![Overview Dashboard Placeholder](https://via.placeholder.com/1200x800?text=Dashboard+Overview+Screenshot)

### 2. Transaction Ledger with Drawer
![Transactions Ledger Placeholder](https://via.placeholder.com/1200x800?text=Transactions+Ledger+Drawer)

### 3. Spending Insights
![Spending Insights Analytics](https://via.placeholder.com/1200x800?text=Insights+Analytics)

### 4. Dark Mode Variation
![Dark Mode View](https://via.placeholder.com/1200x800?text=Dark+Mode+Variation+-+Navy+Theme)
