import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddFlag1680778280988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn("settings", new TableColumn({
          name: "flag",
          type: "int",
          isNullable: true,
      }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
