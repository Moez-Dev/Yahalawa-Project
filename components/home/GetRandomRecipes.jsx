import prisma from "@/lib/db"
import RandomRecipesCard from "./RandomRecipeCard";
import { Suspense } from "react";
import { auth } from "@/auth";
import { Skeleton } from "../ui/skeleton";


const GetRandomRecipes = async () => {

    const session = await auth();
    const recipes = await prisma.recipes.findMany({
        where: { status: 'publiée' },
        include: {
            category: true,
            userRecipes: true,
            userLikes: true
        },
    });


    //random rendering tags
    const shuffleArray = recipes.sort(() => Math.random() - 0.5);

    return (
        <div dir="rtl" className="flex items-center justify-between flex-wrap w-full">
            {Array.isArray(shuffleArray) && shuffleArray.slice(0, 6).map((el) => {
                return (
                    <Suspense key={el.id} fallback={<Skeleton className="w-[280px] h-[350px]" />}>
                            <RandomRecipesCard el={el} session={session} />
                    </Suspense>
                )
            })}
        </div>
    )
}

export default GetRandomRecipes