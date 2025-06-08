import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1749370317422 implements MigrationInterface {
    name = 'InitSchema1749370317422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "files_post_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" DROP CONSTRAINT "post_hashtag_post_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" DROP CONSTRAINT "post_hashtag_hashtag_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_email_key"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "hashtags" DROP CONSTRAINT "hashtags_tag_text_key"`);
        await queryRunner.query(`ALTER TABLE "hashtags" DROP COLUMN "tag_text"`);
        await queryRunner.query(`ALTER TABLE "hashtags" ADD "tag_text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hashtags" ADD CONSTRAINT "UQ_eb7e266c59972b53e599eac06c0" UNIQUE ("tag_text")`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "body" character varying`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "file_name"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "file_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "file_type"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "file_type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "file_url"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "file_url" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_a855b00dfa76d3dd76a554a0e7" ON "post_hashtag" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_44fad00dc75a7ebb2cad8d0bcb" ON "post_hashtag" ("hashtag_id") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_3bafa3455a692c11471ac3bf375" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_a855b00dfa76d3dd76a554a0e7d" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_44fad00dc75a7ebb2cad8d0bcb1" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("hashtag_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_44fad00dc75a7ebb2cad8d0bcb1"`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_a855b00dfa76d3dd76a554a0e7d"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_3bafa3455a692c11471ac3bf375"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44fad00dc75a7ebb2cad8d0bcb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a855b00dfa76d3dd76a554a0e7"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "file_url"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "file_url" text`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "file_type"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "file_type" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "file_name"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "file_name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "body" text`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hashtags" DROP CONSTRAINT "UQ_eb7e266c59972b53e599eac06c0"`);
        await queryRunner.query(`ALTER TABLE "hashtags" DROP COLUMN "tag_text"`);
        await queryRunner.query(`ALTER TABLE "hashtags" ADD "tag_text" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "hashtags" ADD CONSTRAINT "hashtags_tag_text_key" UNIQUE ("tag_text")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "users_email_key" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" ADD CONSTRAINT "post_hashtag_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("hashtag_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" ADD CONSTRAINT "post_hashtag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "files_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
