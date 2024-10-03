import { auth } from "@/auth"
import Navbar from "@/components/home/Navbar"
import SearchBarHome from "@/components/home/SearchBarHome"
import prisma from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import Likes from "./_components/Likes"
import Saves from "./_components/Saves"
import Footer from "@/components/home/Footer"
import { Suspense } from "react"
import RandomTipCard from "@/components/home/RandomTipCard"
import { Skeleton } from "@/components/ui/skeleton"
import MobileNavbar from "@/components/home/MobileNavbar"


const Tip = async ({ params }) => {

    const session = await auth()
    const userId = session?.user?.id

    //get tip
    const tip = await prisma.tips.findFirst({
        where: {
            id: Number(params.id)
        },
        include: {
            category: true,
            userTips: true,
            userTipsLike: true
        }
    });

    const { id, img, title, description, video, likes, category, userTips, userTipsLike } = tip

    //get all tips
    const allTips = await prisma.tips.findMany({
        where: { status: 'publiée' },
        include: {
            category: true,
            userTips: true,
            userTipsLike: true
        },
    });

    //random rendering tips
    const shuffleArray = allTips.sort(() => Math.random() - 0.5);

    return (
        <main className="flex min-h-screen flex-col px-3 md:px-8 lg:px-32 py-8">

            <header className="w-full">
                <Navbar />
                <MobileNavbar />
                <SearchBarHome />
            </header>

            <div dir="rtl" className="mt-10">
                <section className="relative h-auto lg:h-[600px] aspect-video">
                    <Image
                        src={img}
                        alt="tip image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </section>

                {/* title part--------------------------------------------------------- */}
                <section className="mb-10 lg:mb-0 mt-2">
                    <h1 className="text-[40px] text-darkblue">{title}</h1>
                    <div className="text-[21px] categoryTitle w-fit">
                        {category.map(el => {
                            return (
                                <Link href={`/category/${el.title}`} key={el.id} className="hover:opacity-70 duration-300">
                                    <p>{el.title}</p>
                                </Link>
                            )
                        })}
                    </div>

                    <Likes likes={likes} userTipsLike={userTipsLike} userId={userId} id={id} />
                    <Saves userId={userId} userTips={userTips} id={id} />
                </section>

                {/* description---------------------------------------------------------- */}
                <div className="mt-12 leading-9 text-lg">{description}</div>
            </div>

            <section className="w-full mb-8">
                <div className="flex items-center w-full mt-16">
                    <p className="bg-[#18315354] w-full h-[0.5px]"></p>
                    <h1 className="text-blueTitle text-3xl mx-3 md:mx-8 lg:mx-24 whitespace-nowrap">! أكيد باش يعجبوك</h1>
                    <p className="bg-[#18315354] w-full h-[0.5px]"></p>
                </div>
            </section>

            <div dir="rtl" className="flex items-center justify-between flex-wrap w-full mb-12">
                {Array.isArray(shuffleArray) && shuffleArray.slice(0, 6).map((el) => {
                    return (
                        <Suspense key={el.id} fallback={<Skeleton className="w-[280px] h-[350px]" />}>
                            <RandomTipCard el={el} session={session} />
                        </Suspense>
                    )
                })}
            </div>

            <Footer />
        </main>
    )
}

export default Tip