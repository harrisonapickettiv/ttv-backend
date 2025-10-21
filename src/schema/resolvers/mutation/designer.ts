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

export const createDesignerResolver: MutationResolvers['createDesigner'] = async (
  _parent,
  { input },
  { user, prisma }
) => {
  requireAdmin(user);

  return prisma.designer.create({
    data: {
      name: input.name,
      slug: input.slug,
      bio: input.bio ?? undefined,
    },
  });
};

export const updateDesignerResolver: MutationResolvers['updateDesigner'] = async (
  _parent,
  { id, input },
  { user, prisma }
) => {
  requireAdmin(user);

  const data: Record<string, any> = {};
  if (input.name != null) data.name = input.name;
  if (input.slug != null) data.slug = input.slug;
  if (input.bio !== undefined) data.bio = input.bio;

  return prisma.designer.update({
    where: { id },
    data,
  });
};

export const deleteDesignerResolver: MutationResolvers['deleteDesigner'] = async (
  _parent,
  { id },
  { user, prisma }
) => {
  requireAdmin(user);

  await prisma.designer.delete({
    where: { id },
  });

  return true;
};
