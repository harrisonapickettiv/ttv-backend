import { CartItemResolvers } from '../../generated/graphql.js';

export const CartItem: CartItemResolvers = {
  cart: async (parent, _args, { loaders }) => {
    return loaders.cartLoader.load(parent.cartId);
  },

  game: async (parent, _args, { loaders }) => {
    return loaders.gameLoader.load(parent.gameId);
  },
};
