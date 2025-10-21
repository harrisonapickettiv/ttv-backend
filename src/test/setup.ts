import { beforeAll, afterAll, beforeEach } from 'vitest';
import { testDb } from './helpers/db';

// Initialize test database before all tests
beforeAll(async () => {
  await testDb.connect();
});

// Clean database before each test
beforeEach(async () => {
  await testDb.clean();
});

// Disconnect after all tests
afterAll(async () => {
  await testDb.disconnect();
});
