import { OrderItemResolvers } from '../../generated/graphql.js';

export const OrderItem: OrderItemResolvers = {
  order: async (parent, _args, { loaders }) => {
    return loaders.orderLoader.load(parent.orderId);
  },

  game: async (parent, _args, { loaders }) => {
    return loaders.gameLoader.load(parent.gameId);
  },
};
