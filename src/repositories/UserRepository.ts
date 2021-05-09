import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models';
import { createUserArgs } from '../types/resolvers';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async saveIfNotExists(userData: createUserArgs): Promise<User | void> {
    const {
      firstName,
      lastName,
      email,
      password,
    } = userData;

    const user = await this.manager.findOne(User, { email });
    if (user) throw new Error('user already exists');

    const newUser = new User(firstName, lastName, email, password);
    return this.manager.save(User, newUser);
  }
}

export default UserRepository;
