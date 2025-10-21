import { DesignerResolvers } from '../../generated/graphql.js';
import type { Prisma } from '../../generated/prisma/index.js';

type GameDesignerWithGame = Prisma.GameDesignerGetPayload<{
  include: { game: true };
}>;

export const Designer: DesignerResolvers = {
  games: async (parent, _args, { prisma }) => {
    const designerGames = await prisma.gameDesigner.findMany({
      where: { designerId: parent.id },
      include: { game: true },
    });

    return designerGames.map((dg: GameDesignerWithGame) => dg.game);
  },
};
