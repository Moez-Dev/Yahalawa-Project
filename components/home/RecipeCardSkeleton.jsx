import { Skeleton } from "../ui/skeleton"


const RecipeCardSkeleton = () => {

  return (
    <div dir="rtl" >

            <Skeleton className="w-[300px] h-[350px] rounded-sm shadow-lg border-[0.73px] border-[#F3F0E3]" />

            <div className="p-2">
                <div className="flex items-center justify-between text-darkblue mt-2">
                    <Skeleton className="w-12 h-4"/>
                    <Skeleton className="size-5" />
                </div>

                <Skeleton className="w-8 h-3" />

                <div className="flex items-center text-gray mt-1">
                    <Skeleton className="w-6 h-3" />
                    <Skeleton className="w-6 h-3" />
                </div>

            </div>
        </div>
  )
}

export default RecipeCardSkeleton