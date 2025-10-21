import { MutationResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

const requireAuth = (user: any) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};

const requireAdmin = (user: any) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  if (user.role !== 'ADMIN') {
    throw new GraphQLError('Not authorized - Admin only', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
};

export const createOrderResolver: MutationResolvers['createOrder'] = async (
  _parent,
  { input },
  { user, prisma }
) => {
  requireAuth(user);

  // Get user's cart with items
  const cart = await prisma.cart.findUnique({
    where: { userId: user!.id },
    include: {
      items: {
        include: { game: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new GraphQLError('Cart is empty', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  // Calculate total
  const totalAmount = cart.items.reduce(
    (sum: number, item: typeof cart.items[number]) => sum + (item.game.price * item.quantity),
    0
  );

  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${user!.id.slice(-6)}`;

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: user!.id,
      orderNumber,
      totalAmount,
      status: 'PENDING',
      shippingName: input.shippingName,
      shippingAddress: input.shippingAddress,
      shippingCity: input.shippingCity,
      shippingState: input.shippingState,
      shippingZip: input.shippingZip,
      shippingCountry: input.shippingCountry,
      items: {
        create: cart.items.map((item: typeof cart.items[number]) => ({
          gameId: item.gameId,
          quantity: item.quantity,
          priceAtTime: item.game.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // Clear cart
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return order;
};

export const updateOrderStatusResolver: MutationResolvers['updateOrderStatus'] = async (
  _parent,
  { orderId, input },
  { user, prisma }
) => {
  requireAdmin(user);

  return prisma.order.update({
    where: { id: orderId },
    data: { status: input.status },
  });
};

export const cancelOrderResolver: MutationResolvers['cancelOrder'] = async (
  _parent,
  { orderId },
  { user, prisma }
) => {
  requireAuth(user);

  // Get order
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new GraphQLError('Order not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Check authorization
  if (order.userId !== user!.id && user!.role !== 'ADMIN') {
    throw new GraphQLError('Not authorized to cancel this order', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  // Can only cancel pending or processing orders
  if (order.status !== 'PENDING' && order.status !== 'PROCESSING') {
    throw new GraphQLError('Cannot cancel order in current status', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: 'CANCELLED' },
  });
};
