import { MigrationInterface, QueryRunner } from "typeorm";

export class PostgresMigrations1692104334522 implements MigrationInterface {
    name = 'PostgresMigrations1692104334522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userCredentials" ALTER COLUMN "password_hash" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userCredentials" ALTER COLUMN "password_salt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userCredentials" ALTER COLUMN "password_salt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userCredentials" ALTER COLUMN "password_hash" SET NOT NULL`);
    }

}
