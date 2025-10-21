import { MutationResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// You'll need to add these to your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN = '7d';

export const registerResolver: MutationResolvers['register'] = async (
  _parent,
  { input },
  { prisma }
) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new GraphQLError('User with this email already exists', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      passwordHash: hashedPassword,
      role: 'CUSTOMER', // Default role
    },
  });

  // Create cart for new user
  await prisma.cart.create({
    data: { userId: user.id },
  });

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user };
};

export const loginResolver: MutationResolvers['login'] = async (
  _parent,
  { input },
  { prisma }
) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new GraphQLError('Invalid email or password', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  // Verify password
  const validPassword = await bcrypt.compare(input.password, user.passwordHash);

  if (!validPassword) {
    throw new GraphQLError('Invalid email or password', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user };
};
