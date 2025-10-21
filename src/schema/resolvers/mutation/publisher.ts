import { MutationResolvers } from '../../../generated/graphql.js';

export const createPublisherResolver: MutationResolvers['createPublisher'] =
  async (_parent, { input }, { prisma }) => {
    return prisma.publisher.create({
      data: {
        name: input.name,
        country: input.country ?? undefined,
        website: input.website ?? undefined,
      },
    });
  };

export const updatePublisherResolver: MutationResolvers['updatePublisher'] =
  async (_parent, { id, input }, { prisma }) => {
    // Build update data object, excluding null/undefined values
    const data: Record<string, any> = {};

    if (input.name != null) data.name = input.name;
    if (input.country !== undefined) data.country = input.country;
    if (input.website !== undefined) data.website = input.website;

    return prisma.publisher.update({
      where: { id },
      data,
    });
  };

export const deletePublisherResolver: MutationResolvers['deletePublisher'] =
  async (_parent, { id }, { prisma }) => {
    // Note: This will fail if the publisher has games due to the foreign key constraint
    // You might want to add cascade delete or handle this more gracefully
    await prisma.publisher.delete({
      where: { id },
    });
    return true;
  };
