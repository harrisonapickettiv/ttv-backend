import { PrismaClient } from '../src/generated/prisma/index.js';
import { seedCategories } from './seed/categories.js';
import { seedMechanics } from './seed/mechanics.js';
import { seedDesigners } from './seed/designers.js';
import { seedPublishers } from './seed/publishers.js';
import { seedGames } from './seed/games.js';
import { seedGameRelations } from './seed/gameRelations.js';
import { seedUsers } from './seed/users.js';
import { seedReviews } from './seed/reviews.js';
import { seedOrders } from './seed/orders.js';
import { seedCarts } from './seed/carts.js';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log('🧹 Cleaning database...');

  // Delete in correct order due to foreign key constraints
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.gameCategory.deleteMany();
  await prisma.gameMechanic.deleteMany();
  await prisma.gameDesigner.deleteMany();
  await prisma.category.deleteMany();
  await prisma.mechanic.deleteMany();
  await prisma.designer.deleteMany();
  await prisma.game.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleaned');
}

async function main() {
  console.log('🌱 Starting seed...');
  console.log('');

  // Clean database
  await cleanDatabase();
  console.log('');

  // Seed in correct order (respecting foreign key constraints)
  const categories = await seedCategories(prisma);
  console.log('');

  const mechanics = await seedMechanics(prisma);
  console.log('');

  const designers = await seedDesigners(prisma);
  console.log('');

  const publishers = await seedPublishers(prisma);
  console.log('');

  const games = await seedGames(prisma, publishers);
  console.log('');

  await seedGameRelations(prisma, games, categories, mechanics, designers);
  console.log('');

  const users = await seedUsers(prisma);
  console.log('');

  const reviews = await seedReviews(prisma, games, users);
  console.log('');

  const orders = await seedOrders(prisma, games, users);
  console.log('');

  const carts = await seedCarts(prisma, games, users);
  console.log('');

  // Print summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Seed Summary:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   📁 Categories:  ${categories.length}`);
  console.log(`   ⚙️  Mechanics:   ${mechanics.length}`);
  console.log(`   👨‍🎨 Designers:   ${designers.length}`);
  console.log(`   📚 Publishers:  ${publishers.length}`);
  console.log(`   🎲 Games:       ${games.length}`);
  console.log(`   👤 Users:       ${users.length} (2 demo accounts + ${users.length - 2} customers)`);
  console.log(`   ⭐ Reviews:     ${reviews.length}`);
  console.log(`   📦 Orders:      ${orders.length}`);
  console.log(`   🛒 Carts:       ${carts.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('✨ Seed completed successfully!');
  console.log('');
  console.log('🔗 Demo Accounts:');
  console.log('   Admin:    demo.admin@tabletopvault.com / demo123');
  console.log('   Customer: demo.customer@tabletopvault.com / demo123');
  console.log('');
}

main()
  .catch((e) => {
    console.error('');
    console.error('❌ Seed failed:');
    console.error(e);
    console.error('');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
