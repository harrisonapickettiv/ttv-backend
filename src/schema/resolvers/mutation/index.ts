import {
  createGameResolver,
  updateGameResolver,
  deleteGameResolver,
} from './game.js';
import {
  createPublisherResolver,
  updatePublisherResolver,
  deletePublisherResolver,
} from './publisher.js';
import {
  registerResolver,
  loginResolver,
} from './auth.js';
import {
  createCategoryResolver,
  updateCategoryResolver,
  deleteCategoryResolver,
} from './category.js';
import {
  createMechanicResolver,
  updateMechanicResolver,
  deleteMechanicResolver,
} from './mechanic.js';
import {
  createDesignerResolver,
  updateDesignerResolver,
  deleteDesignerResolver,
} from './designer.js';
import {
  createReviewResolver,
  updateReviewResolver,
  deleteReviewResolver,
} from './review.js';
import {
  addToCartResolver,
  updateCartItemResolver,
  removeFromCartResolver,
  clearCartResolver,
} from './cart.js';
import {
  createOrderResolver,
  updateOrderStatusResolver,
  cancelOrderResolver,
} from './order.js';

export const Mutation = {
  // Auth
  register: registerResolver,
  login: loginResolver,

  // Game
  createGame: createGameResolver,
  updateGame: updateGameResolver,
  deleteGame: deleteGameResolver,

  // Publisher
  createPublisher: createPublisherResolver,
  updatePublisher: updatePublisherResolver,
  deletePublisher: deletePublisherResolver,

  // Category
  createCategory: createCategoryResolver,
  updateCategory: updateCategoryResolver,
  deleteCategory: deleteCategoryResolver,

  // Mechanic
  createMechanic: createMechanicResolver,
  updateMechanic: updateMechanicResolver,
  deleteMechanic: deleteMechanicResolver,

  // Designer
  createDesigner: createDesignerResolver,
  updateDesigner: updateDesignerResolver,
  deleteDesigner: deleteDesignerResolver,

  // Review
  createReview: createReviewResolver,
  updateReview: updateReviewResolver,
  deleteReview: deleteReviewResolver,

  // Cart
  addToCart: addToCartResolver,
  updateCartItem: updateCartItemResolver,
  removeFromCart: removeFromCartResolver,
  clearCart: clearCartResolver,

  // Order
  createOrder: createOrderResolver,
  updateOrderStatus: updateOrderStatusResolver,
  cancelOrder: cancelOrderResolver,
};
