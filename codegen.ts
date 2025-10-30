import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/schema/typeDefs/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../context#GraphQLContext',
        // Map Prisma types as the parent type for resolvers
        mappers: {
          Game: '../generated/prisma#Game as GameModel',
          Publisher: '../generated/prisma#Publisher as PublisherModel',
          Category: '../generated/prisma#Category as CategoryModel',
          Mechanic: '../generated/prisma#Mechanic as MechanicModel',
          Designer: '../generated/prisma#Designer as DesignerModel',
          User: '../generated/prisma#User as UserModel',
          Review: '../generated/prisma#Review as ReviewModel',
          Cart: '../generated/prisma#Cart as CartModel',
          CartItem: '../generated/prisma#CartItem as CartItemModel',
          Order: '../generated/prisma#Order as OrderModel',
          OrderItem: '../generated/prisma#OrderItem as OrderItemModel',
        },
      },
    },
  },
};

export default config;
