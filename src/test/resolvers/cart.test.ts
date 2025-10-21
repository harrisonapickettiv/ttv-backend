import { describe, it, expect, beforeEach } from 'vitest';
import {
  executeOperation,
  extractData,
  expectError,
} from '../../test/helpers/graphql';
import { testDb } from '../../test/helpers/db';

describe('Cart Resolvers', () => {
  let testData: Awaited<ReturnType<typeof testDb.seed>>;

  beforeEach(async () => {
    testData = await testDb.seed();
  });

  describe('Query: myCart', () => {
    it('should return user\'s cart', async () => {
      const query = `
        query MyCart {
          myCart {
            id
            user {
              email
            }
            items {
              id
              quantity
            }
          }
        }
      `;

      const response = await executeOperation<{
        myCart: { id: string; items: Array<any> };
      }>({
        query,
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.myCart.id).toBe(testData.cart.id);
      expect(data.myCart.items).toEqual([]);
    });

    it('should create cart if not exists', async () => {
      // Delete existing cart first
      await testDb.client.cart.delete({
        where: { id: testData.cart.id },
      });

      const query = `
        query MyCart {
          myCart {
            id
            user {
              email
            }
          }
        }
      `;

      const response = await executeOperation<{
        myCart: { id: string };
      }>({
        query,
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.myCart.id).toBeTruthy();

      // Verify cart was created
      const cart = await testDb.client.cart.findUnique({
        where: { userId: testData.user.id },
      });
      expect(cart).toBeTruthy();
    });

    it('should reject unauthenticated user', async () => {
      const query = `
        query MyCart {
          myCart {
            id
          }
        }
      `;

      const response = await executeOperation<{
        myCart: { id: string };
      }>({
        query,
      });

      const errors = expectError(response, 'Not authenticated');
      expect(errors[0].extensions?.code).toBe('UNAUTHENTICATED');
    });
  });

  describe('Mutation: addToCart', () => {
    it('should add item to cart', async () => {
      const mutation = `
        mutation AddToCart($input: AddToCartInput!) {
          addToCart(input: $input) {
            id
            items {
              id
              quantity
              game {
                name
              }
            }
          }
        }
      `;

      const input = {
        gameId: testData.games[0].id,
        quantity: 2,
      };

      const response = await executeOperation<{
        addToCart: { items: Array<{ quantity: number; game: { name: string } }> };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.addToCart.items).toHaveLength(1);
      expect(data.addToCart.items[0].quantity).toBe(2);
      expect(data.addToCart.items[0].game.name).toBe('Zombicide');
    });

    it('should increment quantity if item already in cart', async () => {
      // Add item first time
      await testDb.client.cartItem.create({
        data: {
          cartId: testData.cart.id,
          gameId: testData.games[0].id,
          quantity: 1,
        },
      });

      const mutation = `
        mutation AddToCart($input: AddToCartInput!) {
          addToCart(input: $input) {
            items {
              quantity
            }
          }
        }
      `;

      const input = {
        gameId: testData.games[0].id,
        quantity: 2,
      };

      const response = await executeOperation<{
        addToCart: { items: Array<{ quantity: number }> };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.addToCart.items[0].quantity).toBe(3); // 1 + 2
    });
  });

  describe('Mutation: updateCartItem', () => {
    it('should update item quantity', async () => {
      // Add item to cart first
      const cartItem = await testDb.client.cartItem.create({
        data: {
          cartId: testData.cart.id,
          gameId: testData.games[0].id,
          quantity: 1,
        },
      });

      const mutation = `
        mutation UpdateCartItem($input: UpdateCartItemInput!) {
          updateCartItem(input: $input) {
            items {
              quantity
            }
          }
        }
      `;

      const input = {
        cartItemId: cartItem.id,
        quantity: 5,
      };

      const response = await executeOperation<{
        updateCartItem: { items: Array<{ quantity: number }> };
      }>({
        query: mutation,
        variables: { input },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.updateCartItem.items[0].quantity).toBe(5);
    });
  });

  describe('Mutation: removeFromCart', () => {
    it('should remove item from cart', async () => {
      // Add item to cart first
      const cartItem = await testDb.client.cartItem.create({
        data: {
          cartId: testData.cart.id,
          gameId: testData.games[0].id,
          quantity: 2,
        },
      });

      const mutation = `
        mutation RemoveFromCart($cartItemId: ID!) {
          removeFromCart(cartItemId: $cartItemId) {
            items {
              id
            }
          }
        }
      `;

      const response = await executeOperation<{
        removeFromCart: { items: Array<any> };
      }>({
        query: mutation,
        variables: { cartItemId: cartItem.id },
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.removeFromCart.items).toHaveLength(0);
    });
  });

  describe('Mutation: clearCart', () => {
    it('should clear all items from cart', async () => {
      // Add multiple items
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
        mutation ClearCart {
          clearCart
        }
      `;

      const response = await executeOperation<{
        clearCart: boolean;
      }>({
        query: mutation,
        user: testData.user,
      });
      const data = extractData(response);

      expect(data.clearCart).toBe(true);

      // Verify cart is empty
      const cart = await testDb.client.cart.findUnique({
        where: { id: testData.cart.id },
        include: { items: true },
      });
      expect(cart?.items).toHaveLength(0);
    });
  });
});