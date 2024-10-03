import prisma from "@/lib/db"
import FormData from "../_components/FormData";
import { ustensiles } from "@/app/tables/ustensiles";
import { auth } from "@/auth"
import { redirect } from "next/navigation"


const UpdateRecette = async ({ params }) => {

  const session = await auth()
  const role = session?.user?.role

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect('/')
  }

  const recette = await prisma.recipes.findUnique({
    where: { id: Number(params.id) },
    include: {
      category: true,
      ingredients: true,
      relatedRecipe: true,
      steps: true,
      origine: true,
      tags: true,
      ustensiles: true
    }
  });


  const getOrigine = await prisma.origine.findMany()
  const getCategory = await prisma.category.findMany({ where: { status: 'Active'}})
  const getUstensile = await prisma.ustensiles.findMany()
  const getUnit = await prisma.unit.findMany()
  const getIngredients = await prisma.ingredients.findMany()
  const getTags = await prisma.tags.findMany({ where: { status: 'Active'}})



  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">Update recette</h1>

      <FormData
        recette={recette}
        origineList={getOrigine}
        categoryList={getCategory}
        ustensileList={getUstensile}
        unitList={getUnit}
        allIngredients={getIngredients}
        tagsList={getTags}
      />

    </main>
  )
}

export default UpdateRecette