import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSettings1680599503894 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settings',
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
            name: 'company_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'company_telephone',
            type: 'int',
            isNullable: true,
          },
          {
            name: "company_contact",
            type: "int",
            isNullable: true,
          },
          {
            name: "company_email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_website",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_fax",
            type: "int",
            isNullable: true,
          },
          {
            name: "company_address",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_address_2",
            type: "varchar",
            isNullable: true,
          },{
            name: "company_street",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_province",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_city",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "postal_code",
            type: "int",
            isNullable: true,
          },
          {
            name: "company_country",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_avatar",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_logo_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "company_logo_title",
            type: "varchar",
            isNullable: true,
          },
          {
            name: 'company_nuit',
            type: 'bigint',
            // isUnique: true,
            isNullable: true
          },
          {
            name: "company_bank_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "company_bank_account",
            type: "bigint",
            isNullable: true
          },
          {
            name: "payroll_month_total_workdays",
            type: "int",
            isNullable: true,
          },
          {
            name: "payroll_day_total_workhours",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "payroll_syndicate_tax",
            type: "int",
            isNullable: true,
          },
          {
            name: "payroll_inss_employee_tax",
            type: "int",
            isNullable: true,
          },
          {
            name: "payroll_inss_company_tax",
            type: "int",
            isNullable: true,
          },
          {
            name: "column_position_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_department_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_overtime",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_absences",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_cash_advances",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_backpay",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_bonus",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_subsidy",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_syndicate",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_subsidy_transport",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_subsidy_food",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_subsidy_residence",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "column_subsidy_medical",
            type: "varchar",
            isNullable: true,
          }, 
          {
            name: "column_subsidy_vacation",
            type: "varchar",
            isNullable: true,
          }, 
          {
            name: "column_salary_thirteenth",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "language_options",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "flag",
            type: "int",
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
          }
        ],
        foreignKeys: [
          {
              name: "FKSettingCompany",
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
    await queryRunner.dropTable('settings')
  }

}