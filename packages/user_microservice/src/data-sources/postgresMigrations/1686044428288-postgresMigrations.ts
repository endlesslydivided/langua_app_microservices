import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigrations1686044428288 implements MigrationInterface {
  name = 'PostgresMigrations1686044428288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "userCredentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, CONSTRAINT "PK_2b516afde7eb92e4871de6ef845" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userContacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "password_hash" character varying NOT NULL, "password_salt" character varying NOT NULL, "nickname" character varying NOT NULL, CONSTRAINT "PK_9ca8ba6c0f1dab851637f8e9089" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstname" character varying NOT NULL, "surname" character varying NOT NULL, "sex" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "native_language" character varying NOT NULL, "credentialsId" uuid NOT NULL, "contactsId" uuid NOT NULL, CONSTRAINT "REL_9f92e2173d4e8d981fe96cfdec" UNIQUE ("credentialsId"), CONSTRAINT "REL_76ab0e807ace56c0f43f316da6" UNIQUE ("contactsId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9f92e2173d4e8d981fe96cfdec9" FOREIGN KEY ("credentialsId") REFERENCES "userCredentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_76ab0e807ace56c0f43f316da6f" FOREIGN KEY ("contactsId") REFERENCES "userContacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_76ab0e807ace56c0f43f316da6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9f92e2173d4e8d981fe96cfdec9"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "userContacts"`);
    await queryRunner.query(`DROP TABLE "userCredentials"`);
  }
}
