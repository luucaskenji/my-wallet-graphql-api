import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories';
import { createSessionArgs, createUserArgs } from '../types/resolvers';
import userValidations from '../validations/userSchemas';

export default {
  Mutation: {
    createUser(_: any, args: { input: createUserArgs }) {
      const { error } = userValidations.signUp.validate(args.input);
      if (error) throw new Error(error.message);

      return getCustomRepository(UserRepository).saveIfNotExists(args.input);
    },
    async createSession(_: any, args: { input: createSessionArgs }) {
      const { error } = userValidations.signIn.validate(args.input);
      if (error) throw new Error(error.message);

      const isValidPassword = await getCustomRepository(UserRepository).verifyPassword(args.input);
      if (!isValidPassword) throw new Error('invalid password');
    },
  },
};
