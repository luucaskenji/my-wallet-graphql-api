import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import resolvers from '@/resolvers';
import { createSessionArgs, createUserArgs } from '@/types/resolvers';
import jwt from 'jsonwebtoken';

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
  Repository: class Mock { },
  EntityRepository: jest.fn(),
}));

describe('resolvers', () => {
  beforeEach(jest.clearAllMocks);

  describe('Mutations', () => {
    const { Mutation } = resolvers;

    describe('createUser', () => {
      it('calls UserRepository method to save new user', async () => {
        const UserRepositoryMock = { saveIfNotExists: jest.fn() };
        mocked(getCustomRepository).mockReturnValueOnce(UserRepositoryMock);

        const args: { input: createUserArgs} = {
          input: {
            firstName: 'First',
            lastName: 'Last',
            email: 'test@test.com',
            password: 'test123456',
            passwordConfirmation: 'test123456',
          },
        };

        await Mutation.createUser(null, args);

        expect(UserRepositoryMock.saveIfNotExists).toHaveBeenCalledWith(args.input);
      });

      describe('joi validation', () => {
        it('throws error if some of the required fields are not sent', () => {
          const args: { input: createUserArgs} = { // email field is missing
            // @ts-ignore
            input: {
              firstName: 'First',
              lastName: 'Last',
              password: 'test123456',
              passwordConfirmation: 'test123456',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input firstName is empty', async () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: '',
              lastName: 'Last',
              email: 'test@test.com',
              password: 'test123456',
              passwordConfirmation: 'test123456',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input firstName is longer than 15 characters', () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: 'NameLongerThan15Characters',
              lastName: 'Last',
              email: 'test@test.com',
              password: 'test123456',
              passwordConfirmation: 'test123456',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input firstName is empty', async () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: 'First',
              lastName: '',
              email: 'test@test.com',
              password: 'test123456',
              passwordConfirmation: 'test123456',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input lastName is longer than 15 characters', async () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: 'First',
              lastName: 'LastNameLongerThan15Characters',
              email: 'test@test.com',
              password: 'test123456',
              passwordConfirmation: 'test123456',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input email is not in email format', () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: 'First',
              lastName: 'Last',
              email: 'test.test.com',
              password: 'test123456',
              passwordConfirmation: 'test123456',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input password is shorter than 6 characters', () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: 'First',
              lastName: 'Last',
              email: 'test@test.com',
              password: 'test',
              passwordConfirmation: 'test',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input password is longer than 15 characters', () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: 'First',
              lastName: 'Last',
              email: 'test@test.com',
              password: 'passwordLongerThan15Characters',
              passwordConfirmation: 'passwordLongerThan15Characters',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });

        it('throws error if input passwordConfirmation is not equal to password', () => {
          const args: { input: createUserArgs} = {
            input: {
              firstName: 'First',
              lastName: 'Last',
              email: 'test@test.com',
              password: 'test123456',
              passwordConfirmation: 'differentPassword',
            },
          };

          expect(() => Mutation.createUser(null, args)).toThrow();
        });
      });
    });

    describe('createSession', () => {
      it('creates session if sent data is valid', async () => {
        const args: { input: createSessionArgs} = {
          input: {
            email: 'test@test.com',
            password: 'test123456',
          },
        };
        const user = { id: 1, email: 'test@test.com', password: 'test123456' };
        const newSession = {};
        const token = 'token';
        const UserRepositoryMock = { findOne: jest.fn(() => user), verifyPassword: jest.fn() };
        const SessionRepositoryMock = {
          create: jest.fn(() => newSession),
          save: jest.fn(() => ({ id: 1 })),
        };

        mocked(getCustomRepository)
          .mockReturnValueOnce(UserRepositoryMock)
          .mockReturnValueOnce(UserRepositoryMock)
          .mockReturnValueOnce(SessionRepositoryMock)
          .mockReturnValueOnce(SessionRepositoryMock);
        jest.spyOn(jwt, 'sign').mockImplementationOnce(() => token);

        const result = await Mutation.createSession(null, args);

        expect(UserRepositoryMock.findOne).toHaveBeenCalledWith({ email: args.input.email });
        expect(UserRepositoryMock.verifyPassword)
          .toHaveBeenCalledWith(args.input.password, user.password);
        expect(SessionRepositoryMock.save).toHaveBeenCalledWith(newSession);
        expect(result).toMatchObject({ user, token });
      });
    });
  });
});
