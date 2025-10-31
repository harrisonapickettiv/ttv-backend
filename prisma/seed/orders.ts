import { PrismaClient } from '../../src/generated/prisma/index.js';

type Game = { id: string; price: number };
type User = { id: string };

export async function seedOrders(
  prisma: PrismaClient,
  games: Game[],
  users: User[]
) {
  console.log('📦 Creating orders...');

  const orders = await Promise.all([
    // Demo Customer - delivered order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-001',
        status: 'DELIVERED',
        totalAmount: 89.98,
        userId: users[1].id,
        shippingName: 'Demo Customer',
        shippingAddress: '123 Demo Street',
        shippingCity: 'Portland',
        shippingState: 'OR',
        shippingZip: '97201',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[0].id,
              quantity: 1,
              priceAtTime: 64.99,
            },
            {
              gameId: games[3].id,
              quantity: 1,
              priceAtTime: 24.99,
            },
          ],
        },
      },
    }),
    // Demo Customer - processing order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-002',
        status: 'PROCESSING',
        totalAmount: 39.99,
        userId: users[1].id,
        shippingName: 'Demo Customer',
        shippingAddress: '123 Demo Street',
        shippingCity: 'Portland',
        shippingState: 'OR',
        shippingZip: '97201',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[4].id,
              quantity: 1,
              priceAtTime: 39.99,
            },
          ],
        },
      },
    }),

    // Sarah Johnson - delivered large order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-003',
        status: 'DELIVERED',
        totalAmount: 244.97,
        userId: users[2].id,
        shippingName: 'Sarah Johnson',
        shippingAddress: '456 Oak Avenue',
        shippingCity: 'Seattle',
        shippingState: 'WA',
        shippingZip: '98101',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[1].id, // Scythe
              quantity: 1,
              priceAtTime: 89.99,
            },
            {
              gameId: games[6].id, // Ticket to Ride
              quantity: 1,
              priceAtTime: 54.99,
            },
            {
              gameId: games[8].id, // Azul
              quantity: 1,
              priceAtTime: 39.99,
            },
            {
              gameId: games[27].id, // Sushi Go
              quantity: 3,
              priceAtTime: 12.99,
            },
            {
              gameId: games[26].id, // Love Letter
              quantity: 2,
              priceAtTime: 14.99,
            },
          ],
        },
      },
    }),

    // Michael Chen - shipped order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-004',
        status: 'SHIPPED',
        totalAmount: 139.99,
        userId: users[3].id,
        shippingName: 'Michael Chen',
        shippingAddress: '789 Pine Street',
        shippingCity: 'Austin',
        shippingState: 'TX',
        shippingZip: '73301',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[12].id, // Gloomhaven
              quantity: 1,
              priceAtTime: 139.99,
            },
          ],
        },
      },
    }),

    // Emily Rodriguez - delivered
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-005',
        status: 'DELIVERED',
        totalAmount: 104.98,
        userId: users[4].id,
        shippingName: 'Emily Rodriguez',
        shippingAddress: '321 Maple Drive',
        shippingCity: 'Denver',
        shippingState: 'CO',
        shippingZip: '80201',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[0].id, // Wingspan
              quantity: 1,
              priceAtTime: 64.99,
            },
            {
              gameId: games[4].id, // Pandemic
              quantity: 1,
              priceAtTime: 39.99,
            },
          ],
        },
      },
    }),

    // David Kim - processing
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-006',
        status: 'PROCESSING',
        totalAmount: 79.99,
        userId: users[5].id,
        shippingName: 'David Kim',
        shippingAddress: '654 Elm Court',
        shippingCity: 'Boston',
        shippingState: 'MA',
        shippingZip: '02101',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[18].id, // Ark Nova
              quantity: 1,
              priceAtTime: 79.99,
            },
          ],
        },
      },
    }),

    // Jessica Martinez - delivered
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-007',
        status: 'DELIVERED',
        totalAmount: 119.98,
        userId: users[6].id,
        shippingName: 'Jessica Martinez',
        shippingAddress: '987 Birch Lane',
        shippingCity: 'Phoenix',
        shippingState: 'AZ',
        shippingZip: '85001',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[11].id, // Terraforming Mars
              quantity: 1,
              priceAtTime: 69.99,
            },
            {
              gameId: games[7].id, // 7 Wonders
              quantity: 1,
              priceAtTime: 49.99,
            },
          ],
        },
      },
    }),

    // James Wilson - shipped
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-008',
        status: 'SHIPPED',
        totalAmount: 54.99,
        userId: users[7].id,
        shippingName: 'James Wilson',
        shippingAddress: '147 Cedar Road',
        shippingCity: 'Chicago',
        shippingState: 'IL',
        shippingZip: '60601',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[6].id, // Ticket to Ride
              quantity: 1,
              priceAtTime: 54.99,
            },
          ],
        },
      },
    }),

    // Amanda Taylor - delivered
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-009',
        status: 'DELIVERED',
        totalAmount: 159.97,
        userId: users[8].id,
        shippingName: 'Amanda Taylor',
        shippingAddress: '258 Spruce Avenue',
        shippingCity: 'San Francisco',
        shippingState: 'CA',
        shippingZip: '94101',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[2].id, // Viticulture
              quantity: 1,
              priceAtTime: 59.99,
            },
            {
              gameId: games[15].id, // Everdell
              quantity: 1,
              priceAtTime: 59.99,
            },
            {
              gameId: games[8].id, // Azul
              quantity: 1,
              priceAtTime: 39.99,
            },
          ],
        },
      },
    }),

    // Christopher Lee - processing
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-010',
        status: 'PROCESSING',
        totalAmount: 69.99,
        userId: users[9].id,
        shippingName: 'Christopher Lee',
        shippingAddress: '369 Willow Street',
        shippingCity: 'Miami',
        shippingState: 'FL',
        shippingZip: '33101',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[19].id, // Root
              quantity: 1,
              priceAtTime: 69.99,
            },
          ],
        },
      },
    }),

    // Jennifer Anderson - delivered
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-011',
        status: 'DELIVERED',
        totalAmount: 89.98,
        userId: users[10].id,
        shippingName: 'Jennifer Anderson',
        shippingAddress: '741 Aspen Drive',
        shippingCity: 'Atlanta',
        shippingState: 'GA',
        shippingZip: '30301',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[10].id, // Catan
              quantity: 1,
              priceAtTime: 49.99,
            },
            {
              gameId: games[9].id, // Splendor
              quantity: 1,
              priceAtTime: 39.99,
            },
          ],
        },
      },
    }),

    // Robert Thomas - delivered
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-012',
        status: 'DELIVERED',
        totalAmount: 99.98,
        userId: users[11].id,
        shippingName: 'Robert Thomas',
        shippingAddress: '852 Redwood Place',
        shippingCity: 'Minneapolis',
        shippingState: 'MN',
        shippingZip: '55401',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[5].id, // Carcassonne
              quantity: 1,
              priceAtTime: 34.99,
            },
            {
              gameId: games[0].id, // Wingspan
              quantity: 1,
              priceAtTime: 64.99,
            },
          ],
        },
      },
    }),

    // Sarah Johnson - another delivered order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-013',
        status: 'DELIVERED',
        totalAmount: 229.96,
        userId: users[2].id,
        shippingName: 'Sarah Johnson',
        shippingAddress: '456 Oak Avenue',
        shippingCity: 'Seattle',
        shippingState: 'WA',
        shippingZip: '98101',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[21].id, // Spirit Island
              quantity: 1,
              priceAtTime: 79.99,
            },
            {
              gameId: games[25].id, // Twilight Imperium
              quantity: 1,
              priceAtTime: 149.99,
            },
          ],
        },
      },
    }),

    // Michael Chen - cancelled order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-014',
        status: 'CANCELLED',
        totalAmount: 59.99,
        userId: users[3].id,
        shippingName: 'Michael Chen',
        shippingAddress: '789 Pine Street',
        shippingCity: 'Austin',
        shippingState: 'TX',
        shippingZip: '73301',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[2].id, // Viticulture
              quantity: 1,
              priceAtTime: 59.99,
            },
          ],
        },
      },
    }),

    // Emily Rodriguez - shipped order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-015',
        status: 'SHIPPED',
        totalAmount: 84.98,
        userId: users[4].id,
        shippingName: 'Emily Rodriguez',
        shippingAddress: '321 Maple Drive',
        shippingCity: 'Denver',
        shippingState: 'CO',
        shippingZip: '80201',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[17].id, // Castles of Burgundy
              quantity: 1,
              priceAtTime: 44.99,
            },
            {
              gameId: games[16].id, // Sagrada
              quantity: 1,
              priceAtTime: 39.99,
            },
          ],
        },
      },
    }),

    // David Kim - delivered
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-016',
        status: 'DELIVERED',
        totalAmount: 129.97,
        userId: users[5].id,
        shippingName: 'David Kim',
        shippingAddress: '654 Elm Court',
        shippingCity: 'Boston',
        shippingState: 'MA',
        shippingZip: '02101',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[1].id, // Scythe
              quantity: 1,
              priceAtTime: 89.99,
            },
            {
              gameId: games[8].id, // Azul
              quantity: 1,
              priceAtTime: 39.99,
            },
          ],
        },
      },
    }),

    // Jessica Martinez - pending order
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-017',
        status: 'PENDING',
        totalAmount: 24.99,
        userId: users[6].id,
        shippingName: 'Jessica Martinez',
        shippingAddress: '987 Birch Lane',
        shippingCity: 'Phoenix',
        shippingState: 'AZ',
        shippingZip: '85001',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[3].id, // Codenames
              quantity: 1,
              priceAtTime: 24.99,
            },
          ],
        },
      },
    }),

    // Amanda Taylor - processing
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-018',
        status: 'PROCESSING',
        totalAmount: 69.99,
        userId: users[8].id,
        shippingName: 'Amanda Taylor',
        shippingAddress: '258 Spruce Avenue',
        shippingCity: 'San Francisco',
        shippingState: 'CA',
        shippingZip: '94101',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[24].id, // Pandemic Legacy
              quantity: 1,
              priceAtTime: 69.99,
            },
          ],
        },
      },
    }),

    // Jennifer Anderson - delivered
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-019',
        status: 'DELIVERED',
        totalAmount: 124.98,
        userId: users[10].id,
        shippingName: 'Jennifer Anderson',
        shippingAddress: '741 Aspen Drive',
        shippingCity: 'Atlanta',
        shippingState: 'GA',
        shippingZip: '30301',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[13].id, // Dominion
              quantity: 1,
              priceAtTime: 44.99,
            },
            {
              gameId: games[21].id, // Spirit Island
              quantity: 1,
              priceAtTime: 79.99,
            },
          ],
        },
      },
    }),

    // Robert Thomas - shipped
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-020',
        status: 'SHIPPED',
        totalAmount: 119.98,
        userId: users[11].id,
        shippingName: 'Robert Thomas',
        shippingAddress: '852 Redwood Place',
        shippingCity: 'Minneapolis',
        shippingState: 'MN',
        shippingZip: '55401',
        shippingCountry: 'USA',
        items: {
          create: [
            {
              gameId: games[20].id, // Brass Birmingham
              quantity: 1,
              priceAtTime: 84.99,
            },
            {
              gameId: games[5].id, // Carcassonne
              quantity: 1,
              priceAtTime: 34.99,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${orders.length} orders`);
  return orders;
}
