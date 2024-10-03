/*
  Warnings:

  - You are about to drop the column `quantity` on the `IngredientsRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `IngredientsRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `highlighted` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `idI` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `img_link` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `ing_title` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `meta_desc` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `meta_keywords` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `publish_date` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the `Instructions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qte_cup` to the `IngredientsRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qte_gramme` to the `IngredientsRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unite` to the `IngredientsRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alias` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled_publish_date` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_time` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Instructions" DROP CONSTRAINT "Instructions_recipesId_fkey";

-- AlterTable
ALTER TABLE "IngredientsRecipe" DROP COLUMN "quantity",
DROP COLUMN "unit",
ADD COLUMN     "qte_cup" INTEGER NOT NULL,
ADD COLUMN     "qte_gramme" INTEGER NOT NULL,
ADD COLUMN     "unite" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "Status",
DROP COLUMN "Type",
DROP COLUMN "category",
DROP COLUMN "highlighted",
DROP COLUMN "idI",
DROP COLUMN "img_link",
DROP COLUMN "ing_title",
DROP COLUMN "meta_desc",
DROP COLUMN "meta_keywords",
DROP COLUMN "publish_date",
DROP COLUMN "text",
ADD COLUMN     "alias" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id_intern" TEXT,
ADD COLUMN     "imgPath" TEXT,
ADD COLUMN     "rank" INTEGER NOT NULL,
ADD COLUMN     "scheduled_publish_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "total_time" INTEGER NOT NULL,
ADD COLUMN     "videoPath" TEXT,
ALTER COLUMN "Author" DROP NOT NULL,
ALTER COLUMN "is_paying" SET DATA TYPE TEXT,
ALTER COLUMN "video_link" DROP NOT NULL,
ALTER COLUMN "likes" DROP NOT NULL;

-- DropTable
DROP TABLE "Instructions";

-- CreateTable
CREATE TABLE "categoryRecipesSelected" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "recipesId" INTEGER,

    CONSTRAINT "categoryRecipesSelected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeSteps" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "is_default" TEXT,
    "recipesId" INTEGER,

    CONSTRAINT "RecipeSteps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categoryRecipesSelected" ADD CONSTRAINT "categoryRecipesSelected_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSteps" ADD CONSTRAINT "RecipeSteps_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
