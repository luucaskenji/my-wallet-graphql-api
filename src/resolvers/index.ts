import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import { SessionRepository, UserRepository } from '../repositories';
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

      const user = await getCustomRepository(UserRepository).findOne({ email: args.input.email });
      if (!user) throw new Error('user not found');

      await getCustomRepository(UserRepository).verifyPassword(args.input.password, user.password);
    },
  },
};
