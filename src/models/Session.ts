import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './User';

@Entity({ name: 'sessions' })
class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;
}

export default Session;
