import { MutationResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

const requireAuth = (user: any) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};

export const addToCartResolver: MutationResolvers['addToCart'] = async (
  _parent,
  { input },
  { user, prisma }
) => {
  requireAuth(user);

  // Get or create user's cart
  let cart = await prisma.cart.findUnique({
    where: { userId: user!.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user!.id },
    });
  }

  // Check if item already exists in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_gameId: {
        cartId: cart.id,
        gameId: input.gameId,
      },
    },
  });

  if (existingItem) {
    // Update quantity
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + input.quantity },
    });
  } else {
    // Create new cart item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        gameId: input.gameId,
        quantity: input.quantity,
      },
    });
  }

  return cart;
};

export const updateCartItemResolver: MutationResolvers['updateCartItem'] = async (
  _parent,
  { input },
  { user, prisma }
) => {
  requireAuth(user);

  // Get user's cart
  const cart = await prisma.cart.findUnique({
    where: { userId: user!.id },
  });

  if (!cart) {
    throw new GraphQLError('Cart not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Get cart item to verify it belongs to user's cart
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: input.cartItemId },
  });

  if (!cartItem || cartItem.cartId !== cart.id) {
    throw new GraphQLError('Item not in cart', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  await prisma.cartItem.update({
    where: { id: input.cartItemId },
    data: { quantity: input.quantity },
  });

  return cart;
};

export const removeFromCartResolver: MutationResolvers['removeFromCart'] = async (
  _parent,
  { cartItemId },
  { user, prisma }
) => {
  requireAuth(user);

  // Get user's cart
  const cart = await prisma.cart.findUnique({
    where: { userId: user!.id },
  });

  if (!cart) {
    throw new GraphQLError('Cart not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Get cart item to verify it belongs to user's cart
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!cartItem || cartItem.cartId !== cart.id) {
    throw new GraphQLError('Item not in cart', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Delete cart item
  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });

  return cart;
};

export const clearCartResolver: MutationResolvers['clearCart'] = async (
  _parent,
  _args,
  { user, prisma }
) => {
  requireAuth(user);

  // Get user's cart
  const cart = await prisma.cart.findUnique({
    where: { userId: user!.id },
  });

  if (!cart) {
    throw new GraphQLError('Cart not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Delete all cart items
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return true;
};
