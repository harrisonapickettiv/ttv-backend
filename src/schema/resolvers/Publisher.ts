import { PublisherResolvers } from '../../generated/graphql.js';

export const Publisher: PublisherResolvers = {
  games: async (parent, _args, { prisma }) => {
    return prisma.game.findMany({
      where: { publisherId: parent.id },
      orderBy: { name: 'asc' },
    });
  },
};
