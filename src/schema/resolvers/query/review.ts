import { QueryResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

export const reviewResolver: QueryResolvers['review'] = async (
  _parent,
  { id },
  { loaders }
) => {
  const review = await loaders.reviewLoader.load(id);

  if (!review) {
    throw new GraphQLError('Review not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  return review;
};
