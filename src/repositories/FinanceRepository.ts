import { EntityRepository, Repository } from 'typeorm';
import { Finance } from '@/models';

@EntityRepository(Finance)
class FinanceRepository extends Repository<Finance> { }

export default FinanceRepository;
