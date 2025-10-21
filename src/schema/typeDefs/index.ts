import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadGraphQL = (filename: string) =>
  readFileSync(join(__dirname, filename), 'utf-8');

export const typeDefs = [
  loadGraphQL('query.graphql'),
  loadGraphQL('mutation.graphql'),
  loadGraphQL('game.graphql'),
  loadGraphQL('publisher.graphql'),
  loadGraphQL('category.graphql'),
  loadGraphQL('mechanic.graphql'),
  loadGraphQL('designer.graphql'),
  loadGraphQL('user.graphql'),
  loadGraphQL('review.graphql'),
  loadGraphQL('cart.graphql'),
  loadGraphQL('order.graphql'),
];
