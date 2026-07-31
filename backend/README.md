# Architectural Ledger — Backend API

REST API for the Finance Dashboard: JWT authentication, **server-enforced** role-based
access control, transactions with server-side filtering/pagination, aggregate reporting
endpoints, CSV export, and an audit log.

**Stack:** Node.js · Express · Prisma ORM · PostgreSQL · JWT · bcrypt · Zod

---

## Quick start

```bash
# 1. Install
cd backend
npm install

# 2. Configure environment
cp .env.example .env
#   -> edit DATABASE_URL to point at your Postgres, set a real JWT_SECRET

# 3. Create the database schema
npm run prisma:migrate      # runs the first migration

# 4. Seed demo users + the original mock transactions
npm run seed

# 5. Run it
npm run dev                 # http://localhost:4000
```

Need a Postgres quickly? Either run one with Docker:

```bash
docker run --name ledger-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=finance_dashboard -p 5432:5432 -d postgres:16
```

...or use a free hosted Postgres (Railway, Render, Neon, Supabase) and paste its
connection string into `DATABASE_URL`.

---

## Demo accounts (created by the seed)

| Role    | Email                | Password      | Can do                                    |
| ------- | -------------------- | ------------- | ----------------------------------------- |
| Admin   | admin@ledger.dev     | admin1234     | Everything: create/edit/delete, export, manage roles |
| Analyst | analyst@ledger.dev   | analyst1234   | View + create/edit transactions           |
| Viewer  | viewer@ledger.dev    | viewer1234    | View only                                 |

The role dropdown in the old frontend was cosmetic — now you actually **log in as**
one of these, and the server enforces what each can do.

---

## API reference

Base URL: `http://localhost:4000/api`
Send the token from login/register as `Authorization: Bearer <token>`.

### Auth
| Method | Path             | Access | Description                     |
| ------ | ---------------- | ------ | ------------------------------- |
| POST   | `/auth/register` | Public | Register (defaults to Viewer)   |
| POST   | `/auth/login`    | Public | Log in, returns `{ token, user }` |
| GET    | `/auth/me`       | Auth   | Current user                    |

### Transactions
| Method | Path                       | Access          | Description                          |
| ------ | -------------------------- | --------------- | ------------------------------------ |
| GET    | `/transactions`            | Any role        | List — filters + pagination (below)  |
| GET    | `/transactions/:id`        | Any role        | Single transaction                   |
| POST   | `/transactions`            | Analyst, Admin  | Create                               |
| PUT    | `/transactions/:id`        | Analyst, Admin  | Update                               |
| DELETE | `/transactions/:id`        | Admin           | Delete                               |
| GET    | `/transactions/export/csv` | Admin           | Download filtered CSV                |

**List query params:** `type` (income|expense), `status` (completed|pending),
`category`, `search`, `page`, `pageSize`, `sort` (date|amount), `order` (asc|desc).
Example: `/transactions?type=expense&search=blackstone&page=1&pageSize=7`

### Insights (any role)
| Method | Path                       | Description                          |
| ------ | -------------------------- | ------------------------------------ |
| GET    | `/insights/summary`        | Balance, income, expense, cash flow  |
| GET    | `/insights/by-category`    | Totals grouped by category           |
| GET    | `/insights/top-entities`   | Largest counterparties               |

### Team Admin (Admin only)
| Method | Path                  | Description                    |
| ------ | --------------------- | ------------------------------ |
| GET    | `/users`              | List all users                 |
| PATCH  | `/users/:id/role`     | Change a user's role           |
| GET    | `/audit-log`          | Recent activity feed           |

---

## How RBAC is enforced

Permissions live in `src/routes/index.js` via `requireRole(...)` middleware
(`src/middleware/auth.js`). A Viewer calling `POST /transactions` gets a real
`403` — not a hidden button. Every sensitive action is recorded in the `AuditLog`
table.

---

## Deploying

- **Database + API:** Railway or Render. Set `DATABASE_URL`, `JWT_SECRET`,
  `CORS_ORIGIN` (your Vercel URL), and `NODE_ENV=production`. Build/start:
  `npm install && npm run prisma:deploy && npm run seed` then `npm start`.
- **Frontend:** stays on Vercel; point it at the deployed API base URL.

---

## Project layout

```
backend/
├── prisma/
│   ├── schema.prisma      # User, Category, Transaction, AuditLog
│   └── seed.js            # demo users + original mock transactions
└── src/
    ├── server.js          # Express app
    ├── config/prisma.js   # Prisma client singleton
    ├── middleware/        # auth (JWT + RBAC), error handling
    ├── controllers/       # auth, transactions, insights, users
    ├── routes/index.js    # all routes + permission guards
    └── utils/             # token, helpers (audit, CSV, serialize)
```
