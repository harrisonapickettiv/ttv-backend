import { Resolvers } from '../../generated/graphql.js';
import { DateTimeResolver } from 'graphql-scalars';
import { Query } from './query/index.js';
import { Mutation } from './mutation/index.js';
import { Game } from './Game.js';
import { Publisher } from './Publisher.js';
import { Category } from './Category.js';
import { Mechanic } from './Mechanic.js';
import { Designer } from './Designer.js';
import { User } from './User.js';
import { Review } from './Review.js';
import { Cart } from './Cart.js';
import { CartItem } from './CartItem.js';
import { Order } from './Order.js';
import { OrderItem } from './OrderItem.js';

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query,
  Mutation,
  Game,
  Publisher,
  Category,
  Mechanic,
  Designer,
  User,
  Review,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
