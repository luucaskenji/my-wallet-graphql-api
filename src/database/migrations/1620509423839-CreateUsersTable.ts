/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CreateUsersTable1620509423839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'firstName',
          type: 'varchar',
        },
        {
          name: 'lastName',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'createdAt',
          type: 'date',
        },
        {
          name: 'updatedAt',
          type: 'date',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
