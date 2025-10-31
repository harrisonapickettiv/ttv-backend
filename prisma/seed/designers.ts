import { PrismaClient } from '../../src/generated/prisma/index.js';

export async function seedDesigners(prisma: PrismaClient) {
  console.log('👨‍🎨 Creating designers...');

  const designers = await Promise.all([
    prisma.designer.create({
      data: {
        name: 'Elizabeth Hargrave',
        bio: 'Known for nature-themed games like Wingspan',
        website: 'https://www.elizabethhargrave.com',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Jamey Stegmaier',
        bio: 'Founder of Stonemaier Games, designer of Scythe and Viticulture',
        website: 'https://stonemaiergames.com/jamey-stegmaier',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Vlaada Chvátil',
        bio: 'Czech designer known for innovative mechanisms',
        website: 'https://czechgames.com/en/vlaada-chvatil',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Matt Leacock',
        bio: 'Designer of cooperative games including Pandemic',
        website: 'https://www.mattleacock.com',
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
        website: 'https://www.boardgamegeek.com/boardgamedesigner/9/alan-r-moon',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Antoine Bauza',
        bio: 'French designer known for 7 Wonders and Hanabi',
        website: 'https://www.antoinebauza.fr',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Uwe Rosenberg',
        bio: 'Prolific German designer of Agricola, Caverna, and Patchwork',
        website: 'https://www.lookout-spiele.de/en/designer/uwe-rosenberg',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Stefan Feld',
        bio: 'German designer known for complex Euro games like Castles of Burgundy',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Reiner Knizia',
        bio: 'Legendary designer with over 600 published games',
        website: 'https://www.knizia.de',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Corey Konieczka',
        bio: 'Designer of thematic games like Battlestar Galactica and Eldritch Horror',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Isaac Childres',
        bio: 'Creator of the massively popular Gloomhaven series',
        website: 'https://cephalofair.com',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Alexander Pfister',
        bio: 'Designer of Great Western Trail and Mombasa',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Vital Lacerda',
        bio: 'Portuguese designer known for complex games like Vinhos and Kanban',
        website: 'https://www.vitallacerda.com',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Richard Garfield',
        bio: 'Creator of Magic: The Gathering and King of Tokyo',
        website: 'https://en.wikipedia.org/wiki/Richard_Garfield',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Bruno Cathala',
        bio: 'French designer of Kingdomino, 7 Wonders Duel, and Five Tribes',
        website: 'https://www.boardgamegeek.com/boardgamedesigner/1727/bruno-cathala',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Rob Daviau',
        bio: 'Pioneer of legacy games with Pandemic Legacy and Risk Legacy',
        website: 'https://www.robdaviau.com',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Eric Lang',
        bio: 'Designer of Blood Rage, Rising Sun, and XCOM',
        website: 'https://www.ericlang.com',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Ryan Laukat',
        bio: 'Designer and illustrator of Above and Below and Near and Far',
        website: 'https://www.redravengames.com',
      },
    }),
    prisma.designer.create({
      data: {
        name: 'Cole Wehrle',
        bio: 'Designer of Root, Pax Pamir, and other asymmetric games',
        website: 'https://colewehrle.com',
      },
    }),
  ]);

  console.log(`✅ Created ${designers.length} designers`);
  return designers;
}
