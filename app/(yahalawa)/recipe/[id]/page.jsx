import { auth } from "@/auth"
import Navbar from "@/components/home/Navbar"
import SearchBarHome from "@/components/home/SearchBarHome"
import prisma from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import Likes from "./_components/Likes"
import Saves from "./_components/Saves"
import diff from "@/public/recipePage/difficulty.svg"
import portion from "@/public/recipePage/portion.svg"
import preparation from "@/public/recipePage/preparation.svg"
import time from "@/public/recipePage/time.svg"
import SecondPart from "./_components/SecondPart"
import Footer from "@/components/home/Footer"
import MobileNavbar from "@/components/home/MobileNavbar"

const Recipe = async ({ params }) => {

  const session = await auth()
  const userId = session?.user?.id

  const recipes = await prisma.recipes.findFirst({
    where: {
      id: Number(params.id)
    },
    include: {
      category: true,
      ingredients: true,
      steps: true,
      ustensiles: true,
      userLikes: true,
      userRecipes: true
    }
  });

  const { id, title, description, difficulty, nbr_serves, preparation_time, cooking_time, total_time, cooking_temperature, video_link, ingredient_title, videoPath, imgPath, likes, glucides, proteines, graisses, kcal, category, ingredients, steps, ustensiles, userLikes, userRecipes } = recipes

  const sortedSteps = steps.sort((a, b) => a.step - b.step);

  //extract youtube id
  function extractYoutubeId(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  const videoId = extractYoutubeId(video_link)


  return (
    <main className="flex min-h-screen flex-col px-3 md:px-8 lg:px-32 py-8">

      <header className="w-full">
        <Navbar />
        <MobileNavbar />
        <SearchBarHome />
      </header>

      <div dir="rtl">
        <section className="lg:flex items-start justify-between mt-8 w-full">
          <div className="mb-10 lg:mb-0 lg:w-[40%]">
            <h1 className="text-[40px] text-darkblue">{title}</h1>
            <div className="text-[21px] w-fit categoryTitle">
              {category.map(el => {
                return (
                  <Link href={`/recipe_category/${el.title}`} key={el.id} className="hover:opacity-70 duration-300">
                    <p>{el.title}</p>
                  </Link>
                )
              })}
            </div>

            <Likes likes={likes} userLikes={userLikes} userId={userId} id={id} />

            <Saves userId={userId} userRecipes={userRecipes} id={id} />
            {/* time------------------------------------------------------------------------- */}
            <div className="mt-16">
              <div className="flex items-center border-b border-gray pb-2">
                <Image src={diff} alt="icon" />
                <p className="text-[#183153CC] mr-2">{difficulty}</p>
              </div>

              <div className="flex items-center border-b border-gray py-2">
                <Image src={portion} alt="icon" />
                <div className="flex items-center justify-between w-full text-[#183153CC] mr-2">
                  <p>عدد الحصص</p>
                  <p>{nbr_serves}</p>
                </div>
              </div>

              <div className="flex items-center border-b border-gray py-2">
                <Image src={preparation} alt="icon" />
                <div className="flex items-center justify-between w-full text-[#183153CC] mr-2">
                  <p>وقت التحضير</p>
                  <p>{preparation_time} دق</p>
                </div>
              </div>

              <div className="flex items-center border-b border-gray py-2">
                <Image src={time} alt="icon" />
                <div className="flex items-center justify-between w-full text-[#183153CC] mr-2">
                  <p>الوقت الاجمالي</p>
                  <p>{total_time} دق</p>
                </div>
              </div>
            </div>
          </div>


          {videoPath
            ?
            <div className="flex items-center justify-center">
              <video className="w-[338px] h-[600px] border-[0.73px] border-[#F3F0E3]"
                poster={imgPath}
                controls
                preload="metadata">
                <source src={videoPath} type="video/mp4" />
              </video>
            </div>
            :
            <iframe
              className="w-full lg:w-1/2 aspect-video"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
          }

        </section>

        {/* ingredient & preparation & steps------------------------------------------------------------ */}
        <SecondPart
          ingredients={ingredients}
          ustensiles={ustensiles}
          nbr_serves={nbr_serves}
          sortedSteps={sortedSteps}
          ingredient_title={ingredient_title}
        />
      </div>

      <Footer />
    </main>
  )
}

export default Recipe