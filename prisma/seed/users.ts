import { PrismaClient } from '../../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

// Helper to create password hash (using bcrypt to match auth resolver)
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function seedUsers(prisma: PrismaClient) {
  console.log('👤 Creating users...');

  // Demo Account Credentials
  // 🔗 KEEP IN SYNC WITH FRONTEND: ttv-frontend/src/config/demoAccounts.ts
  // These credentials are hardcoded in both repos and must be manually synchronized
  const DEMO_ADMIN_EMAIL = 'demo.admin@tabletopvault.com';
  const DEMO_ADMIN_PASSWORD = 'demo123';
  const DEMO_CUSTOMER_EMAIL = 'demo.customer@tabletopvault.com';
  const DEMO_CUSTOMER_PASSWORD = 'demo123';

  const users = await Promise.all([
    // Demo Admin Account - for testing admin features
    prisma.user.create({
      data: {
        email: DEMO_ADMIN_EMAIL,
        passwordHash: await hashPassword(DEMO_ADMIN_PASSWORD),
        firstName: 'Demo',
        lastName: 'Admin',
        role: 'ADMIN',
      },
    }),
    // Demo Customer Account - for testing customer features
    prisma.user.create({
      data: {
        email: DEMO_CUSTOMER_EMAIL,
        passwordHash: await hashPassword(DEMO_CUSTOMER_PASSWORD),
        firstName: 'Demo',
        lastName: 'Customer',
        role: 'CUSTOMER',
      },
    }),
    // Regular customers
    prisma.user.create({
      data: {
        email: 'sarah.johnson@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'michael.chen@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Michael',
        lastName: 'Chen',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emily.rodriguez@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Emily',
        lastName: 'Rodriguez',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'david.kim@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'David',
        lastName: 'Kim',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jessica.martinez@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Jessica',
        lastName: 'Martinez',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'james.wilson@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'James',
        lastName: 'Wilson',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'amanda.taylor@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Amanda',
        lastName: 'Taylor',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'christopher.lee@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Christopher',
        lastName: 'Lee',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jennifer.anderson@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Jennifer',
        lastName: 'Anderson',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'robert.thomas@email.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Robert',
        lastName: 'Thomas',
        role: 'CUSTOMER',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users (2 demo accounts + ${users.length - 2} customers)`);
  return users;
}
