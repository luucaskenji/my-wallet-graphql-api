/* eslint-disable no-unused-vars */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({ name: 'users' })
class User {
  constructor(firstName: string, lastName: string, email: string, password: string) {
    Object.assign(this, {
      firstName,
      lastName,
      email,
      password,
    });
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
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

  @BeforeInsert()
  private hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

export default User;
