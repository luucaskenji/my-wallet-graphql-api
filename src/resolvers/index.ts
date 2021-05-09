import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories';
import { User } from '../models';
import type { createUserArgs } from '../types/resolvers';

export default {
  Mutation: {
    createUser(_, args: createUserArgs) {
      const {
        firstName,
        lastName,
        email,
        password,
      } = args.input;
      const newUser = new User(firstName, lastName, email, password);

      return getCustomRepository(UserRepository).save(newUser);
    },
  },
};
