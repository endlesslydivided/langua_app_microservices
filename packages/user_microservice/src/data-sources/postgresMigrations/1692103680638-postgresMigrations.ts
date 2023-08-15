import { MigrationInterface, QueryRunner } from "typeorm";

export class PostgresMigrations1692103680638 implements MigrationInterface {
    name = 'PostgresMigrations1692103680638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sex"`);
        await queryRunner.query(`ALTER TABLE "userCredentials" ALTER COLUMN "nickname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userContacts" ALTER COLUMN "phone_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "birthday" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "birthday" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userContacts" ALTER COLUMN "phone_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userCredentials" ALTER COLUMN "nickname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sex" character varying NOT NULL`);
    }

}
