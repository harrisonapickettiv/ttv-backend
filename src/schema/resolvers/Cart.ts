import { CartResolvers } from '../../generated/graphql.js';

export const Cart: CartResolvers = {
  user: async (parent, _args, { loaders }) => {
    return loaders.userLoader.load(parent.userId);
  },

  items: async (parent, _args, { prisma }) => {
    return prisma.cartItem.findMany({
      where: { cartId: parent.id },
    });
  },
};
