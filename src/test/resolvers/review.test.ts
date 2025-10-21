import { describe, it, expect, beforeEach } from 'vitest';
import {
  executeOperation,
  extractData,
  expectError,
} from '../../test/helpers/graphql';
import { testDb } from '../../test/helpers/db';

describe('Review Resolvers', () => {
  let testData: Awaited<ReturnType<typeof testDb.seed>>;

  beforeEach(async () => {
    testData = await testDb.seed();
  });

  describe('Query: reviews', () => {
    it('should return all reviews', async () => {
      const query = `
        query GetReviews {
          reviews {
            id
            rating
            comment
            user {
              firstName
              lastName
            }
            game {
              name
            }
          }
        }
      `;

      const response = await executeOperation<{
        reviews: Array<{ rating: number; comment: string }>;
      }>({
        query,
      });
      const data = extractData(response);

      expect(data.reviews).toHaveLength(1);
      expect(data.reviews[0].rating).toBe(5);
      expect(data.reviews[0].comment).toBe('Amazing game!');
    });

    it('should filter reviews by gameId', async () => {
      const query = `
        query GetReviews($gameId: ID) {
          reviews(gameId: $gameId) {
            id
            rating
          }
        }
      `;

      const response = await executeOperation<{
        reviews: Array<{ rating: number }>;
      }>({
        query,
        variables: { gameId: testData.games[0].id },
      });
      const data = extractData(response);

      expect(data.reviews).toHaveLength(1);
      expect(data.reviews[0].rating).toBe(5);
    });
  });

  describe('Query: review', () => {
    it('should return specific review', async () => {
      const query = `
        query GetReview($id: ID!) {
          review(id: $id) {
            id
            rating
            comment
          }
        }
      `;

      const response = await executeOperation<{
        review: { rating: number };
      }>({
        query,
        variables: { id: testData.review.id },
      });
      const data = extractData(response);

      expect(data.review.rating).toBe(5);
    });
  });

  describe('Mutation: createReview', () => {
    it('should create review for authenticated user', async () => {
      const mutation = `
        mutation CreateReview($input: CreateReviewInput!) {
          createReview(input: $input) {
            id
            rating
            comment
            user {
              email
            }
          }
        }
      `;

      const input = {
        gameId: testData.games[1].id, // Blood Rage
        rating: 4,
        comment: 'Great game!',
      };

      const response = await executeOperation<{
        createReview: { rating: number; comment: string };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.createReview.rating).toBe(4);
      expect(data.createReview.comment).toBe('Great game!');
    });

    it('should reject duplicate review', async () => {
      const mutation = `
        mutation CreateReview($input: CreateReviewInput!) {
          createReview(input: $input) {
            id
          }
        }
      `;

      const input = {
        gameId: testData.games[0].id, // Already reviewed
        rating: 3,
      };

      const response = await executeOperation<{
        createReview: { id: string };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user,
      });

      const errors = expectError(response, 'already reviewed');
      expect(errors[0].message).toContain('already reviewed');
    });

    it('should reject unauthenticated user', async () => {
      const mutation = `
        mutation CreateReview($input: CreateReviewInput!) {
          createReview(input: $input) {
            id
          }
        }
      `;

      const input = {
        gameId: testData.games[1].id,
        rating: 4,
      };

      const response = await executeOperation<{
        createReview: { id: string };
      }>({
        query: mutation,
        variables: { input },
      });

      const errors = expectError(response, 'Not authenticated');
      expect(errors[0].extensions?.code).toBe('UNAUTHENTICATED');
    });
  });

  describe('Mutation: updateReview', () => {
    it('should update own review', async () => {
      const mutation = `
        mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
          updateReview(id: $id, input: $input) {
            id
            rating
            comment
          }
        }
      `;

      const input = {
        rating: 4,
        comment: 'Updated comment',
      };

      const response = await executeOperation<{
        updateReview: { rating: number; comment: string };
      }>({
        query: mutation,
        variables: { id: testData.review.id, input },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.updateReview.rating).toBe(4);
      expect(data.updateReview.comment).toBe('Updated comment');
    });

    it('should reject updating someone else\'s review', async () => {
      const mutation = `
        mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
          updateReview(id: $id, input: $input) {
            id
          }
        }
      `;

      const input = {
        rating: 1,
      };

      const response = await executeOperation<{
        updateReview: { id: string };
      }>({
        query: mutation,
        variables: { id: testData.review.id, input },
        user: testData.adminUser, // Different user
      });

      const errors = expectError(response, 'Not authorized');
      expect(errors[0].extensions?.code).toBe('FORBIDDEN');
    });
  });

  describe('Mutation: deleteReview', () => {
    it('should delete own review', async () => {
      const mutation = `
        mutation DeleteReview($id: ID!) {
          deleteReview(id: $id)
        }
      `;

      const response = await executeOperation<{
        deleteReview: boolean;
      }>({
        query: mutation,
        variables: { id: testData.review.id },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.deleteReview).toBe(true);

      // Verify deletion
      const deleted = await testDb.client.review.findUnique({
        where: { id: testData.review.id },
      });
      expect(deleted).toBeNull();
    });

    it('should allow admin to delete any review', async () => {
      const mutation = `
        mutation DeleteReview($id: ID!) {
          deleteReview(id: $id)
        }
      `;

      const response = await executeOperation<{
        deleteReview: boolean;
      }>({
        query: mutation,
        variables: { id: testData.review.id },
        user: testData.adminUser, // Admin can delete any review
      });
      const data = extractData(response);

      expect(data.deleteReview).toBe(true);
    });
  });
});