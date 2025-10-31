import { PrismaClient } from '../../src/generated/prisma/index.js';

export async function seedMechanics(prisma: PrismaClient) {
  console.log('⚙️  Creating mechanics...');

  const mechanics = await Promise.all([
    prisma.mechanic.create({
      data: {
        name: 'Worker Placement',
        slug: 'worker-placement',
        description: 'Players place workers to take actions',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Card Drafting',
        slug: 'card-drafting',
        description: 'Players select cards from a shared pool',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Engine Building',
        slug: 'engine-building',
        description: 'Create combinations that generate resources or points',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Area Control',
        slug: 'area-control',
        description: 'Control regions on the board',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Deck Building',
        slug: 'deck-building',
        description: 'Build your deck during the game',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Tile Placement',
        slug: 'tile-placement',
        description: 'Place tiles to build the game board',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Pattern Building',
        slug: 'pattern-building',
        description: 'Create patterns for scoring',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Dice Rolling',
        slug: 'dice-rolling',
        description: 'Use dice to determine actions or outcomes',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Hand Management',
        slug: 'hand-management',
        description: 'Optimize the use of cards in your hand',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Set Collection',
        slug: 'set-collection',
        description: 'Collect sets of items for points or abilities',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Auction/Bidding',
        slug: 'auction-bidding',
        description: 'Bid against other players for resources',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Route Building',
        slug: 'route-building',
        description: 'Create paths or networks on the board',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Variable Player Powers',
        slug: 'variable-player-powers',
        description: 'Each player has unique abilities',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Action Points',
        slug: 'action-points',
        description: 'Spend points to take various actions',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Network Building',
        slug: 'network-building',
        description: 'Build interconnected networks for scoring',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Push Your Luck',
        slug: 'push-your-luck',
        description: 'Decide when to stop before losing progress',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Memory',
        slug: 'memory',
        description: 'Remember locations or information',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Trading',
        slug: 'trading',
        description: 'Negotiate and trade with other players',
      },
    }),
  ]);

  console.log(`✅ Created ${mechanics.length} mechanics`);
  return mechanics;
}
