import { EntityRepository, Repository } from 'typeorm';
import { Session } from '../models';

@EntityRepository(Session)
class SessionRepository extends Repository<Session> { }

export default SessionRepository;
