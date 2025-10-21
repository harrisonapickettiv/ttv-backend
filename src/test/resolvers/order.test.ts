import { describe, it, expect, beforeEach } from 'vitest';
import {
  executeOperation,
  extractData,
  expectError,
} from '../../test/helpers/graphql';
import { testDb } from '../../test/helpers/db';

describe('Order Resolvers', () => {
  let testData: Awaited<ReturnType<typeof testDb.seed>>;

  beforeEach(async () => {
    testData = await testDb.seed();
  });

  describe('Query: myOrders', () => {
    it('should return user\'s orders', async () => {
      // Create an order first
      const order = await testDb.client.order.create({
        data: {
          userId: testData.user.id,
          orderNumber: 'ORD-001',
          totalAmount: 100,
          status: 'PENDING',
          shippingName: 'Test User',
          shippingAddress: '123 Main St',
          shippingCity: 'Portland',
          shippingState: 'OR',
          shippingZip: '97201',
          shippingCountry: 'USA',
        },
      });

      const query = `
        query MyOrders {
          myOrders {
            id
            orderNumber
            status
            totalAmount
          }
        }
      `;

      const response = await executeOperation<{
        myOrders: Array<{ orderNumber: string; status: string }>;
      }>({
        query,
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.myOrders).toHaveLength(1);
      expect(data.myOrders[0].orderNumber).toBe('ORD-001');
      expect(data.myOrders[0].status).toBe('PENDING');
    });

    it('should reject unauthenticated user', async () => {
      const query = `
        query MyOrders {
          myOrders {
            id
          }
        }
      `;

      const response = await executeOperation<{
        myOrders: Array<{ id: string }>;
      }>({
        query,
      });

      const errors = expectError(response, 'Not authenticated');
      expect(errors[0].extensions?.code).toBe('UNAUTHENTICATED');
    });
  });

  describe('Query: order', () => {
    it('should return user\'s own order', async () => {
      const order = await testDb.client.order.create({
        data: {
          userId: testData.user.id,
          orderNumber: 'ORD-002',
          totalAmount: 150,
          status: 'PROCESSING',
          shippingName: 'Test User',
          shippingAddress: '123 Main St',
          shippingCity: 'Portland',
          shippingState: 'OR',
          shippingZip: '97201',
          shippingCountry: 'USA',
        },
      });

      const query = `
        query GetOrder($id: ID!) {
          order(id: $id) {
            id
            orderNumber
            status
          }
        }
      `;

      const response = await executeOperation<{
        order: { orderNumber: string };
      }>({
        query,
        variables: { id: order.id },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.order.orderNumber).toBe('ORD-002');
    });

    it('should allow admin to view any order', async () => {
      const order = await testDb.client.order.create({
        data: {
          userId: testData.user.id,
          orderNumber: 'ORD-003',
          totalAmount: 200,
          status: 'SHIPPED',
          shippingName: 'Test User',
          shippingAddress: '123 Main St',
          shippingCity: 'Portland',
          shippingState: 'OR',
          shippingZip: '97201',
          shippingCountry: 'USA',
        },
      });

      const query = `
        query GetOrder($id: ID!) {
          order(id: $id) {
            orderNumber
          }
        }
      `;

      const response = await executeOperation<{
        order: { orderNumber: string };
      }>({
        query,
        variables: { id: order.id },
        user: testData.adminUser,
      });
      const data = extractData(response);

      expect(data.order.orderNumber).toBe('ORD-003');
    });

    it('should reject user viewing another user\'s order', async () => {
      const order = await testDb.client.order.create({
        data: {
          userId: testData.adminUser.id,
          orderNumber: 'ORD-004',
          totalAmount: 250,
          status: 'DELIVERED',
          shippingName: 'Admin User',
          shippingAddress: '456 Oak Ave',
          shippingCity: 'Seattle',
          shippingState: 'WA',
          shippingZip: '98101',
          shippingCountry: 'USA',
        },
      });

      const query = `
        query GetOrder($id: ID!) {
          order(id: $id) {
            orderNumber
          }
        }
      `;

      const response = await executeOperation<{
        order: { orderNumber: string };
      }>({
        query,
        variables: { id: order.id },
        user: testData.user, // Regular user trying to view admin's order
      });

      const errors = expectError(response, 'Not authorized');
      expect(errors[0].extensions?.code).toBe('FORBIDDEN');
    });
  });

  describe('Mutation: createOrder', () => {
    it('should create order from cart', async () => {
      // Add items to cart
      await testDb.client.cartItem.createMany({
        data: [
          {
            cartId: testData.cart.id,
            gameId: testData.games[0].id,
            quantity: 1,
          },
          {
            cartId: testData.cart.id,
            gameId: testData.games[1].id,
            quantity: 2,
          },
        ],
      });

      const mutation = `
        mutation CreateOrder($input: CreateOrderInput!) {
          createOrder(input: $input) {
            id
            status
            totalAmount
            items {
              quantity
              priceAtTime
              game {
                name
              }
            }
          }
        }
      `;

      const input = {
        shippingName: 'Test User',
        shippingAddress: '123 Main St',
        shippingCity: 'Portland',
        shippingState: 'OR',
        shippingZip: '97201',
        shippingCountry: 'USA',
      };

      const response = await executeOperation<{
        createOrder: { status: string; totalAmount: number; items: Array<any> };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.createOrder.status).toBe('PENDING');
      expect(data.createOrder.items).toHaveLength(2);
      expect(data.createOrder.totalAmount).toBeGreaterThan(0);

      // Verify cart was cleared
      const cart = await testDb.client.cart.findUnique({
        where: { id: testData.cart.id },
        include: { items: true },
      });
      expect(cart?.items).toHaveLength(0);
    });

    it('should reject empty cart', async () => {
      const mutation = `
        mutation CreateOrder($input: CreateOrderInput!) {
          createOrder(input: $input) {
            id
          }
        }
      `;

      const input = {
        shippingName: 'Test User',
        shippingAddress: '123 Main St',
        shippingCity: 'Portland',
        shippingState: 'OR',
        shippingZip: '97201',
        shippingCountry: 'USA',
      };

      const response = await executeOperation<{
        createOrder: { id: string };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user,
      });

      const errors = expectError(response, 'Cart is empty');
      expect(errors[0].message).toContain('Cart is empty');
    });
  });

  describe('Mutation: updateOrderStatus', () => {
    it('should allow admin to update order status', async () => {
      const order = await testDb.client.order.create({
        data: {
          userId: testData.user.id,
          orderNumber: 'ORD-005',
          totalAmount: 100,
          status: 'PENDING',
          shippingName: 'Test User',
          shippingAddress: '123 Main St',
          shippingCity: 'Portland',
          shippingState: 'OR',
          shippingZip: '97201',
          shippingCountry: 'USA',
        },
      });

      const mutation = `
        mutation UpdateOrderStatus($orderId: ID!, $input: UpdateOrderStatusInput!) {
          updateOrderStatus(orderId: $orderId, input: $input) {
            id
            status
          }
        }
      `;

      const response = await executeOperation<{
        updateOrderStatus: { status: string };
      }>({
        query: mutation,
        variables: { orderId: order.id, input: { status: 'SHIPPED' } },
        user: testData.adminUser,
      });
      const data = extractData(response);

      expect(data.updateOrderStatus.status).toBe('SHIPPED');
    });

    it('should reject non-admin user', async () => {
      const order = await testDb.client.order.create({
        data: {
          userId: testData.user.id,
          orderNumber: 'ORD-006',
          totalAmount: 100,
          status: 'PENDING',
          shippingName: 'Test User',
          shippingAddress: '123 Main St',
          shippingCity: 'Portland',
          shippingState: 'OR',
          shippingZip: '97201',
          shippingCountry: 'USA',
        },
      });

      const mutation = `
        mutation UpdateOrderStatus($orderId: ID!, $input: UpdateOrderStatusInput!) {
          updateOrderStatus(orderId: $orderId, input: $input) {
            status
          }
        }
      `;

      const response = await executeOperation<{
        updateOrderStatus: { status: string };
      }>({
        query: mutation,
        variables: { orderId: order.id, input: { status: 'SHIPPED' } },
        user: testData.user,
      });

      const errors = expectError(response, 'Admin only');
      expect(errors[0].extensions?.code).toBe('FORBIDDEN');
    });
  });

  describe('Mutation: cancelOrder', () => {
    it('should allow user to cancel own pending order', async () => {
      const order = await testDb.client.order.create({
        data: {
          userId: testData.user.id,
          orderNumber: 'ORD-007',
          totalAmount: 100,
          status: 'PENDING',
          shippingName: 'Test User',
          shippingAddress: '123 Main St',
          shippingCity: 'Portland',
          shippingState: 'OR',
          shippingZip: '97201',
          shippingCountry: 'USA',
        },
      });

      const mutation = `
        mutation CancelOrder($orderId: ID!) {
          cancelOrder(orderId: $orderId) {
            status
          }
        }
      `;

      const response = await executeOperation<{
        cancelOrder: { status: string };
      }>({
        query: mutation,
        variables: { orderId: order.id },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.cancelOrder.status).toBe('CANCELLED');
    });

    it('should reject cancelling shipped order', async () => {
      const order = await testDb.client.order.create({
        data: {
          userId: testData.user.id,
          orderNumber: 'ORD-008',
          totalAmount: 100,
          status: 'SHIPPED',
          shippingName: 'Test User',
          shippingAddress: '123 Main St',
          shippingCity: 'Portland',
          shippingState: 'OR',
          shippingZip: '97201',
          shippingCountry: 'USA',
        },
      });

      const mutation = `
        mutation CancelOrder($orderId: ID!) {
          cancelOrder(orderId: $orderId) {
            status
          }
        }
      `;

      const response = await executeOperation<{
        cancelOrder: { status: string };
      }>({
        query: mutation,
        variables: { orderId: order.id },
        user: testData.user,
      });

      const errors = expectError(response, 'Cannot cancel');
      expect(errors[0].message).toContain('Cannot cancel');
    });
  });
});