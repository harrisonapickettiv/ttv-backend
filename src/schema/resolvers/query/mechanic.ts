import { QueryResolvers } from '../../../generated/graphql.js';

export const mechanicResolver: QueryResolvers['mechanic'] = async (
  _parent,
  { id, slug },
  { prisma }
) => {
  if (id) {
    return prisma.mechanic.findUnique({
      where: { id },
    });
  }

  if (slug) {
    return prisma.mechanic.findUnique({
      where: { slug },
    });
  }

  return null;
};
