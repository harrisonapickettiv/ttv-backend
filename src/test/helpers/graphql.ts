import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../../schema/typeDefs';
import { resolvers } from '../../schema/resolvers';
import { createContext } from '../../context';
import { testDb } from './db';
import type { GraphQLContext } from '../../context';
import { type User } from '../../generated/prisma-test';

let testServer: ApolloServer<GraphQLContext>;

export const getTestServer = () => {
  if (!testServer) {
    testServer = new ApolloServer<GraphQLContext>({
      typeDefs,
      resolvers,
    });
  }
  return testServer;
};

interface ExecuteOperationOptions {
  query: string;
  variables?: Record<string, unknown>;
  user?: User | null; // User object to set in context
}

// Simplified return type that matches what we actually use
interface TestResponse<T> {
  data?: T | null;
  errors?: ReadonlyArray<{
    message: string;
    extensions?: Record<string, unknown>;
  }>;
}

export const executeOperation = async <T = unknown>({
  query,
  variables,
  user,
}: ExecuteOperationOptions): Promise<TestResponse<T>> => {
  const server = getTestServer();
  const context = createContext(testDb.client, user);

  const response = await server.executeOperation(
    {
      query,
      variables,
    },
    {
      contextValue: context,
    }
  );

  // Extract the data/errors from Apollo's complex response type
  if (response.body.kind === 'single') {
    return {
      data: response.body.singleResult.data as T | null | undefined,
      errors: response.body.singleResult.errors,
    };
  }

  // Handle incremental results (shouldn't happen in tests, but handle it)
  throw new Error('Incremental results not supported in tests');
};

// Helper to extract data and throw on errors
export const extractData = <T>(response: TestResponse<T>): T => {
  if (response.errors && response.errors.length > 0) {
    throw new Error(
      `GraphQL errors: ${JSON.stringify(response.errors, null, 2)}`
    );
  }

  if (!response.data) {
    throw new Error('No data returned from GraphQL operation');
  }

  return response.data;
};

// Helper to check for expected errors (useful for validation tests)
export const expectError = <T>(
  response: TestResponse<T>,
  expectedMessage?: string
) => {
  if (!response.errors || response.errors.length === 0) {
    throw new Error('Expected GraphQL errors but got none');
  }

  if (expectedMessage) {
    const hasMatch = response.errors.some((err) =>
      err.message.includes(expectedMessage)
    );
    if (!hasMatch) {
      throw new Error(
        `Expected error containing "${expectedMessage}" but got: ${response.errors[0].message}`
      );
    }
  }

  return response.errors;
};
