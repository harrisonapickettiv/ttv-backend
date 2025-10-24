import { MutationResolvers } from '../../../generated/graphql.js';
import { GraphQLError } from 'graphql';

const requireAuth = (user: any) => {
  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};

export const createReviewResolver: MutationResolvers['createReview'] = async (
  _parent,
  { input },
  { user, prisma }
) => {
  requireAuth(user);

  // Check if user already reviewed this game
  const existingReview = await prisma.review.findUnique({
    where: {
      userId_gameId: {
        userId: user!.id,
        gameId: input.gameId,
      },
    },
  });

  if (existingReview) {
    throw new GraphQLError('You have already reviewed this game', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  return prisma.review.create({
    data: {
      userId: user!.id,
      gameId: input.gameId,
      rating: input.rating,
      title: input.title ?? undefined,
      comment: input.comment ?? undefined,
    },
  });
};

export const updateReviewResolver: MutationResolvers['updateReview'] = async (
  _parent,
  { id, input },
  { user, prisma }
) => {
  requireAuth(user);

  // Get review to check ownership
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new GraphQLError('Review not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Users can only update their own reviews
  if (review.userId !== user!.id) {
    throw new GraphQLError('Not authorized to update this review', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  const data: Record<string, any> = {};
  if (input.rating != null) data.rating = input.rating;
  if (input.title !== undefined) data.title = input.title;
  if (input.comment !== undefined) data.comment = input.comment;

  return prisma.review.update({
    where: { id },
    data,
  });
};

export const deleteReviewResolver: MutationResolvers['deleteReview'] = async (
  _parent,
  { id },
  { user, prisma }
) => {
  requireAuth(user);

  // Get review to check ownership
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new GraphQLError('Review not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  // Users can delete their own reviews, admins can delete any
  if (review.userId !== user!.id && user!.role !== 'ADMIN') {
    throw new GraphQLError('Not authorized to delete this review', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  await prisma.review.delete({
    where: { id },
  });

  return true;
};
