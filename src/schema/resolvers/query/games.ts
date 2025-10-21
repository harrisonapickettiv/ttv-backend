import { QueryResolvers } from '../../../generated/graphql.js';

export const gamesResolver: QueryResolvers['games'] = async (
  _parent,
  _args,
  { prisma }
) => {
  return prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
  });
};
