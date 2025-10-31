import { PrismaClient } from '../../src/generated/prisma/index.js';

export async function seedCategories(prisma: PrismaClient) {
  console.log('📁 Creating categories...');

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Strategy',
        slug: 'strategy',
        description: 'Games that emphasize strategic thinking and planning',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Party',
        slug: 'party',
        description: 'Social games for larger groups',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Cooperative',
        slug: 'cooperative',
        description: 'Players work together against the game',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Economic',
        slug: 'economic',
        description: 'Resource management and economic systems',
      },
    }),
    prisma.category.create({
      data: {
        name: 'War Game',
        slug: 'war-game',
        description: 'Military conflict and tactical combat',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Family',
        slug: 'family',
        description: 'Games suitable for all ages',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Abstract',
        slug: 'abstract',
        description: 'Pure strategy games with minimal theme',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Thematic',
        slug: 'thematic',
        description: 'Games with strong narrative and immersive themes',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Card Game',
        slug: 'card-game',
        description: 'Games primarily using cards as components',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Puzzle',
        slug: 'puzzle',
        description: 'Games focused on problem-solving challenges',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Adventure',
        slug: 'adventure',
        description: 'Exploration and quest-based games',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Euro Game',
        slug: 'euro-game',
        description: 'European-style games emphasizing mechanics over theme',
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);
  return categories;
}
