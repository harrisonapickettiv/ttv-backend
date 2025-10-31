import { PrismaClient } from '../../src/generated/prisma/index.js';

type Publisher = { id: string; name: string };

export async function seedGames(
  prisma: PrismaClient,
  publishers: Publisher[]
) {
  console.log('🎲 Creating games...');

  const games = await Promise.all([
    // ===== EXISTING GAMES (Keep for continuity) =====
    // Wingspan - Stonemaier
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
          'https://placehold.co/600x400/4A90E2/ffffff?text=Wingspan',
        publisherId: publishers[0].id,
      },
    }),
    // Scythe - Stonemaier
    prisma.game.create({
      data: {
        name: 'Scythe',
        description:
          'It is a time of unrest in 1920s Europa. The ashes from the first great war still darken the snow. Lead your faction to victory, building mechs, working the land, and exploring the mysterious Factory.',
        minPlayers: 1,
        maxPlayers: 5,
        playtime: 115,
        price: 89.99,
        stock: 15,
        imageUrl: 'https://placehold.co/600x400/8B4513/ffffff?text=Scythe',
        publisherId: publishers[0].id,
      },
    }),
    // Viticulture - Stonemaier
    prisma.game.create({
      data: {
        name: 'Viticulture Essential Edition',
        description:
          'In Viticulture, the players find themselves in the roles of people in rustic, pre-modern Tuscany who have inherited meager vineyards. Create the most successful winery in Italy.',
        minPlayers: 1,
        maxPlayers: 6,
        playtime: 90,
        price: 59.99,
        stock: 20,
        imageUrl:
          'https://placehold.co/600x400/722F37/ffffff?text=Viticulture',
        publisherId: publishers[0].id,
      },
    }),
    // Codenames - Czech Games
    prisma.game.create({
      data: {
        name: 'Codenames',
        description:
          'Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their codenames. Give clever one-word clues to help your team identify their agents.',
        minPlayers: 2,
        maxPlayers: 8,
        playtime: 15,
        price: 24.99,
        stock: 50,
        imageUrl:
          'https://placehold.co/600x400/FF6B6B/ffffff?text=Codenames',
        publisherId: publishers[1].id,
      },
    }),
    // Pandemic - Z-Man
    prisma.game.create({
      data: {
        name: 'Pandemic',
        description:
          'In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 45,
        price: 39.99,
        stock: 40,
        imageUrl:
          'https://placehold.co/600x400/2ECC71/ffffff?text=Pandemic',
        publisherId: publishers[3].id,
      },
    }),
    // Carcassonne - Z-Man
    prisma.game.create({
      data: {
        name: 'Carcassonne',
        description:
          'Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it. Build cities, roads, and farms to score points.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 35,
        price: 34.99,
        stock: 35,
        imageUrl:
          'https://placehold.co/600x400/228B22/ffffff?text=Carcassonne',
        publisherId: publishers[3].id,
      },
    }),
    // Ticket to Ride - Days of Wonder
    prisma.game.create({
      data: {
        name: 'Ticket to Ride',
        description:
          'With elegantly simple gameplay, Ticket to Ride can be learned in under 15 minutes. Players collect cards of various types of train cars to claim railway routes connecting cities.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 60,
        price: 54.99,
        stock: 45,
        imageUrl:
          'https://placehold.co/600x400/DC143C/ffffff?text=Ticket+to+Ride',
        publisherId: publishers[4].id,
      },
    }),
    // 7 Wonders - Repos
    prisma.game.create({
      data: {
        name: '7 Wonders',
        description:
          'You are the leader of one of the 7 great cities of the Ancient World. Gather resources, develop commercial routes, and affirm your military supremacy. Build your city and erect an architectural wonder.',
        minPlayers: 2,
        maxPlayers: 7,
        playtime: 30,
        price: 49.99,
        stock: 28,
        imageUrl:
          'https://placehold.co/600x400/DAA520/ffffff?text=7+Wonders',
        publisherId: publishers[5].id,
      },
    }),

    // ===== NEW GAMES =====
    // Azul - Pandasaurus
    prisma.game.create({
      data: {
        name: 'Azul',
        description:
          'Introduced by the Moors, azulejos (ceramic tiles) were fully embraced by the Portuguese. Draft tiles and place them strategically to score points and create beautiful patterns.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 45,
        price: 39.99,
        stock: 42,
        imageUrl: 'https://placehold.co/600x400/4169E1/ffffff?text=Azul',
        publisherId: publishers[13].id,
      },
    }),
    // Splendor - Asmodee
    prisma.game.create({
      data: {
        name: 'Splendor',
        description:
          'As a Renaissance merchant, acquire mines and transportation, and hire artisans to turn raw gems into beautiful jewels. Simple rules, but deep strategic gameplay.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 30,
        price: 39.99,
        stock: 38,
        imageUrl:
          'https://placehold.co/600x400/8B008B/ffffff?text=Splendor',
        publisherId: publishers[8].id,
      },
    }),
    // Catan - Asmodee
    prisma.game.create({
      data: {
        name: 'Catan',
        description:
          'Settle the island of Catan! Build settlements, cities, and roads as you compete for resources. Trade with other players and expand your empire in this classic game.',
        minPlayers: 3,
        maxPlayers: 4,
        playtime: 60,
        price: 49.99,
        stock: 55,
        imageUrl: 'https://placehold.co/600x400/CD853F/ffffff?text=Catan',
        publisherId: publishers[8].id,
      },
    }),
    // Terraforming Mars - Stronghold
    prisma.game.create({
      data: {
        name: 'Terraforming Mars',
        description:
          'In the 2400s, mankind begins to terraform Mars. Giant corporations compete to make Mars habitable. Raise temperature, create oceans, and develop green areas.',
        minPlayers: 1,
        maxPlayers: 5,
        playtime: 120,
        price: 69.99,
        stock: 22,
        imageUrl:
          'https://placehold.co/600x400/FF4500/ffffff?text=Terraforming+Mars',
        publisherId: publishers[12].id,
      },
    }),
    // Gloomhaven - Cephalofair
    prisma.game.create({
      data: {
        name: 'Gloomhaven',
        description:
          'A game of Euro-inspired tactical combat in a persistent world of shifting motives. Explore dungeons, fight monsters, loot treasures, and level up your characters in this epic campaign game.',
        minPlayers: 1,
        maxPlayers: 4,
        playtime: 120,
        price: 139.99,
        stock: 8,
        imageUrl:
          'https://placehold.co/600x400/2F4F4F/ffffff?text=Gloomhaven',
        publisherId: publishers[11].id,
      },
    }),
    // Dominion - Rio Grande
    prisma.game.create({
      data: {
        name: 'Dominion',
        description:
          'You are a monarch seeking to expand your kingdom. Buy cards representing actions, treasures, and victory points. The original deck-building game that started a genre.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 30,
        price: 44.99,
        stock: 30,
        imageUrl:
          'https://placehold.co/600x400/FFD700/ffffff?text=Dominion',
        publisherId: publishers[7].id,
      },
    }),
    // King of Tokyo - IELLO
    prisma.game.create({
      data: {
        name: 'King of Tokyo',
        description:
          'Play as mutant monsters, gigantic robots, and strange aliens competing to become the King of Tokyo. Roll dice and choose your strategy: Will you attack your opponents or heal yourself?',
        minPlayers: 2,
        maxPlayers: 6,
        playtime: 30,
        price: 39.99,
        stock: 45,
        imageUrl:
          'https://placehold.co/600x400/00FF00/ffffff?text=King+of+Tokyo',
        publisherId: publishers[8].id,
      },
    }),
    // Everdell - Starling
    prisma.game.create({
      data: {
        name: 'Everdell',
        description:
          'Within the charming valley of Everdell, a civilization of forest critters is thriving. Build a city of critters and constructions in this beautiful worker placement game.',
        minPlayers: 1,
        maxPlayers: 4,
        playtime: 80,
        price: 59.99,
        stock: 18,
        imageUrl:
          'https://placehold.co/600x400/228B22/ffffff?text=Everdell',
        publisherId: publishers[13].id,
      },
    }),
    // Sagrada - Floodgate
    prisma.game.create({
      data: {
        name: 'Sagrada',
        description:
          'Draft dice and use the tools-of-the-trade to carefully construct your stained glass window masterpiece. Balance color and shade in each row and column to maximize points.',
        minPlayers: 1,
        maxPlayers: 4,
        playtime: 40,
        price: 39.99,
        stock: 28,
        imageUrl:
          'https://placehold.co/600x400/FF69B4/ffffff?text=Sagrada',
        publisherId: publishers[13].id,
      },
    }),
    // Castles of Burgundy - Ravensburger
    prisma.game.create({
      data: {
        name: 'Castles of Burgundy',
        description:
          'As influential princes in 15th century France, players devote their efforts to careful trading and building to lead their estates to prominence. A Stefan Feld classic.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 90,
        price: 44.99,
        stock: 25,
        imageUrl:
          'https://placehold.co/600x400/8B4513/ffffff?text=Castles+of+Burgundy',
        publisherId: publishers[6].id,
      },
    }),
    // Ark Nova - Feuerland
    prisma.game.create({
      data: {
        name: 'Ark Nova',
        description:
          'Plan and build a modern, scientifically managed zoo. Support conservation projects and manage your zoo to gain the most conservation and appeal points.',
        minPlayers: 1,
        maxPlayers: 4,
        playtime: 150,
        price: 79.99,
        stock: 12,
        imageUrl:
          'https://placehold.co/600x400/32CD32/ffffff?text=Ark+Nova',
        publisherId: publishers[12].id,
      },
    }),
    // Root - Leder
    prisma.game.create({
      data: {
        name: 'Root',
        description:
          'Root is a game of adventure and war where 2-4 players battle for control of a vast wilderness. Each player has unique abilities and objectives in this asymmetric game.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 90,
        price: 69.99,
        stock: 20,
        imageUrl: 'https://placehold.co/600x400/8B4513/ffffff?text=Root',
        publisherId: publishers[14].id,
      },
    }),
    // Brass Birmingham - Roxley
    prisma.game.create({
      data: {
        name: 'Brass: Birmingham',
        description:
          'Build networks, grow industries, and navigate the world of the Industrial Revolution in England. A heavy economic strategy game for experienced players.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 120,
        price: 84.99,
        stock: 10,
        imageUrl:
          'https://placehold.co/600x400/A0522D/ffffff?text=Brass+Birmingham',
        publisherId: publishers[12].id,
      },
    }),
    // Spirit Island - Greater Than
    prisma.game.create({
      data: {
        name: 'Spirit Island',
        description:
          'In the most distant reaches of the world, magic still exists, embodied by spirits. As spirits of the land, defend your island from colonizing invaders in this cooperative game.',
        minPlayers: 1,
        maxPlayers: 4,
        playtime: 120,
        price: 79.99,
        stock: 16,
        imageUrl:
          'https://placehold.co/600x400/20B2AA/ffffff?text=Spirit+Island',
        publisherId: publishers[12].id,
      },
    }),
    // Agricola - Lookout
    prisma.game.create({
      data: {
        name: 'Agricola',
        description:
          'In Agricola, you are a farmer in 17th century Europe. Plow fields, build pastures, and upgrade your farmhouse. Feed your family and create the most prosperous farm.',
        minPlayers: 1,
        maxPlayers: 4,
        playtime: 120,
        price: 59.99,
        stock: 18,
        imageUrl:
          'https://placehold.co/600x400/8B4513/ffffff?text=Agricola',
        publisherId: publishers[9].id,
      },
    }),
    // Cascadia - AEG
    prisma.game.create({
      data: {
        name: 'Cascadia',
        description:
          'Create the most harmonious ecosystem in this tile-laying and token-drafting game. Featuring the habitats and wildlife of the Pacific Northwest.',
        minPlayers: 1,
        maxPlayers: 4,
        playtime: 45,
        price: 39.99,
        stock: 32,
        imageUrl:
          'https://placehold.co/600x400/2E8B57/ffffff?text=Cascadia',
        publisherId: publishers[13].id,
      },
    }),
    // Pandemic Legacy Season 1 - Z-Man
    prisma.game.create({
      data: {
        name: 'Pandemic Legacy: Season 1',
        description:
          'A unique and epic cooperative experience. Your actions in this game affect future games. Play 12-24 times through a dramatic campaign as the story unfolds.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 60,
        price: 69.99,
        stock: 14,
        imageUrl:
          'https://placehold.co/600x400/DC143C/ffffff?text=Pandemic+Legacy',
        publisherId: publishers[3].id,
      },
    }),
    // Twilight Imperium 4th - Fantasy Flight
    prisma.game.create({
      data: {
        name: 'Twilight Imperium Fourth Edition',
        description:
          'The definitive epic space opera board game. Lead one of seventeen factions vying for galactic domination through military might, political maneuvering, and economic bargaining.',
        minPlayers: 3,
        maxPlayers: 6,
        playtime: 480,
        price: 149.99,
        stock: 5,
        imageUrl:
          'https://placehold.co/600x400/000080/ffffff?text=Twilight+Imperium',
        publisherId: publishers[2].id,
      },
    }),
    // Love Letter - Z-Man
    prisma.game.create({
      data: {
        name: 'Love Letter',
        description:
          'Win the princess heart in this quick game of risk and deduction. Use your cards wisely and be the last player standing or hold the highest card to win the round.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 20,
        price: 14.99,
        stock: 60,
        imageUrl:
          'https://placehold.co/600x400/FF1493/ffffff?text=Love+Letter',
        publisherId: publishers[3].id,
      },
    }),
    // Sushi Go - Gamewright
    prisma.game.create({
      data: {
        name: 'Sushi Go!',
        description:
          'Pass the sushi! In this fast-playing card game, the goal is to grab the best combination of sushi dishes. Score points for collecting the most sushi rolls or making a full set of sashimi.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 15,
        price: 12.99,
        stock: 70,
        imageUrl:
          'https://placehold.co/600x400/FF6347/ffffff?text=Sushi+Go',
        publisherId: publishers[13].id,
      },
    }),
    // Forbidden Island - Gamewright
    prisma.game.create({
      data: {
        name: 'Forbidden Island',
        description:
          'Join a team of adventurers on a do-or-die mission to capture four sacred treasures from the ruins of this perilous paradise. Work together to keep the island from sinking!',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 30,
        price: 19.99,
        stock: 48,
        imageUrl:
          'https://placehold.co/600x400/00CED1/ffffff?text=Forbidden+Island',
        publisherId: publishers[13].id,
      },
    }),
    // Clank! - Renegade
    prisma.game.create({
      data: {
        name: 'Clank!',
        description:
          'Burgle your way to adventure! Sneak into a dragon lair to steal precious artifacts. Make noise and you might attract the dragon. Push your luck in this deck-building adventure.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 60,
        price: 59.99,
        stock: 24,
        imageUrl: 'https://placehold.co/600x400/8B0000/ffffff?text=Clank',
        publisherId: publishers[12].id,
      },
    }),
    // Coup - Indie
    prisma.game.create({
      data: {
        name: 'Coup',
        description:
          'In the not-too-distant future, the government is run by a few mega rich corporations. You are head of a family in a city-state. Bluff and deceive to be the last player standing.',
        minPlayers: 2,
        maxPlayers: 6,
        playtime: 15,
        price: 14.99,
        stock: 55,
        imageUrl: 'https://placehold.co/600x400/4B0082/ffffff?text=Coup',
        publisherId: publishers[8].id,
      },
    }),
    // Concordia - Rio Grande
    prisma.game.create({
      data: {
        name: 'Concordia',
        description:
          'Two thousand years ago, the Roman Empire ruled the Mediterranean. Guide your colonists to build a thriving trade network across the ancient Roman Empire in this elegant strategy game.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 100,
        price: 69.99,
        stock: 15,
        imageUrl:
          'https://placehold.co/600x400/DAA520/ffffff?text=Concordia',
        publisherId: publishers[7].id,
      },
    }),
    // Mysterium - Asmodee
    prisma.game.create({
      data: {
        name: 'Mysterium',
        description:
          'A cooperative deduction game where one player is a ghost who gives clues through abstract vision cards. The other players are psychics trying to solve a murder from the past.',
        minPlayers: 2,
        maxPlayers: 7,
        playtime: 42,
        price: 49.99,
        stock: 26,
        imageUrl:
          'https://placehold.co/600x400/483D8B/ffffff?text=Mysterium',
        publisherId: publishers[8].id,
      },
    }),
    // Camel Up - eggertspiele
    prisma.game.create({
      data: {
        name: 'Camel Up',
        description:
          'Camels are racing through the desert! But which camel will win? Place your bets and try to predict the outcome of this crazy camel race. A fun and chaotic betting game.',
        minPlayers: 2,
        maxPlayers: 8,
        playtime: 30,
        price: 39.99,
        stock: 33,
        imageUrl:
          'https://placehold.co/600x400/F4A460/ffffff?text=Camel+Up',
        publisherId: publishers[6].id,
      },
    }),
    // Dixit - Asmodee
    prisma.game.create({
      data: {
        name: 'Dixit',
        description:
          'Use your imagination and give clues about beautifully illustrated cards. Find the balance between being too obvious and too obscure in this creative storytelling game.',
        minPlayers: 3,
        maxPlayers: 6,
        playtime: 30,
        price: 34.99,
        stock: 40,
        imageUrl: 'https://placehold.co/600x400/FF69B4/ffffff?text=Dixit',
        publisherId: publishers[8].id,
      },
    }),
    // Patchwork - Lookout
    prisma.game.create({
      data: {
        name: 'Patchwork',
        description:
          'Create the most aesthetic and high-scoring patchwork quilt on a personal 9x9 game board. Acquire patches and place them strategically to maximize your points.',
        minPlayers: 2,
        maxPlayers: 2,
        playtime: 30,
        price: 29.99,
        stock: 35,
        imageUrl:
          'https://placehold.co/600x400/FF1493/ffffff?text=Patchwork',
        publisherId: publishers[9].id,
      },
    }),
    // Hanabi - Asmodee
    prisma.game.create({
      data: {
        name: 'Hanabi',
        description:
          'Work together to create a spectacular fireworks display. The challenge? You hold your cards facing away from you. Give clues carefully to coordinate the perfect show.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 25,
        price: 12.99,
        stock: 50,
        imageUrl: 'https://placehold.co/600x400/FF4500/ffffff?text=Hanabi',
        publisherId: publishers[8].id,
      },
    }),
    // Jaipur - Asmodee
    prisma.game.create({
      data: {
        name: 'Jaipur',
        description:
          'You are one of the two most powerful traders in Jaipur, the capital of Rajasthan. Acquire goods and sell them to the market for rupees in this fast-paced trading game.',
        minPlayers: 2,
        maxPlayers: 2,
        playtime: 30,
        price: 24.99,
        stock: 38,
        imageUrl: 'https://placehold.co/600x400/FF8C00/ffffff?text=Jaipur',
        publisherId: publishers[8].id,
      },
    }),
    // Betrayal at House on the Hill - Avalon Hill
    prisma.game.create({
      data: {
        name: 'Betrayal at House on the Hill',
        description:
          'Explore a haunted mansion as a team, then one player betrays the others. With 50 scenarios, each game creates a unique thrilling horror experience.',
        minPlayers: 3,
        maxPlayers: 6,
        playtime: 60,
        price: 49.99,
        stock: 22,
        imageUrl:
          'https://placehold.co/600x400/8B0000/ffffff?text=Betrayal',
        publisherId: publishers[2].id,
      },
    }),
    // Small World - Days of Wonder
    prisma.game.create({
      data: {
        name: 'Small World',
        description:
          'Control fantasy races with unique powers to conquer regions in a world thats just too small for everyone. Expand your empire and let your civilization decline at the right time.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 80,
        price: 59.99,
        stock: 28,
        imageUrl:
          'https://placehold.co/600x400/9370DB/ffffff?text=Small+World',
        publisherId: publishers[4].id,
      },
    }),
    // The Quest for El Dorado - Ravensburger
    prisma.game.create({
      data: {
        name: 'The Quest for El Dorado',
        description:
          'Race through the South American jungle in search of the lost city of gold. Build your deck of cards to speed through the terrain in this exciting race game.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 60,
        price: 39.99,
        stock: 30,
        imageUrl:
          'https://placehold.co/600x400/FFD700/ffffff?text=El+Dorado',
        publisherId: publishers[6].id,
      },
    }),
    // Century Spice Road - Plan B
    prisma.game.create({
      data: {
        name: 'Century: Spice Road',
        description:
          'Establish your trading empire by acquiring spices and converting them to the most valuable combinations. An elegant engine-building game with beautiful components.',
        minPlayers: 2,
        maxPlayers: 5,
        playtime: 45,
        price: 39.99,
        stock: 34,
        imageUrl:
          'https://placehold.co/600x400/D2691E/ffffff?text=Century',
        publisherId: publishers[13].id,
      },
    }),
    // Santorini - Roxley
    prisma.game.create({
      data: {
        name: 'Santorini',
        description:
          'Outsmart your opponent in this 3D abstract strategy game. Build towers and move your workers to reach the third level. Simple rules hide surprising strategic depth.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 20,
        price: 29.99,
        stock: 36,
        imageUrl:
          'https://placehold.co/600x400/4169E1/ffffff?text=Santorini',
        publisherId: publishers[12].id,
      },
    }),
    // Kingdomino - Blue Orange
    prisma.game.create({
      data: {
        name: 'Kingdomino',
        description:
          'Build the best kingdom by connecting landscapes and crowns. Draft dominoes and place them strategically to create the most prosperous domain. Winner of the Spiel des Jahres.',
        minPlayers: 2,
        maxPlayers: 4,
        playtime: 15,
        price: 19.99,
        stock: 45,
        imageUrl:
          'https://placehold.co/600x400/32CD32/ffffff?text=Kingdomino',
        publisherId: publishers[13].id,
      },
    }),
  ]);

  console.log(`✅ Created ${games.length} games`);
  return games;
}
