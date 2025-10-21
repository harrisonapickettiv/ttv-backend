import { OrderResolvers } from '../../generated/graphql.js';

export const Order: OrderResolvers = {
  user: async (parent, _args, { loaders }) => {
    return loaders.userLoader.load(parent.userId);
  },

  items: async (parent, _args, { prisma }) => {
    return prisma.orderItem.findMany({
      where: { orderId: parent.id },
    });
  },
};
