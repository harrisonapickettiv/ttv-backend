import { UserResolvers } from '../../generated/graphql.js';

export const User: UserResolvers = {
  reviews: async (parent, _args, { prisma }) => {
    return prisma.review.findMany({
      where: { userId: parent.id },
      orderBy: { createdAt: 'desc' },
    });
  },

  cart: async (parent, _args, { prisma }) => {
    return prisma.cart.findUnique({
      where: { userId: parent.id },
    });
  },

  orders: async (parent, _args, { prisma }) => {
    return prisma.order.findMany({
      where: { userId: parent.id },
      orderBy: { createdAt: 'desc' },
    });
  },
};
