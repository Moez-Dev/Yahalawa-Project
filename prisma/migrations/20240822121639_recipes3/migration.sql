/*
  Warnings:

  - You are about to drop the column `Author` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `Note` on the `Recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "Author",
DROP COLUMN "Note",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "note" TEXT,
ALTER COLUMN "status" SET DATA TYPE TEXT;
