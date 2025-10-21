import { QueryResolvers } from '../../../generated/graphql.js';

export const categoriesResolver: QueryResolvers['categories'] = async (
  _parent,
  _args,
  { prisma }
) => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
};
