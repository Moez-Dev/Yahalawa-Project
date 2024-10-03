-- AlterTable
ALTER TABLE "Recipes" ADD COLUMN     "glucides" INTEGER,
ADD COLUMN     "graisses" INTEGER,
ADD COLUMN     "kcal" INTEGER,
ADD COLUMN     "proteines" INTEGER;

-- CreateTable
CREATE TABLE "TagsRecipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "recipesId" INTEGER,

    CONSTRAINT "TagsRecipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagsRecipe" ADD CONSTRAINT "TagsRecipe_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
