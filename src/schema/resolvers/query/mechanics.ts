import { QueryResolvers } from '../../../generated/graphql.js';

export const mechanicsResolver: QueryResolvers['mechanics'] = async (
  _parent,
  _args,
  { prisma }
) => {
  return prisma.mechanic.findMany({
    orderBy: { name: 'asc' },
  });
};
