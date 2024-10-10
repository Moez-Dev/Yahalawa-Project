import { auth } from "@/auth";
import Footer from "@/components/home/Footer";
import GetRandomRecipes from "@/components/home/GetRandomRecipes";
import MobileNavbar from "@/components/home/MobileNavbar";
import Navbar from "@/components/home/Navbar";
import Rubrique from "@/components/home/Rubrique";
import SearchBarHome from "@/components/home/SearchBarHome";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";


export default async function Home() {

  //get session
  const session = await auth()
  const notPremium =  session?.user?.role !== "T_TELECOM"
  const notAdmin =  session?.user?.role !==  ("ADMIN"  && "SUPER_ADMIN")
  const approved = session?.user?.approuveTerms

  if(notPremium && notAdmin) {
    redirect('/premium/login')
  }



  //get topics recipe
  const getTopics = await prisma.topics.findMany({
    where: { type : 'T-Telecom'},
    include: {
      section: {
        orderBy: {
          recipeOrder: 'asc'
        }
      }
    }
  });

  const getPostsBySection = async (section) => {
    const recipeIds = section.map(item => item.recipeId);

    // get recipes by recipeId
    const recipes = await prisma.recipes.findMany({
      where: {
        id: { in: recipeIds }
      },
      include: {
        category: true,
        userLikes: true,
        userRecipes: true
      }
    });

    // organize recipes
    return recipeIds.map(recipeId => recipes.find(el => el.id === recipeId));
  };


  const topicsRecipe = await Promise.all(getTopics.map(async (item) => {
    const orderedPosts = await getPostsBySection(item.section);

    return {
      title: item.title,
      recipe: orderedPosts
    };
  }));

  //tags-------------------------------------------------------------------------------//  
  //get tags
  const tags = await prisma.tags.findMany({ where: { status: 'Active' } });

  //random rendering tags
  const randomTags = tags.sort(() => Math.random() - 0.5);

  //tips------------------------------------------------------------------------------//
  //get topics tip
  const getTopicsTip = await prisma.topicsTip.findMany({
    where: { type : 'T-Telecom'},
    include: {
      section: {
        orderBy: {
          tipsOrder: 'asc'
        }
      }
    }
  });


  const getTipBySection = async (section) => {
    const tipIds = section.map(item => item.tipsId);

    const tips = await prisma.tips.findMany({
      where: {
        id: { in: tipIds }
      },
      include: {
        category: true,
        userTips: true,
        userTipsLike: true
      }
    });

    // organize recipes
    return tipIds.map(tipsId => tips.find(el => el.id === tipsId));
  };


  const topicsTip = await Promise.all(getTopicsTip.map(async (item) => {
    const orderedPosts = await getTipBySection(item.section);

    return {
      title: item.title,
      section: orderedPosts
    };
  }));



  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

      <header className="w-full">
        <Navbar />
        <MobileNavbar />
        <SearchBarHome />
      </header>


      <Rubrique
        session={session}
        topic={topicsRecipe}
        topicsTip={topicsTip}
        randomTags={randomTags}
      />

      {/* أكيد باش يعجبوك --------------------------------------------------------- */}
      <section className="w-full mb-16">
        <div className="flex items-center w-full mt-16 mb-8">
          <p className="bg-[#18315354] w-full h-[0.5px]"></p>
          <h1 className="text-blueTitle text-3xl mx-3 md:mx-8 lg:mx-24 whitespace-nowrap">! أكيد باش يعجبوك</h1>
          <p className="bg-[#18315354] w-full h-[0.5px]"></p>
        </div>
        <GetRandomRecipes />
      </section>

      <Footer />

    </main>
  );
}





