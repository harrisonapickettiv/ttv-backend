import { CategoryResolvers } from '../../generated/graphql.js';
import type { Prisma } from '../../generated/prisma/index.js';

type GameCategoryWithGame = Prisma.GameCategoryGetPayload<{
  include: { game: true };
}>;

export const Category: CategoryResolvers = {
  games: async (parent, _args, { prisma }) => {
    const categoryGames = await prisma.gameCategory.findMany({
      where: { categoryId: parent.id },
      include: { game: true },
    });

    return categoryGames.map((cg: GameCategoryWithGame) => cg.game);
  },
};
