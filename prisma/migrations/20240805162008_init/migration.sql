-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "idI" TEXT,
    "Author" TEXT NOT NULL,
    "Note" TEXT,
    "Type" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL,
    "is_paying" BOOLEAN NOT NULL,
    "highlighted" BOOLEAN NOT NULL,
    "ing_title" TEXT,
    "difficulty" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "preparation_time" INTEGER NOT NULL,
    "cooking_time" INTEGER NOT NULL,
    "cooking_temperature" INTEGER NOT NULL,
    "nbr_serves" INTEGER NOT NULL,
    "video_link" TEXT NOT NULL,
    "img_link" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "meta_keywords" TEXT NOT NULL,
    "meta_desc" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsRecipe" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ingredient" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "recipesId" INTEGER,

    CONSTRAINT "IngredientsRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedRecipe" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "recipesId" INTEGER,

    CONSTRAINT "RelatedRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "recipesId" INTEGER,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "highlighted" BOOLEAN NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ustensiles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Ustensiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Origine" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "recipesId" INTEGER NOT NULL,

    CONSTRAINT "Origine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Origine_recipesId_key" ON "Origine"("recipesId");

-- AddForeignKey
ALTER TABLE "IngredientsRecipe" ADD CONSTRAINT "IngredientsRecipe_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedRecipe" ADD CONSTRAINT "RelatedRecipe_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Origine" ADD CONSTRAINT "Origine_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
