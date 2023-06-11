import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigrations1686326689438 implements MigrationInterface {
  name = 'PostgresMigrations1686326689438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP CONSTRAINT "FK_812549eeef178a1b74b9539bf39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" DROP CONSTRAINT "FK_abf5e6ecbe0a58a7519cced01a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP CONSTRAINT "UQ_812549eeef178a1b74b9539bf39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" DROP CONSTRAINT "UQ_abf5e6ecbe0a58a7519cced01a2"`,
    );
    await queryRunner.query(`ALTER TABLE "userContacts" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "userCredentialsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_17cb5b62c26a9b1bbacc45f2fb6" UNIQUE ("userCredentialsId")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "userContactsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_6c046853004fe19ea848b5bc764" UNIQUE ("userContactsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_17cb5b62c26a9b1bbacc45f2fb6" FOREIGN KEY ("userCredentialsId") REFERENCES "userCredentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6c046853004fe19ea848b5bc764" FOREIGN KEY ("userContactsId") REFERENCES "userContacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c046853004fe19ea848b5bc764"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_17cb5b62c26a9b1bbacc45f2fb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c046853004fe19ea848b5bc764"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userContactsId"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_17cb5b62c26a9b1bbacc45f2fb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "userCredentialsId"`,
    );
    await queryRunner.query(`ALTER TABLE "userContacts" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "userContacts" ADD CONSTRAINT "UQ_abf5e6ecbe0a58a7519cced01a2" UNIQUE ("userId")`,
    );
    await queryRunner.query(`ALTER TABLE "userCredentials" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "userCredentials" ADD CONSTRAINT "UQ_812549eeef178a1b74b9539bf39" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "userContacts" ADD CONSTRAINT "FK_abf5e6ecbe0a58a7519cced01a2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCredentials" ADD CONSTRAINT "FK_812549eeef178a1b74b9539bf39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
