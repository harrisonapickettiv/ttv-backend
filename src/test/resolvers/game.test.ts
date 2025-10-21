import { describe, it, expect, beforeEach } from 'vitest';
import {
  executeOperation,
  extractData,
  expectError,
} from '../../test/helpers/graphql';
import { testDb } from '../../test/helpers/db';

describe('Game Resolvers', () => {
  let testData: Awaited<ReturnType<typeof testDb.seed>>;

  beforeEach(async () => {
    testData = await testDb.seed();
  });

  describe('Query: games', () => {
    it('should return all games', async () => {
      const query = `
        query GetGames {
          games {
            id
            name
            price
            stock
          }
        }
      `;

      const response = await executeOperation<{
        games: Array<{ id: string; name: string }>;
      }>({
        query,
      });
      const data = extractData(response);

      expect(data.games).toHaveLength(2);
      expect(data.games.map((g) => g.name)).toContain('Zombicide');
      expect(data.games.map((g) => g.name)).toContain('Blood Rage');
    });

    it('should include publisher data', async () => {
      const query = `
        query GetGamesWithPublisher {
          games {
            id
            name
            publisher {
              id
              name
              country
            }
          }
        }
      `;

      const response = await executeOperation<{
        games: Array<{
          name: string;
          publisher: { name: string; country: string };
        }>;
      }>({ query });
      const data = extractData(response);

      expect(data.games[0].publisher.name).toBe('CMON');
      expect(data.games[0].publisher.country).toBe('United States');
    });
  });

  describe('Query: game', () => {
    it('should return a specific game by id', async () => {
      const gameId = testData.games[0].id;
      const query = `
        query GetGame($id: ID!) {
          game(id: $id) {
            id
            name
            description
            price
          }
        }
      `;

      const response = await executeOperation<{
        game: { name: string; price: number };
      }>({
        query,
        variables: { id: gameId },
      });
      const data = extractData(response);

      expect(data.game.name).toBe('Zombicide');
      expect(data.game.price).toBe(89.99);
    });

    it('should return null for non-existent game', async () => {
      const query = `
        query GetGame($id: ID!) {
          game(id: $id) {
            id
            name
          }
        }
      `;

      const response = await executeOperation<{ game: null }>({
        query,
        variables: { id: 'non-existent-id' },
      });
      const data = extractData(response);

      expect(data.game).toBeNull();
    });
  });

  describe('Mutation: createGame', () => {
    it('should create a new game', async () => {
      const mutation = `
        mutation CreateGame($input: CreateGameInput!) {
          createGame(input: $input) {
            id
            name
            price
            stock
            publisher {
              name
            }
          }
        }
      `;

      const input = {
        name: 'Rising Sun',
        description: 'War and honor in feudal Japan',
        minPlayers: 3,
        maxPlayers: 5,
        playtime: 120,
        price: 99.99,
        stock: 10,
        publisherId: testData.publisher.id,
      };

      const response = await executeOperation<{
        createGame: {
          name: string;
          price: number;
          publisher: { name: string };
        };
      }>({
        query: mutation,
        variables: { input },
      });
      const data = extractData(response);

      expect(data.createGame.name).toBe('Rising Sun');
      expect(data.createGame.price).toBe(99.99);
      expect(data.createGame.publisher.name).toBe('CMON');

      // Verify it was actually saved
      const savedGame = await testDb.client.game.findFirst({
        where: { name: 'Rising Sun' },
      });
      expect(savedGame).toBeTruthy();
    });
  });

  describe('Mutation: updateGame', () => {
    it('should update game price and stock', async () => {
      const gameId = testData.games[0].id;
      const mutation = `
        mutation UpdateGame($id: ID!, $input: UpdateGameInput!) {
          updateGame(id: $id, input: $input) {
            id
            name
            price
            stock
          }
        }
      `;

      const response = await executeOperation<{
        updateGame: { price: number; stock: number };
      }>({
        query: mutation,
        variables: {
          id: gameId,
          input: { price: 79.99, stock: 20 },
        },
      });
      const data = extractData(response);

      expect(data.updateGame.price).toBe(79.99);
      expect(data.updateGame.stock).toBe(20);
    });
  });

  describe('Mutation: deleteGame', () => {
    it('should delete a game', async () => {
      const gameId = testData.games[0].id;
      const mutation = `
        mutation DeleteGame($id: ID!) {
          deleteGame(id: $id)
        }
      `;

      const response = await executeOperation<{ deleteGame: boolean }>({
        query: mutation,
        variables: { id: gameId },
      });
      const data = extractData(response);

      expect(data.deleteGame).toBe(true);

      // Verify it was deleted
      const deletedGame = await testDb.client.game.findUnique({
        where: { id: gameId },
      });
      expect(deletedGame).toBeNull();
    });
  });
});
