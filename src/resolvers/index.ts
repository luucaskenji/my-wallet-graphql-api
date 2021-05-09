import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories';
import type { createUserArgs } from '../types/resolvers';

export default {
  Mutation: {
    createUser(_: any, args: { input: createUserArgs }) {
      return getCustomRepository(UserRepository).saveIfNotExists(args.input);
    },
  },
};
