import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigrations1686324477797 implements MigrationInterface {
  name = 'PostgresMigrations1686324477797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9f92e2173d4e8d981fe96cfdec9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_76ab0e807ace56c0f43f316da6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "REL_9f92e2173d4e8d981fe96cfdec"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "credentialsId"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "REL_76ab0e807ace56c0f43f316da6"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "contactsId"`);
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
    await queryRunner.query(
      `ALTER TABLE "user" ADD "contactsId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "REL_76ab0e807ace56c0f43f316da6" UNIQUE ("contactsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "credentialsId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "REL_9f92e2173d4e8d981fe96cfdec" UNIQUE ("credentialsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_76ab0e807ace56c0f43f316da6f" FOREIGN KEY ("contactsId") REFERENCES "userContacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9f92e2173d4e8d981fe96cfdec9" FOREIGN KEY ("credentialsId") REFERENCES "userCredentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`,
    );
  }
}
