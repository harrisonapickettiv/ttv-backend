import { MutationResolvers } from '../../../generated/graphql.js';

export const createGameResolver: MutationResolvers['createGame'] = async (
  _parent,
  { input },
  { prisma }
) => {
  return prisma.game.create({
    data: {
      name: input.name,
      description: input.description ?? undefined,
      minPlayers: input.minPlayers,
      maxPlayers: input.maxPlayers,
      playtime: input.playtime,
      price: input.price,
      stock: input.stock,
      imageUrl: input.imageUrl ?? undefined,
      publisherId: input.publisherId,
      // Create join table records for many-to-many relationships
      ...(input.categoryIds && {
        categories: {
          create: input.categoryIds.map(categoryId => ({
            category: { connect: { id: categoryId } },
          })),
        },
      }),
      ...(input.mechanicIds && {
        mechanics: {
          create: input.mechanicIds.map(mechanicId => ({
            mechanic: { connect: { id: mechanicId } },
          })),
        },
      }),
      ...(input.designerIds && {
        designers: {
          create: input.designerIds.map(designerId => ({
            designer: { connect: { id: designerId } },
          })),
        },
      }),
    },
  });
};

export const updateGameResolver: MutationResolvers['updateGame'] = async (
  _parent,
  { id, input },
  { prisma }
) => {
  // Build update data object, excluding null/undefined values
  const data: Record<string, any> = {};

  if (input.name != null) data.name = input.name;
  if (input.description !== undefined) data.description = input.description;
  if (input.minPlayers != null) data.minPlayers = input.minPlayers;
  if (input.maxPlayers != null) data.maxPlayers = input.maxPlayers;
  if (input.playtime != null) data.playtime = input.playtime;
  if (input.price != null) data.price = input.price;
  if (input.stock != null) data.stock = input.stock;
  if (input.imageUrl !== undefined) data.imageUrl = input.imageUrl;
  if (input.publisherId !== undefined) data.publisherId = input.publisherId;

  // Handle many-to-many relationships by deleting old and creating new join records
  if (input.categoryIds !== undefined && input.categoryIds !== null) {
    data.categories = {
      deleteMany: {},
      create: input.categoryIds.map(categoryId => ({
        category: { connect: { id: categoryId } },
      })),
    };
  }

  if (input.mechanicIds !== undefined && input.mechanicIds !== null) {
    data.mechanics = {
      deleteMany: {},
      create: input.mechanicIds.map(mechanicId => ({
        mechanic: { connect: { id: mechanicId } },
      })),
    };
  }

  if (input.designerIds !== undefined && input.designerIds !== null) {
    data.designers = {
      deleteMany: {},
      create: input.designerIds.map(designerId => ({
        designer: { connect: { id: designerId } },
      })),
    };
  }

  return prisma.game.update({
    where: { id },
    data,
  });
};

export const deleteGameResolver: MutationResolvers['deleteGame'] = async (
  _parent,
  { id },
  { prisma }
) => {
  await prisma.game.delete({
    where: { id },
  });
  return true;
};
