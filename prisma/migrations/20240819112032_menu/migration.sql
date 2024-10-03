-- CreateTable
CREATE TABLE "MenuSucrerie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "MenuSucrerie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubMenuSucrerie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "menuSucrerieId" INTEGER,

    CONSTRAINT "SubMenuSucrerie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuCuisine" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "MenuCuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubMenuCuisine" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "menuCuisineId" INTEGER,

    CONSTRAINT "SubMenuCuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuConseil" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "MenuConseil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubMenuConseil" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "menuConseilId" INTEGER,

    CONSTRAINT "SubMenuConseil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubMenuSucrerie" ADD CONSTRAINT "SubMenuSucrerie_menuSucrerieId_fkey" FOREIGN KEY ("menuSucrerieId") REFERENCES "MenuSucrerie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMenuCuisine" ADD CONSTRAINT "SubMenuCuisine_menuCuisineId_fkey" FOREIGN KEY ("menuCuisineId") REFERENCES "MenuCuisine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMenuConseil" ADD CONSTRAINT "SubMenuConseil_menuConseilId_fkey" FOREIGN KEY ("menuConseilId") REFERENCES "MenuConseil"("id") ON DELETE SET NULL ON UPDATE CASCADE;
