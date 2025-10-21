import { MutationResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

const requireAdmin = (user: any) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  if (user.role !== 'ADMIN') {
    throw new GraphQLError('Not authorized - Admin only', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
};

export const createMechanicResolver: MutationResolvers['createMechanic'] = async (
  _parent,
  { input },
  { user, prisma }
) => {
  requireAdmin(user);

  return prisma.mechanic.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description ?? undefined,
    },
  });
};

export const updateMechanicResolver: MutationResolvers['updateMechanic'] = async (
  _parent,
  { id, input },
  { user, prisma }
) => {
  requireAdmin(user);

  const data: Record<string, any> = {};
  if (input.name != null) data.name = input.name;
  if (input.slug != null) data.slug = input.slug;
  if (input.description !== undefined) data.description = input.description;

  return prisma.mechanic.update({
    where: { id },
    data,
  });
};

export const deleteMechanicResolver: MutationResolvers['deleteMechanic'] = async (
  _parent,
  { id },
  { user, prisma }
) => {
  requireAdmin(user);

  await prisma.mechanic.delete({
    where: { id },
  });

  return true;
};
