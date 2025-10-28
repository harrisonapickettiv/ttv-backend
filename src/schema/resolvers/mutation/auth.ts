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

export const updateUserResolver: MutationResolvers['updateUser'] = async (
  _parent,
  { id, input },
  { prisma, user: currentUser }
) => {
  // Check authentication
  if (!currentUser) {
    throw new GraphQLError('You must be logged in to update users', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  const isUpdatingSelf = currentUser.id === id;
  const isAdmin = currentUser.role === 'ADMIN';

  // Users can update themselves, or admins can update anyone
  if (!isUpdatingSelf && !isAdmin) {
    throw new GraphQLError('You can only update your own profile', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // If email is being changed, check if new email is already taken
  if (input.email && input.email !== existingUser.email) {
    const emailTaken = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (emailTaken) {
      throw new GraphQLError('Email is already in use', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }
  }

  // Prepare update data
  const updateData: {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    passwordHash?: string;
  } = {};

  if (input.email) updateData.email = input.email;
  if (input.firstName) updateData.firstName = input.firstName;
  if (input.lastName) updateData.lastName = input.lastName;

  // Only admins can change roles
  if (input.role) {
    if (!isAdmin) {
      throw new GraphQLError('Only administrators can change user roles', {
        extensions: { code: 'FORBIDDEN' },
      });
    }
    updateData.role = input.role;
  }

  // Hash new password if provided
  if (input.password) {
    updateData.passwordHash = await bcrypt.hash(input.password, 10);
  }

  // Update user
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return updatedUser;
};

export const deleteUserResolver: MutationResolvers['deleteUser'] = async (
  _parent,
  { id },
  { prisma, user: currentUser }
) => {
  // Check authentication
  if (!currentUser) {
    throw new GraphQLError('You must be logged in to delete users', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  // Check if user is admin
  if (currentUser.role !== 'ADMIN') {
    throw new GraphQLError('Only administrators can delete users', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  // Prevent self-deletion
  if (currentUser.id === id) {
    throw new GraphQLError('You cannot delete your own account', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Delete user (cascade deletes will handle related records based on Prisma schema)
  await prisma.user.delete({
    where: { id },
  });

  return true;
};
