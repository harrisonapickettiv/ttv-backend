import { describe, it, expect, beforeEach } from 'vitest';
import {
  executeOperation,
  extractData,
  expectError,
} from '../../test/helpers/graphql';
import { testDb } from '../../test/helpers/db';

describe('Publisher Resolvers', () => {
  let testData: Awaited<ReturnType<typeof testDb.seed>>;

  beforeEach(async () => {
    testData = await testDb.seed();
  });

  describe('Query: publishers', () => {
    it('should return all publishers', async () => {
      const query = `
        query GetPublishers {
          publishers {
            id
            name
            country
          }
        }
      `;

      const response = await executeOperation<{
        publishers: Array<{ name: string }>;
      }>({ query });
      const data = extractData(response);

      expect(data.publishers).toHaveLength(1);
      expect(data.publishers[0].name).toBe('CMON');
    });

    it('should include games for each publisher', async () => {
      const query = `
        query GetPublishersWithGames {
          publishers {
            id
            name
            games {
              id
              name
            }
          }
        }
      `;

      const response = await executeOperation<{
        publishers: Array<{ name: string; games: Array<{ name: string }> }>;
      }>({ query });
      const data = extractData(response);

      expect(data.publishers[0].games).toHaveLength(2);
      expect(data.publishers[0].games.map((g) => g.name)).toContain(
        'Zombicide'
      );
    });
  });

  describe('Query: publisher', () => {
    it('should return a specific publisher by id', async () => {
      const publisherId = testData.publisher.id;
      const query = `
        query GetPublisher($id: ID!) {
          publisher(id: $id) {
            id
            name
            country
            website
          }
        }
      `;

      const response = await executeOperation<{
        publisher: { name: string; country: string; website: string };
      }>({
        query,
        variables: { id: publisherId },
      });
      const data = extractData(response);

      expect(data.publisher.name).toBe('CMON');
      expect(data.publisher.country).toBe('United States');
      expect(data.publisher.website).toBe('https://cmon.com');
    });
  });

  describe('Mutation: createPublisher', () => {
    it('should create a new publisher', async () => {
      const mutation = `
        mutation CreatePublisher($input: CreatePublisherInput!) {
          createPublisher(input: $input) {
            id
            name
            country
            website
          }
        }
      `;

      const input = {
        name: 'Fantasy Flight Games',
        country: 'United States',
        website: 'https://www.fantasyflightgames.com',
      };

      const response = await executeOperation<{
        createPublisher: { name: string; country: string };
      }>({
        query: mutation,
        variables: { input },
      });
      const data = extractData(response);

      expect(data.createPublisher.name).toBe('Fantasy Flight Games');
      expect(data.createPublisher.country).toBe('United States');
    });

    it('should enforce unique publisher names', async () => {
      const mutation = `
        mutation CreatePublisher($input: CreatePublisherInput!) {
          createPublisher(input: $input) {
            id
            name
          }
        }
      `;

      const input = {
        name: 'CMON', // Already exists
        country: 'Canada',
      };

      const response = await executeOperation<{
        createPublisher: { name: string };
      }>({
        query: mutation,
        variables: { input },
      });

      // Should have errors
      const errors = expectError(response, 'Unique constraint');
      expect(errors).toBeDefined();
      expect(errors[0].message).toContain('Unique constraint');
    });
  });

  describe('Mutation: updatePublisher', () => {
    it('should update publisher details', async () => {
      const publisherId = testData.publisher.id;
      const mutation = `
        mutation UpdatePublisher($id: ID!, $input: UpdatePublisherInput!) {
          updatePublisher(id: $id, input: $input) {
            id
            name
            country
            website
          }
        }
      `;

      const response = await executeOperation<{
        updatePublisher: { country: string; website: string };
      }>({
        query: mutation,
        variables: {
          id: publisherId,
          input: {
            country: 'Canada',
            website: 'https://new-website.com',
          },
        },
      });
      const data = extractData(response);

      expect(data.updatePublisher.country).toBe('Canada');
      expect(data.updatePublisher.website).toBe('https://new-website.com');
    });
  });
});
