'use client'

import { useRef, Suspense } from "react"
import RecipeCard from "@/components/home/RecipeCard"
import RecipeCardSkeleton from "@/components/home/RecipeCardSkeleton"
import { Info, Bookmark } from 'lucide-react'
import TipCard from "@/components/home/TipCard"


const DataList = ({ recipes, tips, session }) => {

    const tipsRef = useRef()

    return (
        <>
            {
                tips.length > 0 && recipes.length > 0 &&
                <div className="flex justify-end items-center text-[17px] mt-2 w-full">
                    <div onClick={() =>
                        window.scrollTo({
                            top: tipsRef.current.offsetTop,
                            behavior: "smooth"
                        })
                    } className="relative w-fit cursor-pointer group">
                        <p className="text-darkblue group-hover:text-red transition duration-300">نصائحي</p>
                        <p className="w-full h-1 bg-darkblue group-hover:bg-red mt-2 rounded-tr-xl transition duration-300"></p>
                    </div>

                    <div className="relative w-fit cursor-pointer group ml-5">
                        <p className="text-red">وصفاتي</p>
                        <p className="w-full h-1 bg-red mt-2 rounded-tr-lg"></p>
                    </div>
                </div>}

            {/* recipes--------------------------------------------------------------------------------- */}

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

            {/* tips------------------------------------------------------------------------------------- */}

            <section className="flex justify-end items-start flex-wrap w-full mb-12">
                {tips.length > 0 &&
                    <div ref={tipsRef} className="flex items-center justify-end w-full text-blueTitle">
                        <p className="text-[22px]">نصائحي</p>
                        <Bookmark className="size-5 ml-2" />
                    </div>}
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


            {
                (recipes.length === 0 && tips.length === 0) &&
                <div className='my-24 flex items-center justify-center w-full'>
                    <div className='flex items-center shadow-lg border border-gray rounded-md p-4'>
                        <p className='md:text-lg'>.لم تقم بحفظ أي وصفة  أونصيحة بعد في هذه الصفحة</p>
                        <Info className='text-blueTitle ml-2 size-5' />
                    </div>
                </div>
            }
        </>
    )
}

export default DataList