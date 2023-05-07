import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePayrollEmployee1682353956401 implements MigrationInterface {

    
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payrolls_employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'employee_id',
            type: 'uuid', 
            isNullable: true
          },
          {
            name: 'payroll_id',
            type: 'uuid', 
            // isNullable: true
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'employee_number',
            type: 'int', 
            isNullable: true
          },
          {
            name: 'employee_name',
            type: 'varchar', 
          },
          {
            name: "dependents",
            type: "int",
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
            name: "position_name",
            type: "varchar",
          },
          {
            name: "departament_name",
            type: "varchar",
          },
          {
            name: "nib",
            type: "bigint",
            isNullable: true
          },
          {
            name: "social_security",
            type: "bigint",
            isNullable: true
          },
          {
            name: "nuit",
            type: "bigint",
            isNullable: true
          },
          {
            name: "salary_base",
            type: "double precision",
          },
          {
            name: "total_income",
            type: "double precision",
          },
          {
            name: "salary_liquid",
            type: "double precision",
          },
          {
            name: "overtime50",
            type: "int",
          },
          {
            name: "overtime100",
            type: "int",
          },
          {
            name: "total_overtime",
            type: "double precision",
          },
          {
            name: "month_total_workdays",
            type: "int",
          },
          {
            name: "day_total_workhours",
            type: "int",
          },
          {
            name: "base_day",
            type: "double precision",
          },
          {
            name: "base_hour",
            type: "double precision",
          },
          {
            name: "absences",
            type: "int",
          },
          {
            name: "total_absences",
            type: "double precision",
          },
          {
            name: "cash_advances",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "backpay",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "subsidy",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "bonus",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "subsidy_transport",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "subsidy_food",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "subsidy_residence",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "subsidy_medical",
            type: "double precision",
            isNullable: true,
          }, 
          {
            name: "subsidy_vacation",
            type: "double precision",
            isNullable: true,
          }, 
          {
            name: "salary_thirteenth",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "irps",
            type: "double precision",
          },          
          {
            name: "inss_employee",
            type: "double precision",
          },
          {
            name: "inss_company",
            type: "double precision",
          },
          {
            name: "syndicate_employee",
            type: "double precision",
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
            name: 'FKPayrollEmployees',
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['employee_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKPayrollPayrolls',
            referencedTableName: 'payrolls',
            referencedColumnNames: ['id'],
            columnNames: ['payroll_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: "FKPayrollCompany",
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
    await queryRunner.dropTable('payroll_employee')
  }

}
