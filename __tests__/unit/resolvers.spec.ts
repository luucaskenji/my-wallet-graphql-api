import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import resolvers from '@/resolvers';
import { createUserArgs } from '@/types/resolvers';

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
  describe('Mutations', () => {
    const { Mutation } = resolvers;

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
  });
});
