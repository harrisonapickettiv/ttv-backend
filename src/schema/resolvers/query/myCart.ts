import { QueryResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

export const myCartResolver: QueryResolvers['myCart'] = async (
  _parent,
  _args,
  { user, prisma }
) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  // Find or create cart for user
  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
    });
  }

  return cart;
};
