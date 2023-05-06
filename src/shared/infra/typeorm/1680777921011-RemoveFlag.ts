import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveFlag1680777921011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("settings", "flag")

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
