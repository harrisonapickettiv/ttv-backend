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
          'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__itemrep/img/DR7181wU4sHT6gn6Q1XccpPxNHg=/fit-in/246x300/filters:strip_icc()/pic4458123.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage/img/zoz-t_z9nqqxL7OwQenbqp9PRl8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3163924.jpg',
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
          'https://cf.geekdo-images.com/l_PRU2lVlX9seScRFcvFlA__imagepage/img/SWmCgt3LzSd05GPn6EW-Yr0m8aE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6500949.jpg',
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
          'https://cf.geekdo-images.com/nC6ifPCDnAItwoKSKXVrnw__imagepage/img/o_eM1W7Ads5CAeQP97zLeN1n4fM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8907965.jpg',
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
          'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__imagepage/img/kIBu-2Ljb_ml5n-S8uIbE6ehGFc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1534148.jpg',
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
          'https://cf.geekdo-images.com/Z3upN53-fsVPUDimN9SpOA__itemrep/img/sT0kjr-Klona2rygvD8kURJgqdU=/fit-in/246x300/filters:strip_icc()/pic2337577.jpg',
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
          'https://cf.geekdo-images.com/kdWYkW-7AqG63HhqPL6ekA__imagepage/img/AWsdGNNSuI78BaCPAVQpjrUneKY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8937637.jpg',
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
          'https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__imagepage/img/WKlTys0Dc3F6x9r05Fwyvs82tz4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7149798.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__imagepage/img/q4uWd2nXGeEkKDR8Cc3NhXG9PEU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6973671.png',
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
          'https://cf.geekdo-images.com/vNFe4JkhKAERzi4T0Ntwpw__imagepage/img/JXnPzdgTeDkRrxESA86gnCw4Zws=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8234167.png',
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
        imageUrl: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__itemrep/img/IzYEUm_gWFuRFOL8gQYqGm5gU6A=/fit-in/246x300/filters:strip_icc()/pic2419375.jpg',
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
          'https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__imagepage/img/FS1RE8Ue6nk1pNbPI3l-OSapQGc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3536616.jpg',
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
          'https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__imagepage/img/pBaOL7vV402nn1I5dHsdSKsFHqA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2437871.jpg',
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
          'https://cf.geekdo-images.com/j6iQpZ4XkemZP07HNCODBA__imagepage/img/bbKggiASKA1E8sAh2cH07czaGn4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic394356.jpg',
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
          'https://cf.geekdo-images.com/m_RzXpHURC0_xLkvRSR_sw__imagepage/img/oSNvtltDuWj3LP74IEFj8Ov2B0k=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3043734.jpg',
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
          'https://cf.geekdo-images.com/fjE7V5LNq31yVEW_yuqI-Q__imagepage/img/ijYTk6KGtxLRdIvLsGar13ZHs4c=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3918905.png',
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
          'https://cf.geekdo-images.com/PZt3EAAGV3dFIVuwMR0AEw__imagepage/img/F8DS3hdZfVIcxVpPSZV7DMLrPJ4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3525224.jpg',
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
          'https://cf.geekdo-images.com/sH2YTQ10dHj1ibfS-KKtGA__imagepage/img/QSGsMsqLPGG3UkWNVH0ZECm3h6U=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8745814.jpg',
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
          'https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__imagepage/img/qR1EvTSNPjDa-pNPGxU9HY2oKfs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6293412.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__imagepage/img/ZF-dta5ffawuKAkAt2LB-QTIv5M=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4254509.jpg',
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
          'https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__imagepage/img/-17KkOmxbTu2slJTabGrkO8ZW8s=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3490053.jpg',
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
          'https://cf.geekdo-images.com/kjCm4ZvPjIZxS-mYgSPy1g__imagepage/img/py7KzNjXVOuVesFZB7LwqCbvALY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7013651.jpg',
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
          'https://cf.geekdo-images.com/dDDo2Hexl80ucK1IlqTk-g__imagepage/img/TLgJgsf7CyGgl8RM2duUYOrE41E=/fit-in/900x600/filters:no_upscale():strip_icc()/pic831744.jpg',
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
          'https://cf.geekdo-images.com/MjeJZfulbsM1DSV3DrGJYA__imagepage/img/0ksox22FKLq-Z-rsbBlF2IDG9x0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5100691.jpg',
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
          'https://cf.geekdo-images.com/-Qer2BBPG7qGGDu6KcVDIw__imagepage/img/qZybAu8uJ9_sZlU2A65DIF6Y2Zw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2452831.png',
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
          'https://cf.geekdo-images.com/_Ppn5lssO5OaildSE-FgFA__imagepage/img/0AK9hQgpcOOOLJh8IEZS3Nw57vE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3727516.jpg',
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
          'https://cf.geekdo-images.com/T1ltXwapFUtghS9A7_tf4g__imagepage/img/wf3HgW2e24O0mcsB5OIHJnxaeIM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1401448.jpg',
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
          'https://cf.geekdo-images.com/Fn3PSPZVxa3YurlorITQ1Q__imagepage/img/qD1BnVr1_QYh9Dwr2G6eXVqTdBs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1900075.jpg',
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
          'https://cf.geekdo-images.com/JgAkEBUaiHOsOS94iRMs2w__imagepage/img/Wlfw4ELGy7zqNoz13tCvbbFaEBQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic646458.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/DPjV1iI0ygo5Bl3XLNRiIg__imagepage/img/R9z8w4GndbY-r3fG_LK1LvBvLc0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4449526.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/MWhSY_GOe2-bmlQ2rntSVg__imagepage/img/HPKaW4sG3jlaO3MM5V6x0Ks0DGI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2016054.jpg',
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
          'https://cf.geekdo-images.com/CzwSm8i7tkLz6cBnrILZBg__imagepage/img/wLKrQnpz-Udm23hoDBRjyKgHEvo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3453267.jpg',
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
          'https://cf.geekdo-images.com/1nQ3ZKudtDeAP7IiKE-kNg__imagepage/img/scbgJc5EdSpHJGxGbV9dgpxj9hQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8625343.jpg',
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
          'https://cf.geekdo-images.com/jVr1bGBQpshqVPcwvZ7CPg__imagepage/img/izUYPKEp6La-pRe5SgA1TKhPSXM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1918028.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/J0PlHArkZDJ57H-brXW2Fw__imagepage/img/j3bmkyVXJ2tOOXQzARtHqT__vzY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6738336.jpg',
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
          'https://cf.geekdo-images.com/RDOwMRBnIb3Ehl6GyXj9xg__imagepage/img/neJ65_frO2klfRpV-lVY_j7C4tM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8669620.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/JDVksMwfcqoem1k_xtZrOA__imagepage/img/dFQ1b2Tsr294dCsZYMrVNIgEumc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2007286.jpg',
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
        imageUrl:
          'https://cf.geekdo-images.com/_LTujSe_o16nvjDC-J0seA__imagepage/img/X7qZxqheM7_ADLuPhC11b_9IhYw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5100947.jpg',
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
          'https://cf.geekdo-images.com/lqmt2Oti_qJS65XqHcB8AA__imagepage/img/dxrUKI24svPBCJAcNqzHy_uayp4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5146864.png',
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
          'https://cf.geekdo-images.com/aoPM07XzoceB-RydLh08zA__imagepage/img/lHmv0ddOrUvpiLcPeQbZdT5yCEA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic428828.jpg',
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
          'https://cf.geekdo-images.com/b5VyYjNfAxJ4Z-Dx2UWlqg__imagepage/img/oGGZLnPoBVdO4ZlNquRvuzaQmrU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7945692.jpg',
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
          'https://cf.geekdo-images.com/0_KEDk4lCvryf1Ju3YQJxA__imagepage/img/4pU8XNwimU2Dlx097R2Fd7PQxxI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3339551.jpg',
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
          'https://cf.geekdo-images.com/665Ply7Ho1WVf1v1iZlWeg__imagepage/img/Nr9Q-qEAAPshoyVclz-Rb8q3-ZQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3283110.png',
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
          'https://cf.geekdo-images.com/c0m3gwZTcfKoLI63ASio8g__imagepage/img/k40CbVK1UuWeu3GZQGNwFNbGJVc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8443569.png',
        publisherId: publishers[13].id,
      },
    }),
  ]);

  console.log(`✅ Created ${games.length} games`);
  return games;
}
