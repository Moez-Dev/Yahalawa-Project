/*
  Warnings:

  - The `author` column on the `Tips` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `featured` column on the `Tips` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `Tips` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_intern` on the `Tips` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tips" ALTER COLUMN "seoTitle" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "seoDescription" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL,
DROP COLUMN "author",
ADD COLUMN     "author" INTEGER,
ALTER COLUMN "img" DROP NOT NULL,
DROP COLUMN "featured",
ADD COLUMN     "featured" BOOLEAN,
DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL,
ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "scheduled_publish_date" DROP NOT NULL,
DROP COLUMN "id_intern",
ADD COLUMN     "id_intern" INTEGER NOT NULL,
ALTER COLUMN "video_link" DROP NOT NULL,
ALTER COLUMN "thumbnailName" DROP NOT NULL,
ALTER COLUMN "video_nature" DROP NOT NULL;
