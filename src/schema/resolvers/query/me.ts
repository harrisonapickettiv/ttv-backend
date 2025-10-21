import { QueryResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

export const meResolver: QueryResolvers['me'] = async (
  _parent,
  _args,
  { user }
) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  return user;
};
