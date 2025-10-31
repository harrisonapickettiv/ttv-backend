import { PrismaClient } from '../../src/generated/prisma/index.js';

export async function seedPublishers(prisma: PrismaClient) {
  console.log('📚 Creating publishers...');

  const publishers = await Promise.all([
    prisma.publisher.create({
      data: {
        name: 'Stonemaier Games',
        country: 'USA',
        website: 'https://stonemaiergames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Czech Games Edition',
        country: 'Czech Republic',
        website: 'https://czechgames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Fantasy Flight Games',
        country: 'USA',
        website: 'https://www.fantasyflightgames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Z-Man Games',
        country: 'USA',
        website: 'https://www.zmangames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Days of Wonder',
        country: 'USA',
        website: 'https://www.daysofwonder.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Repos Production',
        country: 'Belgium',
        website: 'https://www.rprod.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Ravensburger',
        country: 'Germany',
        website: 'https://www.ravensburger.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Rio Grande Games',
        country: 'USA',
        website: 'https://www.riograndegames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Asmodee',
        country: 'France',
        website: 'https://www.asmodee.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Lookout Games',
        country: 'Germany',
        website: 'https://lookout-spiele.de',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Plaid Hat Games',
        country: 'USA',
        website: 'https://www.plaidhatgames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'GMT Games',
        country: 'USA',
        website: 'https://www.gmtgames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Stronghold Games',
        country: 'USA',
        website: 'https://www.strongholdgames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Pandasaurus Games',
        country: 'USA',
        website: 'https://pandasaurusgames.com',
      },
    }),
    prisma.publisher.create({
      data: {
        name: 'Leder Games',
        country: 'USA',
        website: 'https://ledergames.com',
      },
    }),
  ]);

  console.log(`✅ Created ${publishers.length} publishers`);
  return publishers;
}
