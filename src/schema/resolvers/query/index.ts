import { helloResolver } from './hello.js';
import { gameResolver } from './game.js';
import { gamesResolver } from './games.js';
import { publisherResolver } from './publisher.js';
import { publishersResolver } from './publishers.js';
import { categoryResolver } from './category.js';
import { categoriesResolver } from './categories.js';
import { mechanicResolver } from './mechanic.js';
import { mechanicsResolver } from './mechanics.js';
import { designerResolver } from './designer.js';
import { designersResolver } from './designers.js';
import { userResolver, usersResolver } from './user.js';
import { meResolver } from './me.js';
import { reviewResolver } from './review.js';
import { reviewsResolver } from './reviews.js';
import { myReviewsResolver } from './myReviews.js';
import { myCartResolver } from './myCart.js';
import { orderResolver } from './order.js';
import { myOrdersResolver } from './myOrders.js';

export const Query = {
  hello: helloResolver,
  game: gameResolver,
  games: gamesResolver,
  publisher: publisherResolver,
  publishers: publishersResolver,
  category: categoryResolver,
  categories: categoriesResolver,
  mechanic: mechanicResolver,
  mechanics: mechanicsResolver,
  designer: designerResolver,
  designers: designersResolver,
  user: userResolver,
  users: usersResolver,
  me: meResolver,
  review: reviewResolver,
  reviews: reviewsResolver,
  myReviews: myReviewsResolver,
  myCart: myCartResolver,
  order: orderResolver,
  myOrders: myOrdersResolver,
};
