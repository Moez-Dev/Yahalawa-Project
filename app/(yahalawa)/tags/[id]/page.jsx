import { auth } from "@/auth";
import Footer from "@/components/home/Footer";
import MobileNavbar from "@/components/home/MobileNavbar";
import Navbar from "@/components/home/Navbar";
import RecipeCard from "@/components/home/RecipeCard";
import RecipeCardSkeleton from "@/components/home/RecipeCardSkeleton";
import SearchBarHome from "@/components/home/SearchBarHome";
import prisma from "@/lib/db"
import { Search } from "lucide-react";
import { Suspense } from "react";


const TagsPage = async ({ params }) => {

  const session =  await auth()

  //get tag title
  const tag = await prisma.tags.findFirst({
    where: { id: Number(params.id) },
  });


  //get related recipe
  const recipe = await prisma.recipes.findMany({
    where: {
      AND: [
        {
          tags: {
            some: {
              title: tag.title,
            },
          }
        }
        , {
          status: "publiée"
        }
      ]
    },
    include: {
      category: true,
      userRecipes: true,
      userLikes: true
    }
  });



  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-32 py-8">

      <header className="w-full">
        <Navbar />
        <MobileNavbar />
        <SearchBarHome />
      </header>

      <div className='w-full mt-8'>
        <div className="w-full flex items-center justify-end text-blueTitle text-2xl mb-2">
          <p href="/compte">أفكار عطاير</p>
          <Search className="size-5 ml-2" />
        </div>
        <p className="bg-blueTitle w-full h-[1px]"></p>
      </div>

      <section className="flex justify-end items-start flex-wrap w-full my-12">
        {
        Array.isArray(recipe) && recipe.map((el) => {
          return (
            <Suspense key={el.id} fallback={ <RecipeCardSkeleton />}>
              <RecipeCard el={el} session={session} />
            </Suspense>
          )
        })
        }
      </section>

      <Footer />

    </main>
  )
}

export default TagsPage