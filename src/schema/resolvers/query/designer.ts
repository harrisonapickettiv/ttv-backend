import { QueryResolvers } from '../../../generated/graphql.js';

export const designerResolver: QueryResolvers['designer'] = async (
  _parent,
  { id, slug },
  { prisma }
) => {
  if (id) {
    return prisma.designer.findUnique({
      where: { id },
    });
  }

  if (slug) {
    return prisma.designer.findUnique({
      where: { slug },
    });
  }

  return null;
};
