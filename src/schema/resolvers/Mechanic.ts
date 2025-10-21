import { MechanicResolvers } from '../../generated/graphql.js';
import type { Prisma } from '../../generated/prisma/index.js';

type GameMechanicWithGame = Prisma.GameMechanicGetPayload<{
  include: { game: true };
}>;

export const Mechanic: MechanicResolvers = {
  games: async (parent, _args, { prisma }) => {
    const mechanicGames = await prisma.gameMechanic.findMany({
      where: { mechanicId: parent.id },
      include: { game: true },
    });

    return mechanicGames.map((mg: GameMechanicWithGame) => mg.game);
  },
};
