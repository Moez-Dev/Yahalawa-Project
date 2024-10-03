/*
  Warnings:

  - You are about to drop the column `recipesId` on the `Origine` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Tags` table. All the data in the column will be lost.
  - Added the required column `status` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Origine" DROP CONSTRAINT "Origine_recipesId_fkey";

-- DropIndex
DROP INDEX "Origine_recipesId_key";

-- AlterTable
ALTER TABLE "Origine" DROP COLUMN "recipesId";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "Status",
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OrigineRecipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "recipesId" INTEGER,

    CONSTRAINT "OrigineRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tips" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "featured" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "is_paying" BOOLEAN NOT NULL,
    "likes" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "scheduled_publish_date" TIMESTAMP(3) NOT NULL,
    "id_intern" TEXT NOT NULL,
    "video_link" TEXT NOT NULL,
    "thumbnailName" TEXT NOT NULL,
    "video_nature" INTEGER NOT NULL,

    CONSTRAINT "Tips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTips" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "CategoryTips_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrigineRecipe" ADD CONSTRAINT "OrigineRecipe_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
