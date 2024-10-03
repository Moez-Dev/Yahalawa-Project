/*
  Warnings:

  - You are about to drop the `MenuConseil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuCuisine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuSucrerie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubMenuConseil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubMenuCuisine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubMenuSucrerie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubMenuConseil" DROP CONSTRAINT "SubMenuConseil_menuConseilId_fkey";

-- DropForeignKey
ALTER TABLE "SubMenuCuisine" DROP CONSTRAINT "SubMenuCuisine_menuCuisineId_fkey";

-- DropForeignKey
ALTER TABLE "SubMenuSucrerie" DROP CONSTRAINT "SubMenuSucrerie_menuSucrerieId_fkey";

-- DropTable
DROP TABLE "MenuConseil";

-- DropTable
DROP TABLE "MenuCuisine";

-- DropTable
DROP TABLE "MenuSucrerie";

-- DropTable
DROP TABLE "SubMenuConseil";

-- DropTable
DROP TABLE "SubMenuCuisine";

-- DropTable
DROP TABLE "SubMenuSucrerie";

-- CreateTable
CREATE TABLE "editableMenu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "editableMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubEditableMenu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "editableMenuId" INTEGER,

    CONSTRAINT "SubEditableMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubEditableMenu" ADD CONSTRAINT "SubEditableMenu_editableMenuId_fkey" FOREIGN KEY ("editableMenuId") REFERENCES "editableMenu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
