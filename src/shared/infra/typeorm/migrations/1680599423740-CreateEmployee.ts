import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEmployee1680599423740 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'employee_number',
            type: 'int',
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
            // isUnique: true
          },
          {
            name: 'dependents',
            type: 'int',
          },
          {
            name: "salary",
            type: "double precision",
          },
          {
            name: "birth_date",
            type: "Date",
            isNullable: true
          },
          {
            name: "place_birth",
            type: "varchar",
            isNullable: true
          },
          {
            name: "nationality",
            type: "varchar",
            isNullable: true
          },
          {
            name: "bi",
            type: "varchar",
          },
          {
            name: "marital_status",
            type: "varchar",
            isNullable: true
          },
          {
            name: "gender",
            type: "varchar",
            isNullable: true
          },
          {
            name: "address",
            type: "varchar",
            isNullable: true
          },
          {
            name: "street",
            type: "varchar",
            isNullable: true
          },
          {
            name: "contact_1",
            type: "varchar", //"bigint",
            isNullable: true
          },
          {
            name: "contact_2",
            type: "varchar", //"bigint",
            isNullable: true
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true
          },
          {
            name: "nuit",
            type: "bigint",
            isNullable: true
          },
          {
            name: "vacation",
            type: "int",
            isNullable: true
          },
          {
            name: "subsidy",
            type: "double precision",
            isNullable: true
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
            name: "start_date",
            type: "date",
            isNullable: true
          },
          {
            name: "end_date",
            type: "date",
            isNullable: true,
          },
          {
            name: "employee_status",
            type: "varchar",
            isNullable: true
          },
          {
            name: "bank_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "bank_account",
            type: "bigint",
            isNullable: true
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
            name: "syndicate_status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "inss_status",
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
          }
        ],
        foreignKeys: [
          {
              name: "FKEmployeeCompany",
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
    await queryRunner.dropTable('employees')
  }

}
