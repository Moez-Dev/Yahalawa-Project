/*
  Warnings:

  - You are about to drop the column `ingredient` on the `IngredientsRecipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IngredientsRecipe" DROP COLUMN "ingredient",
ADD COLUMN     "ttile" TEXT;
