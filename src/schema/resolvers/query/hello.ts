import { QueryResolvers } from '../../../generated/graphql.js';

export const helloResolver: QueryResolvers['hello'] = () => {
  return 'Hello from Tabletop Vault API!';
};
