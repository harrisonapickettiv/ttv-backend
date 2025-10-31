import { PrismaClient } from '../../src/generated/prisma/index.js';

type Game = { id: string };
type User = { id: string };

export async function seedCarts(
  prisma: PrismaClient,
  games: Game[],
  users: User[]
) {
  console.log('🛒 Creating shopping carts...');

  const carts = await Promise.all([
    // Demo Customer cart
    prisma.cart.create({
      data: {
        userId: users[1].id,
        items: {
          create: [
            { gameId: games[1].id, quantity: 1 }, // Scythe
            { gameId: games[6].id, quantity: 2 }, // Ticket to Ride x2
          ],
        },
      },
    }),

    // Sarah Johnson - browsing for a game night
    prisma.cart.create({
      data: {
        userId: users[2].id,
        items: {
          create: [
            { gameId: games[3].id, quantity: 1 }, // Codenames
            { gameId: games[27].id, quantity: 1 }, // Sushi Go
            { gameId: games[34].id, quantity: 1 }, // Dixit
          ],
        },
      },
    }),

    // Michael Chen - building a collection
    prisma.cart.create({
      data: {
        userId: users[3].id,
        items: {
          create: [
            { gameId: games[18].id, quantity: 1 }, // Ark Nova
            { gameId: games[20].id, quantity: 1 }, // Brass Birmingham
          ],
        },
      },
    }),

    // Emily Rodriguez - gift shopping
    prisma.cart.create({
      data: {
        userId: users[4].id,
        items: {
          create: [
            { gameId: games[10].id, quantity: 1 }, // Catan
            { gameId: games[6].id, quantity: 1 }, // Ticket to Ride
            { gameId: games[8].id, quantity: 1 }, // Azul
            { gameId: games[26].id, quantity: 3 }, // Love Letter x3
          ],
        },
      },
    }),

    // David Kim - single item cart
    prisma.cart.create({
      data: {
        userId: users[5].id,
        items: {
          create: [{ gameId: games[11].id, quantity: 1 }], // Terraforming Mars
        },
      },
    }),

    // Jessica Martinez - party games
    prisma.cart.create({
      data: {
        userId: users[6].id,
        items: {
          create: [
            { gameId: games[14].id, quantity: 1 }, // King of Tokyo
            { gameId: games[33].id, quantity: 1 }, // Camel Up
            { gameId: games[30].id, quantity: 1 }, // Coup
          ],
        },
      },
    }),

    // Christopher Lee - heavy games
    prisma.cart.create({
      data: {
        userId: users[9].id,
        items: {
          create: [
            { gameId: games[12].id, quantity: 1 }, // Gloomhaven
            { gameId: games[21].id, quantity: 1 }, // Spirit Island
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${carts.length} shopping carts`);
  return carts;
}
