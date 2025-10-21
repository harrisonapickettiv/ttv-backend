import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/generated/**',
        'src/test/**',
        '**/*.test.ts',
        '**/node_modules/**',
      ],
    },
    // Run tests serially to avoid database conflicts
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // Increase timeout for database operations
    testTimeout: 10000,
    hookTimeout: 30000,
  },
});
