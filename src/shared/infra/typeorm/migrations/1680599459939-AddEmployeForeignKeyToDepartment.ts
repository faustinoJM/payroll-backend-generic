import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddEmployeForeignKeyToDepartment1680599459939 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.addColumn('employees', new TableColumn(
      {
      name: 'department_id',
      type: 'uuid',
      isNullable: true
      }
    ))

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'FKEmployeeDepartment',
        columnNames: ['department_id'],
        referencedTableName: 'departments',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('employees', 'FKEmployeeDepartment');

    await queryRunner.dropColumn('employees', 'department_id');

  }

}
