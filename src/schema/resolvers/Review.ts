import { ReviewResolvers } from '../../generated/graphql.js';

export const Review: ReviewResolvers = {
  user: async (parent, _args, { loaders }) => {
    return loaders.userLoader.load(parent.userId);
  },

  game: async (parent, _args, { loaders }) => {
    return loaders.gameLoader.load(parent.gameId);
  },
};
