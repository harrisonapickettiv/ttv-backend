import { QueryResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

export const myReviewsResolver: QueryResolvers['myReviews'] = async (
  _parent,
  _args,
  { user, prisma }
) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  return prisma.review.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
};
