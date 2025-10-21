import { QueryResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

export const userResolver: QueryResolvers['user'] = async (
  _parent,
  { id },
  { prisma }
) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  return user;
};
