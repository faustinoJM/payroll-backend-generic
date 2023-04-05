import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersToken1680599311174 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
          name: "users_tokens",
          columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true
              },
              {
                name: "user_id",
                type: "uuid"
              },
              {
                name: 'company_id',
                type: 'uuid',
              },
              {
                name: "refresh_token",
                type: "varchar"
              }, 
              {
                name: "expires_date",
                type: "timestamp"
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()"
              }
          ],
          foreignKeys: [
              {
                  name: "FKUserToken",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["user_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE"
              },
              {
                name: "FKUserTokenCompany",
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
    await queryRunner.dropTable("users_tokens");
  }

}