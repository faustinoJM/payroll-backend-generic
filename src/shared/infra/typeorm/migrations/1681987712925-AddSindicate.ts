import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddSindicate1681987712925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn("settings", new TableColumn({
        name: "syndicate_status",
        type: "varchar",
        isNullable: true,
      }))

      await queryRunner.addColumn("settings", new TableColumn({
        name: "syndicate_tax",
        type: "int",
        isNullable: true,
      }))

      await queryRunner.addColumn("settings", new TableColumn({
        name: "company_logo_name",
        type: "varchar",
        isNullable: true,
      }))
      
      await queryRunner.addColumn("employees", new TableColumn({
        name: "syndicate_status",
        type: "varchar",
        isNullable: true,
      }))

      await queryRunner.addColumn("employees", new TableColumn({
        name: "inss_status",
        type: "varchar",
        isNullable: true,
      }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("settings", "company_logo_name")

      await queryRunner.dropColumn("settings", "syndicate_tax")

      await queryRunner.dropColumn("settings", "syndicate_status")
      
      await queryRunner.dropColumn("employees", "syndicate_status")

      await queryRunner.dropColumn("employees", "inss_status")
    }

}
