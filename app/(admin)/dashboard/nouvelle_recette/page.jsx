import FormData from "./_components/FormData"
import prisma from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


const NewTips = async () => {

    const session = await auth()
    const role = session?.user?.role
    const author = session?.user?.name

    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      redirect('/')
  }

    const origine = await prisma.origine.findMany()
    const category = await prisma.category.findMany({ where: { status: 'Active' } })
    const ustensile = await prisma.ustensiles.findMany()
    const unit = await prisma.unit.findMany()
    const ingredients = await prisma.ingredients.findMany()
    const tags = await prisma.tags.findMany({ where: { status: 'Active' } })


    return (
        <main className='ml-12 mt-8'>

            <h1 className="text-2xl font-semibold tracking-wide mb-4">Ajouter une recette</h1>
            <FormData
                origineList={origine}
                categoryList={category}
                ustensileList={ustensile}
                unitList={unit}
                ingredientsList={ingredients}
                tagsList={tags}
                author={author}
            />

        </main>
    )
}

export default NewTips







