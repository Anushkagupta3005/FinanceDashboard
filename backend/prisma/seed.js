import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Original mock transactions from the frontend AppContext, now the seed data.
const seedTransactions = [
  { reference: 'TRX-101', date: '2026-04-06T10:00:00Z', description: 'Blackstone Logistics Park Acquisition', subtext: 'Wire transfer - Real Estate Portfolio', category: 'Capital Expenditure', type: 'expense', status: 'completed', amount: 145000000.0, entity: 'Blackstone Group' },
  { reference: 'TRX-102', date: '2026-04-05T14:30:00Z', description: 'Q1 Dividend Disbursement', subtext: 'Direct deposit to LP accounts', category: 'Dividends', type: 'expense', status: 'completed', amount: 22000000.0, entity: 'Multiple Entities' },
  { reference: 'TRX-103', date: '2026-04-04T09:15:00Z', description: 'Tech Ventures Seed Fund', subtext: 'Capital call funding', category: 'Investments', type: 'expense', status: 'completed', amount: 5000000.0, entity: 'Tech Ventures LP' },
  { reference: 'TRX-104', date: '2026-04-03T16:45:00Z', description: 'Kirkland & Ellis Legal Retainer', subtext: 'Q2 Corporate Counsel', category: 'Legal & Professional', type: 'expense', status: 'pending', amount: 450000.0, entity: 'Kirkland & Ellis LLP' },
  { reference: 'TRX-105', date: '2026-04-02T11:20:00Z', description: 'Treasury Bond Yield Credit', subtext: 'Interest payment received', category: 'Interest Income', type: 'income', status: 'completed', amount: 1250000.0, entity: 'US Treasury' },
  { reference: 'TRX-106', date: '2026-04-01T08:00:00Z', description: 'Commercial Property Lease Revenue', subtext: 'Monthly rent collection - 100 Main St', category: 'Revenue', type: 'income', status: 'completed', amount: 850000.0, entity: 'Cushman & Wakefield' },
  { reference: 'TRX-107', date: '2026-03-30T10:10:00Z', description: 'Software Infrastructure Renewal', subtext: 'AWS Enterprise Support & Hosting', category: 'Operating Expense', type: 'expense', status: 'completed', amount: 320000.0, entity: 'Amazon Web Services' },
  { reference: 'TRX-108', date: '2026-03-28T13:40:00Z', description: 'Private Equity Secondary Sale', subtext: 'Liquidation of Series B stake', category: 'Asset Sale', type: 'income', status: 'completed', amount: 18500000.0, entity: 'Sequoia Capital' },
  { reference: 'TRX-109', date: '2026-03-25T15:25:00Z', description: 'Executive Bonus Allocation', subtext: 'FY2025 Performance Bonuses', category: 'Payroll', type: 'expense', status: 'pending', amount: 3400000.0, entity: 'Internal Payroll' },
  { reference: 'TRX-110', date: '2026-03-24T09:30:00Z', description: 'European Real Estate Fund IV', subtext: 'Initial commitment draw', category: 'Investments', type: 'expense', status: 'completed', amount: 25000000.0, entity: 'Apollo Global Management' },
  { reference: 'TRX-111', date: '2026-03-22T11:00:00Z', description: 'Syndicated Loan Interest Payment', subtext: 'Tranche A debt service', category: 'Debt Service', type: 'expense', status: 'completed', amount: 1800000.0, entity: 'JPMorgan Chase' },
  { reference: 'TRX-112', date: '2026-03-20T14:15:00Z', description: 'Venture Fund Distributions', subtext: 'Returned capital & initial gain', category: 'Distributions', type: 'income', status: 'completed', amount: 8750000.0, entity: 'Andreessen Horowitz' },
];

// Demo accounts — one per role so RBAC can be tested immediately.
const demoUsers = [
  { name: 'Eleanor Pena', email: 'admin@ledger.dev', password: 'admin1234', role: 'ADMIN', avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
  { name: 'Marcus Analyst', email: 'analyst@ledger.dev', password: 'analyst1234', role: 'ANALYST', avatarUrl: 'https://i.pravatar.cc/150?u=analyst' },
  { name: 'Vera Viewer', email: 'viewer@ledger.dev', password: 'viewer1234', role: 'VIEWER', avatarUrl: 'https://i.pravatar.cc/150?u=viewer' },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clean slate (safe for a demo/dev DB).
  await prisma.auditLog.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const createdUsers = {};
  for (const u of demoUsers) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.create({
      data: { name: u.name, email: u.email, passwordHash, role: u.role, avatarUrl: u.avatarUrl },
    });
    createdUsers[u.role] = user;
    console.log(`  ✓ user ${u.email} (${u.role}) — password: ${u.password}`);
  }
  const adminId = createdUsers.ADMIN.id;

  // Categories (unique names from the seed transactions)
  const categoryNames = [...new Set(seedTransactions.map((t) => t.category))];
  const categoryByName = {};
  for (const name of categoryNames) {
    const cat = await prisma.category.create({ data: { name } });
    categoryByName[name] = cat.id;
  }
  console.log(`  ✓ ${categoryNames.length} categories`);

  // Transactions (attributed to the admin as creator)
  for (const t of seedTransactions) {
    await prisma.transaction.create({
      data: {
        reference: t.reference,
        date: new Date(t.date),
        description: t.description,
        subtext: t.subtext,
        type: t.type,
        status: t.status,
        amount: t.amount,
        entity: t.entity,
        categoryId: categoryByName[t.category],
        createdById: adminId,
      },
    });
  }
  console.log(`  ✓ ${seedTransactions.length} transactions`);

  await prisma.auditLog.create({
    data: { action: 'DB_SEEDED', detail: `${seedTransactions.length} transactions`, userId: adminId },
  });

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
