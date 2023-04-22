import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateEmployeeCategory1681989211487 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'category_id',
            type: 'int',
            // isPrimary: true,
            // isGenerated: true,
            // generationStrategy: 'increment',
            isNullable: true,
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'total_employee',
            type: 'int',
            isNullable: true
          },
          {
            name: 'created_at',
            type: "timestamp",
            default: "now()"
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }

        ],
        foreignKeys: [
          {
              name: "FKCategoryCompany",
              referencedTableName: "company",
              referencedColumnNames: ["id"],
              columnNames: ["company_id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE"
          }
      ]
      })
    )


    await queryRunner.addColumn("employees", new TableColumn({
      name: "category_id",
      type: "uuid",
      isNullable: true,
    }))

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'FKEmployeeCategory',
        columnNames: ['category_id'],
        referencedTableName: 'category',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category')
    await queryRunner.dropForeignKey('employees', 'FKEmployeeCategory');

  }

}
