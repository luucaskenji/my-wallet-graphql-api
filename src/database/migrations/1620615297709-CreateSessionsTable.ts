/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSessionsTable1620615297709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'sessions',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'userId',
          type: 'int',
        },
        {
          name: 'createdAt',
          type: 'timestamptz',
        },
        {
          name: 'updatedAt',
          type: 'timestamptz',
        },
      ],
    }));

    await queryRunner.createForeignKey('sessions', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions');
  }
}
