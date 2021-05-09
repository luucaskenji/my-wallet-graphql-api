import { EntityRepository, EntityManager } from 'typeorm';
import { User } from '../models';

@EntityRepository(User)
class UserRepository {
  constructor(private manager: EntityManager) {}
}

export default UserRepository;
