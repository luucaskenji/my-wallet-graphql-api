import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '../models';
import { createUserArgs } from '../types/resolvers';

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

  verifyPassword(password: string, hashPassword: string): void {
    const isValid = bcrypt.compareSync(password, hashPassword);
    if (!isValid) throw new Error('invalid password');
  }
}

export default UserRepository;
