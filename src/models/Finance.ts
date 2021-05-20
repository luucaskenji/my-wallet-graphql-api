import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity({ name: 'finances' })
class Finance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision' })
  value: number;

  @Column()
  type: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @BeforeInsert()
  private setCreationDate(): void {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  private setUpdateDate(): void {
    this.updatedAt = new Date();
  }
}

export default Finance;
