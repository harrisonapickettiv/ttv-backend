import { QueryResolvers } from '../../../generated/graphql.js';

export const reviewsResolver: QueryResolvers['reviews'] = async (
  _parent,
  { gameId },
  { prisma }
) => {
  const where = gameId ? { gameId } : {};

  return prisma.review.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
};
