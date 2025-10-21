import { MutationResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

// Helper to check admin role
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

export const createCategoryResolver: MutationResolvers['createCategory'] = async (
  _parent,
  { input },
  { user, prisma }
) => {
  requireAdmin(user);

  return prisma.category.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description ?? undefined,
    },
  });
};

export const updateCategoryResolver: MutationResolvers['updateCategory'] = async (
  _parent,
  { id, input },
  { user, prisma }
) => {
  requireAdmin(user);

  const data: Record<string, any> = {};
  if (input.name != null) data.name = input.name;
  if (input.slug != null) data.slug = input.slug;
  if (input.description !== undefined) data.description = input.description;

  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategoryResolver: MutationResolvers['deleteCategory'] = async (
  _parent,
  { id },
  { user, prisma }
) => {
  requireAdmin(user);

  await prisma.category.delete({
    where: { id },
  });

  return true;
};
