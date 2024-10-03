import prisma from "@/lib/db"
import Navbar from "@/components/home/Navbar"
import SearchBarHome from "@/components/home/SearchBarHome"
import { Suspense } from "react"
import RecipeCard from "@/components/home/RecipeCard"
import RecipeCardSkeleton from "@/components/home/RecipeCardSkeleton"
import { auth } from "@/auth"
import { Search } from 'lucide-react'
import TipCard from "@/components/home/TipCard"
import MobileNavbar from "@/components/home/MobileNavbar"

const Page = async ({ params }) => {

    const session = await auth()

    const searchQuery = decodeURIComponent(params.query)

    //get recipes--------------------------------------------//
    const whereRecipeCondition = searchQuery
        ? {
            AND: [
                { status: 'publiée' },
                {
                    OR: [
                        {
                            title: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                        {
                            category: {
                                some: {
                                    title: {
                                        contains: searchQuery,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                        {
                            tags: {
                                some: {
                                    title: {
                                        contains: searchQuery,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        }
        : {};


    const recipes = await prisma.recipes.findMany({
        where: whereRecipeCondition,
        include: {
            category: true,
            userRecipes: true,
            userLikes: true
        }
    });

    //get tips----------------------------------------------//
    const whereTipCondition = searchQuery
        ? {
            AND: [
                { status: 'publiée' },
                {
                    OR: [
                        {
                            title: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                        {
                            category: {
                                some: {
                                    title: {
                                        contains: searchQuery,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        }
        : {};


    const tips = await prisma.tips.findMany({
        where: whereTipCondition,
        include: {
            category: true,
            userTips: true,
            userTipsLike: true
        },
    });



    return (
        <main className="flex min-h-screen flex-col px-3 md:px-8 lg:px-32 py-8">

            <header className="w-full">
                <Navbar />
                <MobileNavbar />
                <SearchBarHome />
            </header>

            {/* recipes----------------------------------------------------------- */}
            {recipes.length > 0 &&
                <>
                    <div className='w-full mt-8'>
                        <div className="w-full flex items-center justify-end text-blueTitle text-2xl mb-2">
                            <p>الوصفات</p>
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
                </>}

            {/* tips--------------------------------------------------------------- */}
            {tips.length > 0 &&
                <>
                    <div className='w-full mt-8'>
                        <div className="w-full flex items-center justify-end text-blueTitle text-2xl mb-2">
                            <p>النصائح</p>
                            <Search className="size-5 ml-2" />
                        </div>
                        <p className="bg-blueTitle w-full h-[1px]"></p>
                    </div>

                    <section className="flex justify-end items-start flex-wrap w-full my-6">
                        {
                            Array.isArray(tips) && tips.map((el) => {
                                return (
                                    <Suspense key={el.id} fallback={<RecipeCardSkeleton />}>
                                        <TipCard el={el} session={session} />
                                    </Suspense>
                                )
                            })
                        }
                    </section>
                </>}

            {/* no result------------------------------------------------------- */}
            {
                (recipes.length === 0 && tips.length === 0) &&
                <div className="flex flex-col justify-center items-center w-full mt-40 space-y-2 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#FE2C54" stroke-linecap="round" stroke-width="1.5"><path d="M13 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9" /><path stroke-linejoin="round" d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011m9.114 15.12a3 3 0 1 0-4.248-4.237a3 3 0 0 0 4.248 4.237m0 0L22 22" /></g></svg>
                    <p>.لا توجد نتائج مطابقة لبحثك</p>
                </div>
            }

        </main>
    )
}

export default Page