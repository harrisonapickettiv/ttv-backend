import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Helper to create password hash (using bcrypt to match auth resolver)
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (in correct order due to foreign keys)
  console.log('🧹 Cleaning database...');
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

  // Create Categories
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
  ]);
  console.log(`✅ Created ${categories.length} categories`);

  // Create Mechanics
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
  ]);
  console.log(`✅ Created ${mechanics.length} mechanics`);

  // Create Designers
  console.log('👨‍🎨 Creating designers...');
  const designers = await Promise.all([
    prisma.designer.create({
      data: {
        name: 'Elizabeth Hargrave',
        bio: 'Known for nature-themed games like Wingspan',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Jamey Stegmaier',
        bio: 'Founder of Stonemaier Games, designer of Scythe and Viticulture',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Vlaada Chvátil',
        bio: 'Czech designer known for innovative mechanisms',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Matt Leacock',
        bio: 'Designer of cooperative games including Pandemic',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Klaus-Jürgen Wrede',
        bio: 'German designer, creator of Carcassonne',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Alan R. Moon',
        bio: 'Designer of Ticket to Ride and other railway games',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Antoine Bauza',
        bio: 'French designer known for 7 Wonders',
      },
    }),
  ]);
  console.log(`✅ Created ${designers.length} designers`);

  // Create Publishers
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
  ]);
  console.log(`✅ Created ${publishers.length} publishers`);

  // Create Games
  console.log('🎲 Creating games...');
  const games = await Promise.all([
    // Wingspan
    prisma.game.create({
      data: {
        name: 'Wingspan',
        description:
          'You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves.',
        minPlayers: 1,
        maxPlayers: 5,
        playtime: 70,
        price: 64.99,
        stock: 25,
        imageUrl:
          'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg',
        publisherId: publishers[0].id,
      },
    }),
    // Scythe
    prisma.game.create({
      data: {
        name: 'Scythe',
        description:
          'It is a time of unrest in 1920s Europa. The ashes from the first great war still darken the snow.',
        minPlayers: 1,
        maxPlayers: 5,
        playtime: 115,
        price: 89.99,
        stock: 15,
        imageUrl:
          'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage/img/rMNa0k05IDFVxUKvKk5ejR9oI0w=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3163924.jpg',
        publisherId: publishers[0].id,
      },
    }),
    // Viticulture
    prisma.game.create({
      data: {
        name: 'Viticulture Essential Edition',
        description:
          'In Viticulture, the players find themselves in the roles of people in rustic, pre-modern Tuscany who have inherited meager vineyards.',
        minPlayers: 1,
        maxPlayers: 6,
        playtime: 90,
        price: 59.99,
        stock: 20,
        imageUrl:
          'https://cf.geekdo-images.com/l_PRza2exNemFY66e5r2Yg__imagepage/img/VguO_LYQF2iUlU1uMfsSFOCbyXc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2649952.jpg',
        publisherId: publishers[0].id,
      },
    }),
    // Codenames
    prisma.game.create({
      data: {
        name: 'Codenames',
        description:
          'Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their codenames.',
        minPlayers: 2,
        maxPlayers: 8,
        playtime: 15,
        price: 24.99,
        stock: 50,
        imageUrl:
          'https://cf.geekdo-images.com/F_KDEu0GjdClml8N7c8Imw__imagepage/img/rc_Do8f5v41nWEGcwHE1eKAkIfI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2582929.jpg',
        publisherId: publishers[1].id,
      },
    }),
    // Pandemic
    prisma.game.create({
      data: {
        name: 'Pandemic',
        description:
          'In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 45,
        price: 39.99,
        stock: 40,
        imageUrl:
          'https://cf.geekdo-images.com/S3ybV1LAp-8LHs9rDfjP2A__imagepage/img/kIBu-2Ljb_ml5n-S8uIbE6ehGFc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1534148.jpg',
        publisherId: publishers[3].id,
      },
    }),
    // Carcassonne
    prisma.game.create({
      data: {
        name: 'Carcassonne',
        description:
          'Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 35,
        price: 34.99,
        stock: 35,
        imageUrl:
          'https://cf.geekdo-images.com/Z3upN53-fsVPUDimN9SpOA__imagepage/img/sT0kjr-Klona2rygvD8kURJgqdU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2337577.jpg',
        publisherId: publishers[3].id,
      },
    }),
    // Ticket to Ride
    prisma.game.create({
      data: {
        name: 'Ticket to Ride',
        description:
          'With elegantly simple gameplay, Ticket to Ride can be learned in under 15 minutes. Players collect cards of various types of train cars.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 60,
        price: 54.99,
        stock: 45,
        imageUrl:
          'https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__imagepage/img/XmSM8jM5ZS-2FhDxsXeHpQcYieo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic66668.jpg',
        publisherId: publishers[4].id,
      },
    }),
    // 7 Wonders
    prisma.game.create({
      data: {
        name: '7 Wonders',
        description:
          'You are the leader of one of the 7 great cities of the Ancient World. Gather resources, develop commercial routes, and affirm your military supremacy.',
        minPlayers: 2,
        maxPlayers: 7,
        playtime: 30,
        price: 49.99,
        stock: 28,
        imageUrl:
          'https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__imagepage/img/d0VespO3spaKqnX2oyL6vBRW71E=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7149798.jpg',
        publisherId: publishers[5].id,
      },
    }),
  ]);
  console.log(`✅ Created ${games.length} games`);

  // Link Games to Categories
  console.log('🔗 Linking games to categories...');
  await Promise.all([
    // Wingspan: Strategy
    prisma.gameCategory.create({
      data: { gameId: games[0].id, categoryId: categories[0].id },
    }),
    // Scythe: Strategy, War Game
    prisma.gameCategory.create({
      data: { gameId: games[1].id, categoryId: categories[0].id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[1].id, categoryId: categories[4].id },
    }),
    // Viticulture: Strategy, Economic
    prisma.gameCategory.create({
      data: { gameId: games[2].id, categoryId: categories[0].id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[2].id, categoryId: categories[3].id },
    }),
    // Codenames: Party, Family
    prisma.gameCategory.create({
      data: { gameId: games[3].id, categoryId: categories[1].id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[3].id, categoryId: categories[5].id },
    }),
    // Pandemic: Cooperative
    prisma.gameCategory.create({
      data: { gameId: games[4].id, categoryId: categories[2].id },
    }),
    // Carcassonne: Family, Strategy
    prisma.gameCategory.create({
      data: { gameId: games[5].id, categoryId: categories[5].id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[5].id, categoryId: categories[0].id },
    }),
    // Ticket to Ride: Family
    prisma.gameCategory.create({
      data: { gameId: games[6].id, categoryId: categories[5].id },
    }),
    // 7 Wonders: Strategy
    prisma.gameCategory.create({
      data: { gameId: games[7].id, categoryId: categories[0].id },
    }),
  ]);

  // Link Games to Mechanics
  console.log('🔗 Linking games to mechanics...');
  await Promise.all([
    // Wingspan: Card Drafting, Engine Building
    prisma.gameMechanic.create({
      data: { gameId: games[0].id, mechanicId: mechanics[1].id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[0].id, mechanicId: mechanics[2].id },
    }),
    // Scythe: Area Control, Engine Building
    prisma.gameMechanic.create({
      data: { gameId: games[1].id, mechanicId: mechanics[3].id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[1].id, mechanicId: mechanics[2].id },
    }),
    // Viticulture: Worker Placement
    prisma.gameMechanic.create({
      data: { gameId: games[2].id, mechanicId: mechanics[0].id },
    }),
    // Codenames: Pattern Building
    prisma.gameMechanic.create({
      data: { gameId: games[3].id, mechanicId: mechanics[6].id },
    }),
    // Pandemic: Cooperative (no specific mechanic from our list)
    // Carcassonne: Tile Placement
    prisma.gameMechanic.create({
      data: { gameId: games[5].id, mechanicId: mechanics[5].id },
    }),
    // Ticket to Ride: Pattern Building
    prisma.gameMechanic.create({
      data: { gameId: games[6].id, mechanicId: mechanics[6].id },
    }),
    // 7 Wonders: Card Drafting
    prisma.gameMechanic.create({
      data: { gameId: games[7].id, mechanicId: mechanics[1].id },
    }),
  ]);

  // Link Games to Designers
  console.log('🔗 Linking games to designers...');
  await Promise.all([
    // Wingspan: Elizabeth Hargrave
    prisma.gameDesigner.create({
      data: { gameId: games[0].id, designerId: designers[0].id },
    }),
    // Scythe: Jamey Stegmaier
    prisma.gameDesigner.create({
      data: { gameId: games[1].id, designerId: designers[1].id },
    }),
    // Viticulture: Jamey Stegmaier
    prisma.gameDesigner.create({
      data: { gameId: games[2].id, designerId: designers[1].id },
    }),
    // Codenames: Vlaada Chvátil
    prisma.gameDesigner.create({
      data: { gameId: games[3].id, designerId: designers[2].id },
    }),
    // Pandemic: Matt Leacock
    prisma.gameDesigner.create({
      data: { gameId: games[4].id, designerId: designers[3].id },
    }),
    // Carcassonne: Klaus-Jürgen Wrede
    prisma.gameDesigner.create({
      data: { gameId: games[5].id, designerId: designers[4].id },
    }),
    // Ticket to Ride: Alan R. Moon
    prisma.gameDesigner.create({
      data: { gameId: games[6].id, designerId: designers[5].id },
    }),
    // 7 Wonders: Antoine Bauza
    prisma.gameDesigner.create({
      data: { gameId: games[7].id, designerId: designers[6].id },
    }),
  ]);

  // Create Users
  console.log('👤 Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@tabletopvault.com',
        passwordHash: await hashPassword('admin123'),
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Alice',
        lastName: 'Johnson',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Bob',
        lastName: 'Smith',
        role: 'CUSTOMER',
      },
    }),
  ]);
  console.log(`✅ Created ${users.length} users`);

  // Create Reviews
  console.log('⭐ Creating reviews...');
  const reviews = await Promise.all([
    // Alice reviews Wingspan
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Beautiful game!',
        comment: 'Amazing theme and gameplay. My favorite engine builder.',
        userId: users[1].id,
        gameId: games[0].id,
      },
    }),
    // Bob reviews Wingspan
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Great for families',
        comment: 'Easy to teach and really engaging.',
        userId: users[2].id,
        gameId: games[0].id,
      },
    }),
    // Alice reviews Pandemic
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Best co-op game',
        comment: 'Perfect for game night with friends.',
        userId: users[1].id,
        gameId: games[4].id,
      },
    }),
    // Bob reviews 7 Wonders
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Quick and fun',
        comment: 'Love the card drafting mechanism.',
        userId: users[2].id,
        gameId: games[7].id,
      },
    }),
  ]);
  console.log(`✅ Created ${reviews.length} reviews`);

  // Create Carts
  console.log('🛒 Creating carts...');
  const aliceCart = await prisma.cart.create({
    data: {
      userId: users[1].id,
      items: {
        create: [
          { gameId: games[1].id, quantity: 1 }, // Scythe
          { gameId: games[6].id, quantity: 2 }, // Ticket to Ride x2
        ],
      },
    },
  });
  console.log(`✅ Created cart for Alice with 2 items`);

  // Create Orders
  console.log('📦 Creating orders...');
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2024-001',
      status: 'DELIVERED',
      totalAmount: 104.98, // Wingspan + Codenames
      userId: users[1].id,
      shippingName: 'Alice Johnson',
      shippingAddress: '123 Main St',
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
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2024-002',
      status: 'PROCESSING',
      totalAmount: 39.99,
      userId: users[2].id,
      shippingName: 'Bob Smith',
      shippingAddress: '456 Oak Ave',
      shippingCity: 'Seattle',
      shippingState: 'WA',
      shippingZip: '98101',
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
  });
  console.log(`✅ Created 2 orders`);

  console.log('');
  console.log('📊 Seed Summary:');
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Mechanics: ${mechanics.length}`);
  console.log(`   Designers: ${designers.length}`);
  console.log(`   Publishers: ${publishers.length}`);
  console.log(`   Games: ${games.length}`);
  console.log(`   Users: ${users.length}`);
  console.log(`   Reviews: ${reviews.length}`);
  console.log(`   Carts: 1`);
  console.log(`   Orders: 2`);
  console.log('');
  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
