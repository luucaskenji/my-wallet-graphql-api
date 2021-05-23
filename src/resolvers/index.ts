import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import { AuthenticationError, ExpressContext, UserInputError } from 'apollo-server-express';
import { NotFoundError } from '@/errors';

import { User } from '@/models';
import { SessionRepository, UserRepository } from '../repositories';
import { createFinanceArgs, createSessionArgs, createUserArgs } from '../types/resolvers';
import { userValidations, financeValidations } from '../validations';

const checkAuth = (ctx: ExpressContext): void => {
  const { req: { headers: { authorization } } } = ctx;

  if (!authorization) throw new AuthenticationError('invalid request headers');

  const requestToken = authorization.split(' ')[1];
  if (!authorization || !requestToken) throw new AuthenticationError('invalid request headers');

  jwt.verify(requestToken, process.env.JWT_SECRET, (err) => {
    if (err) throw new AuthenticationError('invalid token');
  });
};

export default {
  Mutation: {
    createUser(_: any, args: { input: createUserArgs }): Promise<User | void> {
      const { error } = userValidations.signUp.validate(args.input);
      if (error) throw new UserInputError(error.message);

      return getCustomRepository(UserRepository).saveIfNotExists(args.input);
    },
    async createSession(
      _: any,
      args: { input: createSessionArgs },
    ): Promise<{ user: User, token: string } | void> {
      const { error } = userValidations.signIn.validate(args.input);
      if (error) throw new UserInputError(error.message);

      const user = await getCustomRepository(UserRepository).findOne({ email: args.input.email });
      if (!user) throw new NotFoundError('user not found');

      getCustomRepository(UserRepository).verifyPassword(args.input.password, user.password);

      let newSession = getCustomRepository(SessionRepository).create();
      newSession.user = user;

      newSession = await getCustomRepository(SessionRepository).save(newSession);

      const token = jwt.sign(
        { id: newSession.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );

      return { user, token };
    },
    async createFinance(
      _: any,
      args: { input: createFinanceArgs },
      context: ExpressContext,
    ): Promise<any> { // to do: cast promise return
      checkAuth(context);

      const { error } = financeValidations.financeInfo.validate(args.input);
      if (error) throw new UserInputError(error.message);
    },
  },
};
