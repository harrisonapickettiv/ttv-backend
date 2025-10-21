import { QueryResolvers } from '../../../generated/graphql.js';

export const designersResolver: QueryResolvers['designers'] = async (
  _parent,
  _args,
  { prisma }
) => {
  return prisma.designer.findMany({
    orderBy: { name: 'asc' },
  });
};
