import { mocked } from 'ts-jest/utils';
import { getCustomRepository } from 'typeorm';
import { ExpressContext } from 'apollo-server-express';

import { checkAuthAndReturnUser } from '@/helpers/authHelper';
import { defaultUserModel } from './mockedEntities';

jest.mock('typeorm', () => ({
  getCustomRepository: jest.fn(),
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn(),
  BeforeInsert: jest.fn(),
  BeforeUpdate: jest.fn(),
  ManyToOne: jest.fn(),
  OneToMany: jest.fn(),
  EntityRepository: jest.fn(),
  Repository: class Repository { },
}));

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('helpers', () => {
  beforeEach(jest.clearAllMocks);

  describe('checkAuthAndReturnUser', () => {
    it('returns user linked to the session if user is correctly authenticated', async () => {
      const context = {
        req: {
          headers: {
            authorization: 'Bearer validToken',
          },
        },
      } as ExpressContext;

      const SessionRepositoryMock = { findOne: jest.fn(() => ({ user: defaultUserModel.id })) };
      mocked(getCustomRepository).mockReturnValueOnce(SessionRepositoryMock);

      const result = await checkAuthAndReturnUser(context);

      expect(result).toEqual(defaultUserModel.id);
    });

    it('throws error if authorization header is not sent', () => {
      const context = {
        req: {
          headers: {},
        },
      } as ExpressContext;

      expect(async () => checkAuthAndReturnUser(context)).rejects.toThrow();
    });

    it('throws error if authorization token is not correctly sent', () => {
      const context = {
        req: {
          headers: {
            authorization: 'NotValidAuthorization',
          },
        },
      } as ExpressContext;

      expect(async () => checkAuthAndReturnUser(context)).rejects.toThrow();
    });
  });
});
