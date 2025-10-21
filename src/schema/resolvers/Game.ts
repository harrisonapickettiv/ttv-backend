import { GameResolvers } from '../../generated/graphql.js';
import type { Prisma } from '../../generated/prisma/index.js';

type GameCategoryWithCategory = Prisma.GameCategoryGetPayload<{
  include: { category: true };
}>;

type GameMechanicWithMechanic = Prisma.GameMechanicGetPayload<{
  include: { mechanic: true };
}>;

type GameDesignerWithDesigner = Prisma.GameDesignerGetPayload<{
  include: { designer: true };
}>;

export const Game: GameResolvers = {
  publisher: async (parent, _args, { loaders }) => {
    return loaders.publisherLoader.load(parent.publisherId);
  },

  categories: async (parent, _args, { prisma }) => {
    const gameCategories = await prisma.gameCategory.findMany({
      where: { gameId: parent.id },
      include: { category: true },
    });

    return gameCategories.map((gc: GameCategoryWithCategory) => gc.category);
  },

  mechanics: async (parent, _args, { prisma }) => {
    const gameMechanics = await prisma.gameMechanic.findMany({
      where: { gameId: parent.id },
      include: { mechanic: true },
    });

    return gameMechanics.map((gm: GameMechanicWithMechanic) => gm.mechanic);
  },

  designers: async (parent, _args, { prisma }) => {
    const gameDesigners = await prisma.gameDesigner.findMany({
      where: { gameId: parent.id },
      include: { designer: true },
    });

    return gameDesigners.map((gd: GameDesignerWithDesigner) => gd.designer);
  },

  reviews: async (parent, _args, { prisma }) => {
    return prisma.review.findMany({
      where: { gameId: parent.id },
      orderBy: { createdAt: 'desc' },
    });
  },

  averageRating: async (parent, _args, { prisma }) => {
    const result = await prisma.review.aggregate({
      where: { gameId: parent.id },
      _avg: { rating: true },
    });

    return result._avg.rating;
  },

  reviewCount: async (parent, _args, { prisma }) => {
    return prisma.review.count({
      where: { gameId: parent.id },
    });
  },
};
