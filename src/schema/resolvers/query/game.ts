import { QueryResolvers } from '../../../generated/graphql.js';

export const gameResolver: QueryResolvers['game'] = async (
  _parent,
  { id },
  { loaders }
) => {
  return loaders.gameLoader.load(id);
};
