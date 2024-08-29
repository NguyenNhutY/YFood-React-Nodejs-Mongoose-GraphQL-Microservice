import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWebpagesTable20230821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Write your migration logic here
    await queryRunner.query(`
            CREATE TABLE webpages (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Logic to revert the migration
    await queryRunner.query(`
            DROP TABLE webpages
        `);
  }
}
