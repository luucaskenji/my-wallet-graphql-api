import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models';
import { createSessionArgs, createUserArgs } from '../types/resolvers';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  private _findByEmail(email: string): Promise<User | undefined> {
    return this.manager.findOne(User, { email });
  }

  async saveIfNotExists(userData: createUserArgs): Promise<User | void> {
    const {
      firstName,
      lastName,
      email,
      password,
    } = userData;

    const user = await this._findByEmail(email);
    if (user) throw new Error('user already exists');

    const newUser = new User(firstName, lastName, email, password);
    return this.manager.save(User, newUser);
  }

  async verifyPassword(signInData: createSessionArgs): Promise<void> {
    const { email, password } = signInData;

    const user = await this._findByEmail(email);
    if (!user) throw new Error('user not found');
  }
}

export default UserRepository;
