/*
  Warnings:

  - Added the required column `order` to the `SubMenuConseil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `SubMenuCuisine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `SubMenuSucrerie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubMenuConseil" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubMenuCuisine" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubMenuSucrerie" ADD COLUMN     "order" INTEGER NOT NULL;
