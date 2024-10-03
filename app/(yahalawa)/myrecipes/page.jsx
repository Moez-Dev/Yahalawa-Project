import { auth } from '@/auth'
import Navbar from '@/components/home/Navbar'
import SearchBarHome from '@/components/home/SearchBarHome'
import prisma from '@/lib/db'
import { Bookmark } from 'lucide-react'
import Footer from '@/components/home/Footer'
import DataList from './_components/DataList'
import { category } from '@/app/tables/category'
import MobileNavbar from '@/components/home/MobileNavbar'


const MyRecipes = async () => {

  const session = await auth()

  const userId = session?.user?.id

  //get my recipes
  const recipes = await prisma.recipes.findMany({
    where: {
      userRecipes: {
        some: {
          userId
        }
      }
    },
    include: {
      category: true,
      userRecipes: true,
      userLikes: true
    }
  });

  //get my tips
  const tips = await prisma.tips.findMany({
    where: {
      userTips: {
        some: {
          userId
        }
      }
    },
    include: {
      category: true,
      userTips: true,
      userTipsLike: true
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
          <p href="/compte">وصفاتي ونصائحي</p>
          <Bookmark className="size-5 ml-2" />
        </div>
        <p className="bg-blueTitle w-full h-[1px]"></p>
      </div>

      <DataList
        recipes={recipes}
        tips={tips}
        session={session}
      />

      <Footer />
    </main>
  )
}

export default MyRecipes