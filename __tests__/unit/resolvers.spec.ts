import { UserRepository } from '@/repositories';
import resolvers from '@/resolvers';

describe('resolvers', () => {
  describe('Mutations', () => {
    const { Mutation } = resolvers;
    const userRepository = new UserRepository();

    it('calls UserRepository method to save new user', () => {
      jest.spyOn(userRepository, 'saveIfNotExists');

      
    });
  });
});