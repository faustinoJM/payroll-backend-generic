import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCompany1680599238468 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'company_name',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'company_nuit',
            type: 'bigint',
            isUnique: true
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
            name: 'company_email',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'company_contact',
            type: 'int',
            isNullable: true
          },
          {
            name: 'company_address',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'company_city',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'company_province',
            type: 'varchar',
            isNullable: true
          },
          {
            name: "expires_date",
            type: "timestamp",
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
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company')
  }

}