/*
  Warnings:

  - You are about to drop the `categoryRecipesSelected` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categoryRecipesSelected" DROP CONSTRAINT "categoryRecipesSelected_recipesId_fkey";

-- AlterTable
ALTER TABLE "IngredientsRecipe" ALTER COLUMN "ingredient" DROP NOT NULL,
ALTER COLUMN "qte_cup" DROP NOT NULL,
ALTER COLUMN "qte_gramme" DROP NOT NULL,
ALTER COLUMN "unite" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RecipeSteps" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "step" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RelatedRecipe" ALTER COLUMN "link" DROP NOT NULL;

-- DropTable
DROP TABLE "categoryRecipesSelected";

-- CreateTable
CREATE TABLE "CategoryRecipesSelected" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "recipesId" INTEGER,

    CONSTRAINT "CategoryRecipesSelected_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryRecipesSelected" ADD CONSTRAINT "CategoryRecipesSelected_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
