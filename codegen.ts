import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/schema/typeDefs/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../context#Context',
        mappers: {
          Game: '@prisma/client#Game',
          Publisher: '@prisma/client#Publisher',
          Category: '@prisma/client#Category',
          Mechanic: '@prisma/client#Mechanic',
          Designer: '@prisma/client#Designer',
          User: '@prisma/client#User',
          Review: '@prisma/client#Review',
          Cart: '@prisma/client#Cart',
          CartItem: '@prisma/client#CartItem',
          Order: '@prisma/client#Order',
          OrderItem: '@prisma/client#OrderItem',
        },
      },
    },
  },
};

export default config;
