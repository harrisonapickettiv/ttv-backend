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

export const usersResolver: QueryResolvers['users'] = async (
  _parent,
  _args,
  { prisma, user }
) => {
  // Check authentication
  if (!user) {
    throw new GraphQLError('You must be logged in to view users', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  // Check if user is admin
  if (user.role !== 'ADMIN') {
    throw new GraphQLError('Only administrators can view all users', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return users;
};
