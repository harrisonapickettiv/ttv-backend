import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function verify() {
  console.log('🔍 Verifying seed data...\n');

  const publisherCount = await prisma.publisher.count();
  const gameCount = await prisma.game.count();

  console.log('📊 Database Statistics:');
  console.log(`   Publishers: ${publisherCount}`);
  console.log(`   Games: ${gameCount}\n`);

  if (publisherCount === 0 || gameCount === 0) {
    console.log('⚠️  Database appears empty. Run: npm run prisma:seed\n');
    process.exit(0);
  }

  console.log('📚 Publishers:');
  const publishers = await prisma.publisher.findMany({
    include: {
      _count: {
        select: { games: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  publishers.forEach((publisher) => {
    console.log(
      `   - ${publisher.name} (${publisher.country}) - ${publisher._count.games} games`
    );
  });

  console.log('\n🎲 Games by Price:');
  const games = await prisma.game.findMany({
    include: { publisher: true },
    orderBy: { price: 'asc' },
  });

  games.forEach((game) => {
    console.log(
      `   - ${game.name} - $${game.price.toFixed(2)} (${game.minPlayers}-${game.maxPlayers}p, ${game.playtime}min) - ${game.publisher.name}`
    );
  });

  console.log('\n💰 Price Statistics:');
  const prices = games.map((g) => g.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  console.log(`   Min: $${minPrice.toFixed(2)}`);
  console.log(`   Max: $${maxPrice.toFixed(2)}`);
  console.log(`   Avg: $${avgPrice.toFixed(2)}`);

  console.log('\n📦 Stock Statistics:');
  const stocks = games.map((g) => g.stock);
  const totalStock = stocks.reduce((a, b) => a + b, 0);
  const avgStock = totalStock / stocks.length;
  console.log(`   Total: ${totalStock} units`);
  console.log(`   Avg per game: ${avgStock.toFixed(0)} units`);

  console.log('\n✅ Verification complete!\n');
}

verify()
  .catch((e) => {
    console.error('❌ Verification failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
