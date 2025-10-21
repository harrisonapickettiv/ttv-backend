import { QueryResolvers } from '../../../generated/graphql.js';

export const categoryResolver: QueryResolvers['category'] = async (
  _parent,
  { id, slug },
  { prisma }
) => {
  if (id) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  if (slug) {
    return prisma.category.findUnique({
      where: { slug },
    });
  }

  return null;
};
