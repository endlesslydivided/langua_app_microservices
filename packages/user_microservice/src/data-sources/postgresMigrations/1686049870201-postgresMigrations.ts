import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigrations1686049870201 implements MigrationInterface {
  name = 'PostgresMigrations1686049870201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userContacts" DROP COLUMN "password_hash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" DROP COLUMN "password_salt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" DROP COLUMN "nickname"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP COLUMN "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP COLUMN "phone_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" ADD "phone_number" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" ADD "password_hash" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" ADD "password_salt" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" ADD "nickname" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP COLUMN "nickname"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP COLUMN "password_salt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP COLUMN "password_hash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" DROP COLUMN "phone_number"`,
    );
    await queryRunner.query(`ALTER TABLE "userContacts" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "userCredentials" ADD "phone_number" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" ADD "nickname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" ADD "password_salt" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" ADD "password_hash" character varying NOT NULL`,
    );
  }
}
