import { describe, it, expect, beforeEach } from 'vitest';
import {
  executeOperation,
  extractData,
  expectError,
} from '../../test/helpers/graphql';
import { testDb } from '../../test/helpers/db';

describe('Category Resolvers', () => {
  let testData: Awaited<ReturnType<typeof testDb.seed>>;

  beforeEach(async () => {
    testData = await testDb.seed();
  });

  describe('Query: categories', () => {
    it('should return all categories', async () => {
      const query = `
        query GetCategories {
          categories {
            id
            name
            slug
            description
          }
        }
      `;

      const response = await executeOperation<{
        categories: Array<{ name: string; slug: string }>;
      }>({
        query,
      });
      const data = extractData(response);

      expect(data.categories).toHaveLength(1);
      expect(data.categories[0].name).toBe('Horror');
      expect(data.categories[0].slug).toBe('horror');
    });
  });

  describe('Query: category', () => {
    it('should return category by id', async () => {
      const query = `
        query GetCategory($id: ID) {
          category(id: $id) {
            id
            name
            slug
          }
        }
      `;

      const response = await executeOperation<{
        category: { name: string };
      }>({
        query,
        variables: { id: testData.category.id },
      });
      const data = extractData(response);

      expect(data.category.name).toBe('Horror');
    });

    it('should return category by slug', async () => {
      const query = `
        query GetCategory($slug: String) {
          category(slug: $slug) {
            id
            name
          }
        }
      `;

      const response = await executeOperation<{
        category: { name: string };
      }>({
        query,
        variables: { slug: 'horror' },
      });
      const data = extractData(response);

      expect(data.category.name).toBe('Horror');
    });
  });

  describe('Mutation: createCategory', () => {
    it('should create category as admin', async () => {
      const mutation = `
        mutation CreateCategory($input: CreateCategoryInput!) {
          createCategory(input: $input) {
            id
            name
            slug
            description
          }
        }
      `;

      const input = {
        name: 'Strategy',
        slug: 'strategy',
        description: 'Strategic thinking games',
      };

      const response = await executeOperation<{
        createCategory: { name: string; slug: string };
      }>({
        query: mutation,
        variables: { input },
        user: testData.adminUser,
      });
      const data = extractData(response);

      expect(data.createCategory.name).toBe('Strategy');
      expect(data.createCategory.slug).toBe('strategy');
    });

    it('should reject non-admin user', async () => {
      const mutation = `
        mutation CreateCategory($input: CreateCategoryInput!) {
          createCategory(input: $input) {
            id
          }
        }
      `;

      const input = {
        name: 'Strategy',
        slug: 'strategy',
      };

      const response = await executeOperation<{
        createCategory: { id: string };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user, // Regular user, not admin
      });

      const errors = expectError(response, 'Admin only');
      expect(errors[0].extensions?.code).toBe('FORBIDDEN');
    });
  });

  describe('Mutation: updateCategory', () => {
    it('should update category as admin', async () => {
      const mutation = `
        mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
          updateCategory(id: $id, input: $input) {
            id
            name
            description
          }
        }
      `;

      const input = {
        description: 'Updated description',
      };

      const response = await executeOperation<{
        updateCategory: { description: string };
      }>({
        query: mutation,
        variables: { id: testData.category.id, input },
        user: testData.adminUser,
      });
      const data = extractData(response);

      expect(data.updateCategory.description).toBe('Updated description');
    });
  });

  describe('Mutation: deleteCategory', () => {
    it('should delete category as admin', async () => {
      const mutation = `
        mutation DeleteCategory($id: ID!) {
          deleteCategory(id: $id)
        }
      `;

      const response = await executeOperation<{
        deleteCategory: boolean;
      }>({
        query: mutation,
        variables: { id: testData.category.id },
        user: testData.adminUser,
      });
      const data = extractData(response);

      expect(data.deleteCategory).toBe(true);

      // Verify deletion
      const deleted = await testDb.client.category.findUnique({
        where: { id: testData.category.id },
      });
      expect(deleted).toBeNull();
    });
  });
});