import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1680599297428 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'name',
            type: 'varchar',
            // isUnique: true
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: "is_admin",
            type: "boolean",
            default: true
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
              name: "FKUserCompany",
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
    await queryRunner.dropTable('users')
  }

}