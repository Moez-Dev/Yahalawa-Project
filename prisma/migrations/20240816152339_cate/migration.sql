/*
  Warnings:

  - You are about to drop the column `category` on the `Tips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tips" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "CategoryTipsSelected" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "tipsId" INTEGER,

    CONSTRAINT "CategoryTipsSelected_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryTipsSelected" ADD CONSTRAINT "CategoryTipsSelected_tipsId_fkey" FOREIGN KEY ("tipsId") REFERENCES "Tips"("id") ON DELETE SET NULL ON UPDATE CASCADE;
