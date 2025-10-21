import { PrismaClient } from './generated/prisma';
import DataLoader from 'dataloader';
import type {
  Game,
  Publisher,
  Category,
  Mechanic,
  Designer,
  User,
  Review,
  Cart,
  CartItem,
  Order,
  OrderItem,
} from './generated/prisma';

// Allow passing in a custom Prisma client (for testing)
const globalPrisma = new PrismaClient();

// Generic Prisma client interface that works with both prod and test clients
interface PrismaClientLike {
  game: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  publisher: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  category: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  mechanic: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  designer: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  user: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  review: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  cart: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  cartItem: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
    deleteMany: (args: any) => Promise<any>;
  };
  order: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  orderItem: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
}

export interface GraphQLContext {
  prisma: PrismaClientLike;
  user?: User | null; // Current authenticated user (from JWT)
  loaders: {
    publisherLoader: DataLoader<string, Publisher | null>;
    gameLoader: DataLoader<string, Game | null>;
    categoryLoader: DataLoader<string, Category | null>;
    mechanicLoader: DataLoader<string, Mechanic | null>;
    designerLoader: DataLoader<string, Designer | null>;
    userLoader: DataLoader<string, User | null>;
    reviewLoader: DataLoader<string, Review | null>;
    cartLoader: DataLoader<string, Cart | null>;
    orderLoader: DataLoader<string, Order | null>;
  };
}

export const createContext = (
  prismaClient: PrismaClientLike = globalPrisma,
  user?: User | null
): GraphQLContext => {
  return {
    prisma: prismaClient as any,
    user, // Authenticated user from JWT middleware
    loaders: {
      publisherLoader: new DataLoader(async (ids) => {
        const publishers = await prismaClient.publisher.findMany({
          where: { id: { in: [...ids] } },
        });
        const publisherMap = new Map(publishers.map((p: any) => [p.id, p]));
        return ids.map((id) => publisherMap.get(id) || null);
      }),
      gameLoader: new DataLoader(async (ids) => {
        const games = await prismaClient.game.findMany({
          where: { id: { in: [...ids] } },
        });
        const gameMap = new Map(games.map((g: any) => [g.id, g]));
        return ids.map((id) => gameMap.get(id) || null);
      }),
      categoryLoader: new DataLoader(async (ids) => {
        const categories = await prismaClient.category.findMany({
          where: { id: { in: [...ids] } },
        });
        const categoryMap = new Map(categories.map((c: any) => [c.id, c]));
        return ids.map((id) => categoryMap.get(id) || null);
      }),
      mechanicLoader: new DataLoader(async (ids) => {
        const mechanics = await prismaClient.mechanic.findMany({
          where: { id: { in: [...ids] } },
        });
        const mechanicMap = new Map(mechanics.map((m: any) => [m.id, m]));
        return ids.map((id) => mechanicMap.get(id) || null);
      }),
      designerLoader: new DataLoader(async (ids) => {
        const designers = await prismaClient.designer.findMany({
          where: { id: { in: [...ids] } },
        });
        const designerMap = new Map(designers.map((d: any) => [d.id, d]));
        return ids.map((id) => designerMap.get(id) || null);
      }),
      userLoader: new DataLoader(async (ids) => {
        const users = await prismaClient.user.findMany({
          where: { id: { in: [...ids] } },
        });
        const userMap = new Map(users.map((u: any) => [u.id, u]));
        return ids.map((id) => userMap.get(id) || null);
      }),
      reviewLoader: new DataLoader(async (ids) => {
        const reviews = await prismaClient.review.findMany({
          where: { id: { in: [...ids] } },
        });
        const reviewMap = new Map(reviews.map((r: any) => [r.id, r]));
        return ids.map((id) => reviewMap.get(id) || null);
      }),
      cartLoader: new DataLoader(async (ids) => {
        const carts = await prismaClient.cart.findMany({
          where: { id: { in: [...ids] } },
        });
        const cartMap = new Map(carts.map((c: any) => [c.id, c]));
        return ids.map((id) => cartMap.get(id) || null);
      }),
      orderLoader: new DataLoader(async (ids) => {
        const orders = await prismaClient.order.findMany({
          where: { id: { in: [...ids] } },
        });
        const orderMap = new Map(orders.map((o: any) => [o.id, o]));
        return ids.map((id) => orderMap.get(id) || null);
      }),
    },
  };
};
