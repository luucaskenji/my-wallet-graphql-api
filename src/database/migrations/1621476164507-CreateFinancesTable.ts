import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFinancesTable1621476164507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'finances',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'value',
          type: 'double precision',
        },
        {
          name: 'type',
          type: 'varchar',
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

    await queryRunner.createForeignKey('finances', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('finances');
    const foreignKey = table
      .foreignKeys
      .find((fk) => fk.columnNames.indexOf('userId') !== -1);

    await queryRunner.dropForeignKey('finances', foreignKey);
    await queryRunner.dropTable('finances');
  }
}
