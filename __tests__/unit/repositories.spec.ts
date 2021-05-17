import { mocked } from 'ts-jest/utils';
import { compareSync } from 'bcrypt';

import { User } from '@/models';
import { UserRepository } from '@/repositories';

const managerMock = {
  findOne: jest.fn(),
  save: jest.fn(),
};

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
  Repository: class Repository { private manager = managerMock; },
}));

jest.mock('bcrypt', () => ({
  compareSync: jest.fn(),
}));

describe('UserRepository', () => {
  const userRepository = new UserRepository();

  beforeEach(jest.clearAllMocks);

  describe('methods', () => {
    describe('saveIfNotExists', () => {
      it('saves new user in db if it does not conflict with some existing user', async () => {
        const userData: any = {
          firstName: 'First',
          lastName: 'Last',
          email: 'test@test.com',
          password: 'test123456',
        };

        managerMock.findOne.mockResolvedValueOnce(null);

        await userRepository.saveIfNotExists(userData);

        expect(userRepository.manager.findOne)
          .toHaveBeenCalledWith(User, { email: userData.email });
        expect(userRepository.manager.save).toHaveBeenCalled();
      });

      it('throws error if there is already a user registered in db with the sent email', () => {
        const userData: any = {
          firstName: 'First',
          lastName: 'Last',
          email: 'test@test.com',
          password: 'test123456',
        };

        managerMock.findOne.mockResolvedValueOnce(true);

        expect(async () => userRepository.saveIfNotExists(userData))
          .rejects
          .toThrow();
      });
    });

    describe('verifyPassword', () => {
      it('does not throw error if sent password matches hashed password', () => {
        const password = 'test123456';
        const hashPassword = 'test123456';

        mocked(compareSync).mockImplementationOnce(
          (string, anotherString) => string === anotherString,
        );

        expect(() => userRepository.verifyPassword(password, hashPassword)).not.toThrow();
      });

      it('throws error if sent password does not match hashed password', () => {
        const password = 'test123456';
        const hashPassword = 'test';

        mocked(compareSync).mockImplementationOnce(
          (string, anotherString) => string === anotherString,
        );

        expect(() => userRepository.verifyPassword(password, hashPassword)).toThrow();
      });
    });
  });
});
