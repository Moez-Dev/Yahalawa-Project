import prisma from "@/lib/db"
import Image from "next/image"
import recette from "@/public/dashboard/knife-black.svg"
import flag from '@/public/dashboard/flag-black.svg'
import ingredient from '@/public/dashboard/ingredient.svg'
import category from '@/public/dashboard/category.svg'
import tag from '@/public/dashboard/tags.svg'
import logo from '@/public/logo.svg'
import telecom from '@/public/telecom.svg'
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Bell } from "lucide-react"
const Page = async () => {

  const session = await auth()
  const role = session?.user?.role

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect('/adminAuth')
  }


  const totalTips = await prisma.tips.count();
  const totalRecipes = await prisma.recipes.count();
  const totalIngredients = await prisma.ingredients.count();
  const totalCategory = await prisma.category.count();
  const totalTags = await prisma.tags.count();
  const totalScheduleRecipes = await prisma.recipes.count({ where: { status: "programmée" } });
  const totalScheduleTips = await prisma.tips.count({ where: { status: "programmée" } });
  const totalTTRecipes = await prisma.recipes.count({ where: { is_paying: "T-Telecom" } });
  const totalFreeRecipes = await prisma.recipes.count({ where: { is_paying: "Free" } });
  const totalFreeUsers = await prisma.user.count({ where: { role: "FREE" } });
  const totalTTUsers = await prisma.user.count({ where: { role: "T_TELECOM" } });
  const totalTtTips = await prisma.tips.count({ where: { is_paying: "T-Telecom" } });
  const totalFreeTips = await prisma.tips.count({ where: { is_paying: "Free" } });

  const cards = [
    { title: 'Recettes', number: totalRecipes, icon: recette },
    { title: 'Tips', number: totalTips, icon: flag },
    { title: 'Ingrédients', number: totalIngredients, icon: ingredient },
    { title: 'Catégories', number: totalCategory, icon: category },
    { title: 'Tags', number: totalTags, icon: tag },
  ]

  const ttCards = [
    { title: 'Recettes', number: totalTTRecipes, icon: telecom, width: 45 },
    { title: 'Tips', number: totalTtTips, icon: telecom, width: 45 },
    { title: 'Utilisateurs', number: totalTTUsers, icon: telecom, width: 45 },
  ]

  const freeCards = [
    { title: 'Recettes', number: totalFreeRecipes, icon: logo, width: 45 },
    { title: 'Tips', number: totalFreeTips, icon: logo, width: 45 },
    { title: 'Utilisateurs', number: totalFreeUsers, icon: logo, width: 45 },
  ]


  return (
    <main className='flex flex-col  justify-center mt-8 ml-16 w-[85vw]'>

      <section className=" flex items-center space-x-5 ml-6">
        {
          totalScheduleRecipes > 0 && 
          <div className="flex items-center font-semibold bg-white rounded-lg shadow-md p-3 w-fit space-x-2">
            <Bell className="size-5 text-red" />
            <span>{totalScheduleRecipes}</span>
            <span>{totalScheduleRecipes == 1 ? "recette programmée" : "recettes programmées"}</span>
          </div>
        }
        {
          totalScheduleTips > 0 && 
          <div className="flex items-center font-semibold bg-white rounded-lg shadow-md p-3 w-fit space-x-2">
            <Bell className="size-5 text-red" />
            <span >{totalScheduleTips}</span>
            <span>{totalScheduleTips == 1 ? "tip programmée" : "tips programmées"}</span>
          </div>
        }
      </section>

      <section>
        <div className="flex items-start">
          {cards.map((el, i) => {
            return (
              <div key={i} className="flex flex-col space-y-3 ml-6 mt-10 bg-white rounded-lg shadow-md w-52 p-6">
                <div className="flex items-center space-x-2 text-xl">
                  <Image src={el.icon} alt='icon' width={el.width} />
                  <p className=" font-semibold">{el.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-blue text-xl font-bold">{el.number && el.number}</p>
                  <p className="text-darkgray text-lg">{el.title}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center">
          {ttCards.map((el, i) => {
            return (
              <div key={i} className="flex flex-col justify-center space-y-3 ml-6 mt-10 bg-white rounded-lg shadow-md w-52 p-6">
                <div className="flex items-center space-x-2 text-xl">
                  <Image src={el.icon} alt='icon' width={el.width} />
                  <p className=" font-semibold">{el.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-blue text-xl font-bold">{el.number && el.number}</p>
                  <p className="text-darkgray text-lg">{el.title}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center">
          {freeCards.map((el, i) => {
            return (
              <div key={i} className="flex flex-col justify-center space-y-3 ml-6 mt-10 bg-white rounded-lg shadow-md w-52 p-6">
                <div className="flex items-center space-x-2 text-xl">
                  <Image src={el.icon} alt='icon' width={el.width} />
                  <p className=" font-semibold">{el.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-blue text-xl font-bold">{el.number && el.number}</p>
                  <p className="text-darkgray text-lg">{el.title}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Page