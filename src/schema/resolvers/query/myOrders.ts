import { QueryResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

export const myOrdersResolver: QueryResolvers['myOrders'] = async (
  _parent,
  _args,
  { user, prisma }
) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  return prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
};
