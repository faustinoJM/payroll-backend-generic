import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddEmployeForeignKeyToPosition1680599448313 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.addColumn('employees', new TableColumn(
      {
      name: 'position_id',
      type: 'uuid',
      isNullable: true
      }
    ))

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'FKEmployeePosition',
        columnNames: ['position_id'],
        referencedTableName: 'positions',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('employees', 'FKEmployeePosition');

    await queryRunner.dropColumn('employees', 'position_id');

  }

}