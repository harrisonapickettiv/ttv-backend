import { QueryResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

export const orderResolver: QueryResolvers['order'] = async (
  _parent,
  { id },
  { user, prisma }
) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new GraphQLError('Order not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Users can only view their own orders (unless admin)
  if (order.userId !== user.id && user.role !== 'ADMIN') {
    throw new GraphQLError('Not authorized to view this order', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  return order;
};
