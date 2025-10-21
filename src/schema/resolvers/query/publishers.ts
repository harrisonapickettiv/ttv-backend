import { QueryResolvers } from '../../../generated/graphql.js';

export const publishersResolver: QueryResolvers['publishers'] = async (
  _parent,
  _args,
  { prisma }
) => {
  return prisma.publisher.findMany({
    orderBy: { name: 'asc' },
  });
};
