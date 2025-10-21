import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { PrismaClient } from './generated/prisma/index.js';
import { createContext } from './context.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    let user = null;

    if (token) {
      try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as {
          userId: string;
          email: string;
          role: string;
        };

        // Fetch the user from the database
        user = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });
      } catch (error) {
        // Token is invalid or expired - just set user to null
        // Don't throw an error here, let individual resolvers handle auth
        console.error('JWT verification failed:', error);
      }
    }

    return createContext(prisma, user);
  },
  listen: { port: Number(process.env.PORT) || 4000 },
});

console.log(`🚀 Server ready at ${url}`);
