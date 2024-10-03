import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import NewTopic from "./_components/NewTopic"
import SortabelTopic from "./_components/SortabelTopic"


const Page = async () => {

    //get users
    const session = await auth()
    const role = session?.user?.role

    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
        redirect('/')
    };

    //get recipes
    const recipes = await prisma.recipes.findMany({
        orderBy: {
            id: "desc",
        }
    });


    //get topic
    const topic = await prisma.topics.findMany({
        where: { type : 'Free'},
        include: {
          section: {
            orderBy: {
              recipeOrder: 'asc'
            }
          }
        }
      });
      


    return (
        <main className='ml-16 mt-8'>

            <h1 className="text-2xl font-semibold tracking-wide mb-4">Gestion des rubriques (recette)</h1>

            <div className="relative bg-white min-h-screen rounded-md mb-2 p-8">

                <div className="text-end">
                    <NewTopic recipes={recipes} />
                </div>

                <SortabelTopic el={topic} recipes={recipes} />


                {(Array.isArray(topic) && topic.length === 0) && (
                    <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
                )}

            </div>
        </main>
    )
}

export default Page