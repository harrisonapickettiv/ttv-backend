import { describe, it, expect, beforeEach } from 'vitest';
import {
  executeOperation,
  extractData,
  expectError,
} from '../../test/helpers/graphql';
import { testDb } from '../../test/helpers/db';

describe('Authentication Resolvers', () => {
  let testData: Awaited<ReturnType<typeof testDb.seed>>;

  beforeEach(async () => {
    testData = await testDb.seed();
  });

  describe('Mutation: register', () => {
    it('should register a new user and return token', async () => {
      const mutation = `
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            token
            user {
              id
              email
              firstName
              lastName
              role
            }
          }
        }
      `;

      const input = {
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'New',
        lastName: 'User',
      };

      const response = await executeOperation<{
        register: {
          token: string;
          user: { email: string; firstName: string; lastName: string; role: string };
        };
      }>({
        query: mutation,
        variables: { input },
      });
      const data = extractData(response);

      expect(data.register.token).toBeTruthy();
      expect(data.register.user.email).toBe('newuser@example.com');
      expect(data.register.user.firstName).toBe('New');
      expect(data.register.user.lastName).toBe('User');
      expect(data.register.user.role).toBe('CUSTOMER');

      // Verify user was created in database
      const user = await testDb.client.user.findUnique({
        where: { email: 'newuser@example.com' },
      });
      expect(user).toBeTruthy();
      expect(user?.passwordHash).not.toBe('password123'); // Password should be hashed

      // Verify cart was created for user
      const cart = await testDb.client.cart.findUnique({
        where: { userId: user!.id },
      });
      expect(cart).toBeTruthy();
    });

    it('should reject duplicate email addresses', async () => {
      const mutation = `
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            token
            user {
              email
            }
          }
        }
      `;

      const input = {
        email: 'test@example.com', // Already exists in seed data
        password: 'password123',
        firstName: 'Duplicate',
        lastName: 'User',
      };

      const response = await executeOperation<{
        register: { token: string };
      }>({
        query: mutation,
        variables: { input },
      });

      const errors = expectError(response, 'already exists');
      expect(errors[0].message).toContain('already exists');
    });
  });

  describe('Mutation: login', () => {
    it('should login with valid credentials', async () => {
      const mutation = `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
            user {
              id
              email
              role
            }
          }
        }
      `;

      const input = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await executeOperation<{
        login: {
          token: string;
          user: { email: string; role: string };
        };
      }>({
        query: mutation,
        variables: { input },
      });
      const data = extractData(response);

      expect(data.login.token).toBeTruthy();
      expect(data.login.user.email).toBe('test@example.com');
      expect(data.login.user.role).toBe('CUSTOMER');
    });

    it('should reject invalid email', async () => {
      const mutation = `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
          }
        }
      `;

      const input = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      const response = await executeOperation<{
        login: { token: string };
      }>({
        query: mutation,
        variables: { input },
      });

      const errors = expectError(response, 'Invalid');
      expect(errors[0].message).toContain('Invalid');
    });

    it('should reject invalid password', async () => {
      const mutation = `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
          }
        }
      `;

      const input = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const response = await executeOperation<{
        login: { token: string };
      }>({
        query: mutation,
        variables: { input },
      });

      const errors = expectError(response, 'Invalid');
      expect(errors[0].message).toContain('Invalid');
    });
  });

  describe('Query: me', () => {
    it('should return authenticated user', async () => {
      const query = `
        query Me {
          me {
            id
            email
            firstName
            lastName
            role
          }
        }
      `;

      const response = await executeOperation<{
        me: { email: string; role: string };
      }>({
        query,
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.me.email).toBe('test@example.com');
      expect(data.me.role).toBe('CUSTOMER');
    });

    it('should reject unauthenticated request', async () => {
      const query = `
        query Me {
          me {
            email
          }
        }
      `;

      const response = await executeOperation<{
        me: { email: string };
      }>({
        query,
      });

      const errors = expectError(response, 'Not authenticated');
      expect(errors[0].extensions?.code).toBe('UNAUTHENTICATED');
    });
  });
});