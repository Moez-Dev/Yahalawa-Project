
import Button from "@/components/Button";
import prisma from "@/lib/db";
import { tipsData } from "../tables/tips";
import { categoryTips } from "../tables/category_tips";

import { recipes } from "../tables/recipes";
import { categoryRecipesSelected } from "../tables/recipe_category";
import { recipeIngredient } from "../tables/recipe_ingredient";
import { steps } from "../tables/recipe_steps";

import { unit } from "../tables/unite";
import { ustensiles } from "../tables/ustensiles";
import { ingrdient } from "../tables/ingredients";
import { category } from "../tables/category";
import { tagsList } from "../tables/tags";
import { recipe_tags } from "../tables/recipe_tags";
import { origine } from "../tables/origine";

export default function Home() {


  async function addUnit() {
    "use server"

    try {

      // const result = await prisma.categoryRecipesSelected.createMany({ data : categoryRecipesSelected})

      // const result = await prisma.subEditableMenu.deleteMany({})

      console.log(`Inserted ${result.count} tips`);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HOME
      <Button addUnit={addUnit} className='border p-2' />
    </main>
  );
}





