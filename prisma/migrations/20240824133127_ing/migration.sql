-- AlterTable
CREATE SEQUENCE recipes_id_seq;
ALTER TABLE "Recipes" ALTER COLUMN "id" SET DEFAULT nextval('recipes_id_seq'),
ALTER COLUMN "scheduled_publish_date" DROP NOT NULL;
ALTER SEQUENCE recipes_id_seq OWNED BY "Recipes"."id";
