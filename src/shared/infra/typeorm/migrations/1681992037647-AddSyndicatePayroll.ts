import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddSyndicatePayroll1681992037647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn("payrolls", new TableColumn({
        name: "syndicate_employee",
        type: "double precision",
        isNullable: true,
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("payrolls", "syndicate_employee")
    }

}
