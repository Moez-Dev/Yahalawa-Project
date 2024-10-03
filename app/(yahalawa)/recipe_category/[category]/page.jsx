import { auth } from '@/auth'
import Navbar from '@/components/home/Navbar'
import SearchBarHome from '@/components/home/SearchBarHome'
import prisma from '@/lib/db'
import { Search } from 'lucide-react'
import Footer from '@/components/home/Footer'
import { Suspense } from 'react'
import RecipeCardSkeleton from '@/components/home/RecipeCardSkeleton'
import RecipeCard from '@/components/home/RecipeCard'
import MobileNavbar from '@/components/home/MobileNavbar'


const Category = async ({ params }) => {

  const session = await auth()

  const userId = session?.user?.id

  const categoryTitle = decodeURIComponent(params.category)

  //get my recipes
  const recipes = await prisma.recipes.findMany({
    where: {
      status: 'publiée',
      category: {
        some: {
          title: categoryTitle, 
        },
      },
    },
    include: {
      category: true,
      userRecipes: true,
      userLikes: true
    }
  });



  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

      <header className="w-full">
        <Navbar />
        <MobileNavbar />
        <SearchBarHome />
      </header>

      <div className='w-full mt-8'>
        <div className="w-full flex items-center justify-end text-blueTitle text-2xl mb-2">
          <p>{categoryTitle}</p>
          <Search className="size-5 ml-2" />
        </div>
        <p className="bg-blueTitle w-full h-[1px]"></p>
      </div>


      <section className="flex justify-end items-start flex-wrap w-full my-6">
        {
          Array.isArray(recipes) && recipes.map((el) => {
            return (
              <Suspense key={el.id} fallback={<RecipeCardSkeleton />}>
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

export default Category