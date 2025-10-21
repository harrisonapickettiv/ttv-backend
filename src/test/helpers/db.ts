import { PrismaClient } from '../../generated/prisma-test';
import { execSync } from 'child_process';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';

const prisma = new PrismaClient();

export const testDb = {
  client: prisma,

  async connect() {
    // Remove existing test database to start fresh
    const dbPath = join(process.cwd(), 'prisma', 'test.db');
    const dbJournalPath = join(process.cwd(), 'prisma', 'test.db-journal');

    try {
      if (existsSync(dbPath)) unlinkSync(dbPath);
      if (existsSync(dbJournalPath)) unlinkSync(dbJournalPath);
    } catch (error) {
      console.warn('Could not delete old test database:', error);
    }

    // Create test database schema using db push (faster than migrations for tests)
    const schemaPath = join(process.cwd(), 'prisma', 'schema.test.prisma');
    try {
      execSync(
        `npx prisma db push --schema=${schemaPath} --skip-generate --accept-data-loss`,
        {
          stdio: 'ignore',
          timeout: 10000, // 10 second timeout
        }
      );
    } catch (error) {
      console.error('Failed to create test database schema:', error);
      throw error;
    }

    await prisma.$connect();
  },

  async disconnect() {
    await prisma.$disconnect();
  },

  async clean() {
    // Delete all records in reverse order to respect foreign keys
    try {
      await prisma.orderItem.deleteMany();
      await prisma.order.deleteMany();
      await prisma.cartItem.deleteMany();
      await prisma.cart.deleteMany();
      await prisma.review.deleteMany();
      await prisma.user.deleteMany();
      await prisma.gameCategory.deleteMany();
      await prisma.gameMechanic.deleteMany();
      await prisma.gameDesigner.deleteMany();
      await prisma.game.deleteMany();
      await prisma.publisher.deleteMany();
      await prisma.category.deleteMany();
      await prisma.mechanic.deleteMany();
      await prisma.designer.deleteMany();
    } catch (error) {
      console.error('Error cleaning database:', error);
      throw error;
    }
  },

  // Helper to create test data
  async seed() {
    const publisher = await prisma.publisher.create({
      data: {
        name: 'CMON',
        country: 'United States',
        website: 'https://cmon.com',
      },
    });

    const category = await prisma.category.create({
      data: {
        name: 'Horror',
        slug: 'horror',
        description: 'Spooky and scary games',
      },
    });

    const mechanic = await prisma.mechanic.create({
      data: {
        name: 'Cooperative Play',
        slug: 'cooperative-play',
        description: 'Players work together',
      },
    });

    const designer = await prisma.designer.create({
      data: {
        name: 'Eric Lang',
        bio: 'Renowned board game designer',
      },
    });

    const games = await Promise.all([
      prisma.game.create({
        data: {
          name: 'Zombicide',
          description: 'Cooperative zombie survival game',
          minPlayers: 1,
          maxPlayers: 6,
          playtime: 60,
          price: 89.99,
          stock: 15,
          imageUrl: 'https://example.com/zombicide.jpg',
          publisherId: publisher.id,
        },
      }),
      prisma.game.create({
        data: {
          name: 'Blood Rage',
          description: 'Viking combat and glory',
          minPlayers: 2,
          maxPlayers: 4,
          playtime: 90,
          price: 79.99,
          stock: 8,
          imageUrl: 'https://example.com/blood-rage.jpg',
          publisherId: publisher.id,
        },
      }),
    ]);

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: '$2b$10$qkm.95uRmofElH6nzWXNouVgSv1b/jqp1C83yuHIVcEYN262Ti.Ji', // "password123"
        firstName: 'Test',
        lastName: 'User',
        role: 'CUSTOMER',
      },
    });

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        passwordHash: '$2b$10$qkm.95uRmofElH6nzWXNouVgSv1b/jqp1C83yuHIVcEYN262Ti.Ji', // "password123"
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
      },
    });

    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        gameId: games[0].id,
        rating: 5,
        comment: 'Amazing game!',
      },
    });

    return {
      publisher,
      games,
      category,
      mechanic,
      designer,
      user,
      adminUser,
      cart,
      review,
    };
  },
};
