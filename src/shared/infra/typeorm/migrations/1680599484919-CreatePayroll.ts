import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePayroll1680599484919 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payrolls',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: "year",
            type: "int",
          },
          {
            name: "month",
            type: "varchar",
          },
          {
            name: "payroll_status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: 'total_employee',
            type: 'int',
            isNullable: true
          },
          {
            name: "flag",
            type: "varchar",
            isNullable: true,
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
          },
        ],
        foreignKeys: [
          {
            name: "FKPayrollsCompany",
            referencedTableName: "company",
            referencedColumnNames: ["id"],
            columnNames: ["company_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
      ]

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payrolls')
  }

}