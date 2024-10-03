/*
  Warnings:

  - You are about to drop the column `ttile` on the `IngredientsRecipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IngredientsRecipe" DROP COLUMN "ttile",
ADD COLUMN     "ingredient" TEXT;
