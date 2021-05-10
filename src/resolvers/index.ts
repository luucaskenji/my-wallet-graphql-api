import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories';
import { createUserArgs } from '../types/resolvers';
import userValidations from '../validations/userSchemas';

export default {
  Mutation: {
    createUser(_: any, args: { input: createUserArgs }) {
      const { error } = userValidations.signUp.validate(args.input);
      if (error) throw new Error(error.message);

      return getCustomRepository(UserRepository).saveIfNotExists(args.input);
    },
  },
};
