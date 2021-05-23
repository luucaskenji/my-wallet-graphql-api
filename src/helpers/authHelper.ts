import { getCustomRepository } from 'typeorm';
import { AuthenticationError, ExpressContext } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { User } from '@/models';
import { SessionRepository } from '@/repositories';

export const checkAuthAndReturnUser = async (ctx: ExpressContext): Promise<User> => {
  const { req: { headers: { authorization } } } = ctx;

  if (!authorization) throw new AuthenticationError('invalid request headers');

  const requestToken = authorization.split(' ')[1];
  if (!authorization || !requestToken) throw new AuthenticationError('invalid request headers');

  let sessionId: number;
  jwt.verify(requestToken, process.env.JWT_SECRET, (err, decoded: { id: number }) => {
    if (err) throw new AuthenticationError('invalid token');

    sessionId = decoded.id;
  });

  const session = await getCustomRepository(SessionRepository).findOne(sessionId, {
    loadRelationIds: true,
  });

  return session.user;
};
