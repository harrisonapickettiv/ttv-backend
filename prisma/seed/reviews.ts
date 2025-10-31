import { PrismaClient } from '../../src/generated/prisma/index.js';

type Game = { id: string };
type User = { id: string };

export async function seedReviews(
  prisma: PrismaClient,
  games: Game[],
  users: User[]
) {
  console.log('⭐ Creating reviews...');

  const reviews = await Promise.all([
    // Wingspan reviews (popular game - 8 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Beautiful game!',
        comment:
          'Amazing theme and gameplay. My favorite engine builder. The artwork is stunning!',
        userId: users[1].id,
        gameId: games[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Perfect gateway to engine builders',
        comment:
          'Introduced my family to this and they love it. Easy to learn but with depth.',
        userId: users[2].id,
        gameId: games[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Great components',
        comment:
          'Quality components and fun gameplay. Can get a bit long with 4+ players.',
        userId: users[3].id,
        gameId: games[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Relaxing and strategic',
        comment:
          'Love the bird theme and the peaceful gameplay while still being competitive.',
        userId: users[4].id,
        gameId: games[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Solid engine builder',
        comment:
          'Well-designed game with lots of replay value. The European expansion adds even more variety.',
        userId: users[5].id,
        gameId: games[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Favorite game of 2019',
        comment:
          "Can't stop playing this. The bird powers are all unique and interesting.",
        userId: users[6].id,
        gameId: games[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Good but overhyped',
        comment:
          "It's a solid game but didn't live up to the hype for me. Still enjoyable though.",
        userId: users[7].id,
        gameId: games[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Educational too!',
        comment:
          'My kids love learning about different bird species while playing. Beautiful game.',
        userId: users[8].id,
        gameId: games[0].id,
      },
    }),

    // Scythe reviews (5 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Epic gameplay',
        comment:
          'Love the alternate history setting. Great mix of engine building and area control.',
        userId: users[2].id,
        gameId: games[1].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Gorgeous production',
        comment:
          'The art and components are top notch. Game can be a bit long though.',
        userId: users[3].id,
        gameId: games[1].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Strategic masterpiece',
        comment:
          'So many viable strategies. Every game feels different.',
        userId: users[4].id,
        gameId: games[1].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Not as combative as expected',
        comment:
          'Expected more combat based on theme. Still a good euro game though.',
        userId: users[5].id,
        gameId: games[1].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Asymmetric perfection',
        comment:
          'Each faction plays so differently. High replayability.',
        userId: users[9].id,
        gameId: games[1].id,
      },
    }),

    // Pandemic reviews (6 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Best co-op game',
        comment:
          'Perfect for game night with friends. Intense and challenging.',
        userId: users[1].id,
        gameId: games[4].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Cooperative classic',
        comment:
          'Great introduction to modern board games. Easy to teach.',
        userId: users[2].id,
        gameId: games[4].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Tense and fun',
        comment:
          'Really captures the feeling of racing against time.',
        userId: users[6].id,
        gameId: games[4].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Works great at all player counts',
        comment:
          'Equally good solo or with 4 players. Scales perfectly.',
        userId: users[7].id,
        gameId: games[4].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Gateway co-op',
        comment:
          'Got my family into board gaming with this one. Highly recommend.',
        userId: users[8].id,
        gameId: games[4].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Can have alpha player issues',
        comment:
          'Sometimes one player dominates the strategy discussion. Still fun though.',
        userId: users[10].id,
        gameId: games[4].id,
      },
    }),

    // 7 Wonders reviews (4 reviews)
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Quick and fun',
        comment:
          'Love the card drafting mechanism. Plays fast even with 6-7 players.',
        userId: users[1].id,
        gameId: games[7].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Scales perfectly',
        comment:
          'Works great at any player count. Multiple paths to victory.',
        userId: users[3].id,
        gameId: games[7].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Lots of replay value',
        comment:
          'Different wonders and strategies keep it fresh.',
        userId: users[5].id,
        gameId: games[7].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Decent but prefer Duel',
        comment:
          'Good game but I think the 2-player version is better.',
        userId: users[9].id,
        gameId: games[7].id,
      },
    }),

    // Azul reviews (5 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Beautiful and strategic',
        comment:
          'Simple rules but deep strategy. Love the tile components.',
        userId: users[2].id,
        gameId: games[8].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Perfect abstract',
        comment:
          'Easy to teach, hard to master. Great with 2 players.',
        userId: users[4].id,
        gameId: games[8].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Satisfying puzzle',
        comment:
          'Really enjoy the tile placement puzzle. Can be mean though!',
        userId: users[6].id,
        gameId: games[8].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Family favorite',
        comment:
          'Plays quickly and everyone enjoys it. Beautiful production.',
        userId: users[8].id,
        gameId: games[8].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Great gateway game',
        comment:
          'Perfect for introducing non-gamers to modern board games.',
        userId: users[10].id,
        gameId: games[8].id,
      },
    }),

    // Catan reviews (6 reviews)
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Classic for a reason',
        comment:
          'Still holds up after all these years. Trading is fun.',
        userId: users[2].id,
        gameId: games[10].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Gateway game excellence',
        comment:
          'Got me into board gaming. Will always have a special place.',
        userId: users[3].id,
        gameId: games[10].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Luck-dependent',
        comment:
          'Fun but can be frustrating when the dice hate you.',
        userId: users[5].id,
        gameId: games[10].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Social and strategic',
        comment:
          'Love the trading aspect. Great for groups.',
        userId: users[7].id,
        gameId: games[10].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Timeless',
        comment:
          'My go-to for introducing people to hobby gaming.',
        userId: users[9].id,
        gameId: games[10].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 2,
        title: 'Showing its age',
        comment:
          'There are better gateway games now. Trading can be tedious.',
        userId: users[11].id,
        gameId: games[10].id,
      },
    }),

    // Terraforming Mars reviews (5 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Epic engine builder',
        comment:
          'Love the theme and card variety. So much replayability.',
        userId: users[3].id,
        gameId: games[11].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Great theme integration',
        comment:
          'Really feel like you are terraforming Mars. Long but engaging.',
        userId: users[4].id,
        gameId: games[11].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Hundreds of unique cards',
        comment:
          'Every game is different. The card combos are satisfying.',
        userId: users[6].id,
        gameId: games[11].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Too long',
        comment:
          'Great game but takes way too long. Wish it was tighter.',
        userId: users[8].id,
        gameId: games[11].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Solo mode is excellent',
        comment:
          'One of my favorite solo games. Campaign mode adds even more.',
        userId: users[10].id,
        gameId: games[11].id,
      },
    }),

    // Gloomhaven reviews (5 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Epic campaign experience',
        comment:
          'Over 100 hours in and still going strong. Amazing game.',
        userId: users[2].id,
        gameId: games[12].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Best campaign game ever',
        comment:
          'The story and character progression are incredible.',
        userId: users[5].id,
        gameId: games[12].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Commitment required',
        comment:
          'Amazing game but needs dedicated group. Setup is lengthy.',
        userId: users[7].id,
        gameId: games[12].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Tactical brilliance',
        comment:
          'The card-based combat system is genius. So much depth.',
        userId: users[9].id,
        gameId: games[12].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Too much setup',
        comment:
          'Great gameplay but the overhead is too much for me.',
        userId: users[11].id,
        gameId: games[12].id,
      },
    }),

    // Codenames reviews (4 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Perfect party game',
        comment:
          'Everyone loves this. Easy to teach and always hilarious.',
        userId: users[2].id,
        gameId: games[3].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Brings out creativity',
        comment:
          'Love seeing how people connect words. Super fun.',
        userId: users[4].id,
        gameId: games[3].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Great for large groups',
        comment:
          'Can accommodate many players. Always a good time.',
        userId: users[8].id,
        gameId: games[3].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Endless replayability',
        comment:
          'Never gets old. The word combinations are always different.',
        userId: users[10].id,
        gameId: games[3].id,
      },
    }),

    // Ticket to Ride reviews (4 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Perfect family game',
        comment:
          'Everyone can play and enjoy. Beautiful board.',
        userId: users[3].id,
        gameId: games[6].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Great gateway',
        comment:
          'Simple but strategic. Good intro to modern games.',
        userId: users[5].id,
        gameId: games[6].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Addictive route building',
        comment:
          'Love completing routes. Satisfying gameplay.',
        userId: users[7].id,
        gameId: games[6].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Classic',
        comment:
          'Solid game that never disappoints.',
        userId: users[9].id,
        gameId: games[6].id,
      },
    }),

    // Root reviews (4 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Asymmetric brilliance',
        comment:
          'Each faction feels completely unique. Amazing design.',
        userId: users[4].id,
        gameId: games[19].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Cute but cutthroat',
        comment:
          'Dont let the woodland creatures fool you. This is competitive.',
        userId: users[6].id,
        gameId: games[19].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Innovative gameplay',
        comment:
          'Never played anything like it. Each faction is a puzzle.',
        userId: users[8].id,
        gameId: games[19].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 3,
        title: 'Steep learning curve',
        comment:
          'Great game but hard to teach. Need experienced players.',
        userId: users[11].id,
        gameId: games[19].id,
      },
    }),

    // Spirit Island reviews (3 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Best co-op game',
        comment:
          'Complex and strategic. Love the theme reversal.',
        userId: users[5].id,
        gameId: games[21].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Incredibly deep',
        comment:
          'So many spirits and scenarios. Endless content.',
        userId: users[7].id,
        gameId: games[21].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Challenging co-op',
        comment:
          'Much heavier than Pandemic but very rewarding.',
        userId: users[9].id,
        gameId: games[21].id,
      },
    }),

    // Dominion reviews (3 reviews)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Started the genre',
        comment:
          'The original deck builder and still one of the best.',
        userId: users[3].id,
        gameId: games[13].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Modular and replayable',
        comment:
          'Different kingdom cards every game. Great variety.',
        userId: users[6].id,
        gameId: games[13].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Clean design',
        comment:
          'Elegant mechanics. Many expansions add even more.',
        userId: users[10].id,
        gameId: games[13].id,
      },
    }),

    // Misc other games (1-2 reviews each)
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Beautiful and relaxing',
        comment:
          'Love the art and gameplay. Perfect medium-weight game.',
        userId: users[4].id,
        gameId: games[15].id, // Everdell
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Gorgeous dice puzzle',
        comment:
          'The stained glass theme is perfect.',
        userId: users[6].id,
        gameId: games[16].id, // Sagrada
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Feld masterpiece',
        comment:
          'One of my favorite euros. Tight and strategic.',
        userId: users[8].id,
        gameId: games[17].id, // Castles of Burgundy
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Best game of 2021',
        comment:
          'Incredible engine building. Zoo theme works perfectly.',
        userId: users[5].id,
        gameId: games[18].id, // Ark Nova
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Economic masterpiece',
        comment:
          'Heavy but rewarding. Teach time is long though.',
        userId: users[7].id,
        gameId: games[20].id, // Brass Birmingham
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Farming at its finest',
        comment:
          'The classic worker placement game. Still great.',
        userId: users[9].id,
        gameId: games[22].id, // Agricola
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Relaxing and beautiful',
        comment:
          'Love the Pacific Northwest theme.',
        userId: users[4].id,
        gameId: games[23].id, // Cascadia
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Legacy done right',
        comment:
          'What an experience. Dont read spoilers!',
        userId: users[6].id,
        gameId: games[24].id, // Pandemic Legacy
      },
    }),
    prisma.review.create({
      data: {
        rating: 2,
        title: 'Too long',
        comment:
          'Epic but requires a full day. Not for everyone.',
        userId: users[11].id,
        gameId: games[25].id, // Twilight Imperium
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Quick and fun',
        comment:
          'Perfect filler game. Everyone should own this.',
        userId: users[3].id,
        gameId: games[26].id, // Love Letter
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Adorable drafting',
        comment:
          'So cute and fun. Great with kids.',
        userId: users[8].id,
        gameId: games[27].id, // Sushi Go
      },
    }),
  ]);

  console.log(`✅ Created ${reviews.length} reviews`);
  return reviews;
}
