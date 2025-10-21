import { QueryResolvers } from '../../../generated/graphql.js';

export const publisherResolver: QueryResolvers['publisher'] = async (
  _parent,
  { id },
  { loaders }
) => {
  return loaders.publisherLoader.load(id);
};
