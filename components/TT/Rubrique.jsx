'use client'

import Link from 'next/link'
import RecipeCarousel from '../home/RecipeCarousel'
import TipCarousel from '../home/TipCarousel'


const Rubrique = ({ topic, topicsTip, session, randomTags }) => {


    return (
        <div className='w-full overflow-hidden'>
            {Array.isArray(topic) && topic.map((el, index) => {
                
                return (
                    <section key={index} className="w-full mt-16">
                        <div className="flex items-center">
                            <span className="bg-[#18315354] w-full h-[0.5px]"></span>
                            <h1 className="text-blueTitle text-3xl mx-3 md:mx-8 lg:mx-24 whitespace-nowrap">{el.title}</h1>
                            <span className="bg-[#18315354] w-full h-[0.5px]"></span>
                        </div>

                        {/* recipe card---------------------------------------------------- */}
                        <RecipeCarousel recipes={el.recipe} session={session} />

                        {/* TAGS PART--------------------------------------------------------- */}
                        {index === 1 && (
                            <>
                                <div>
                                    <div className="flex items-center w-full mt-16 mb-12">
                                        <span className="bg-[#18315354] w-full h-[0.5px]"></span>
                                        <h1 className="text-blueTitle text-3xl mx-3 md:mx-8 lg:mx-24 whitespace-nowrap">أفكار عطاير</h1>
                                        <span className="bg-[#18315354] w-full h-[0.5px]"></span>
                                    </div>

                                    <div dir="rtl" className="flex items-center justify-between flex-wrap space-x-2 lg:space-x-3">
                                        {Array.isArray(randomTags) && randomTags.slice(0, 24).map((el) => {
                                            return (
                                                <Link key={el.id} href={`/premium/tags/${el.id}`} className="bg-red text-white py-3 px-6 mx-3 rounded-sm my-4 hover:bg-blue duration-300">
                                                    {el.title}
                                                </Link>
                                            )
                                        })}
                                    </div>

                                </div>
                            </>
                        )}
                    </section>
                )
            })}

            {/* tips part------------------------------------------------------------------------------ */}
            {Array.isArray(topicsTip) && topicsTip.map((el,index) => {
                return (
                    <section key={index} className="w-full mt-16">
                        <div className="flex items-center">
                            <span className="bg-[#18315354] w-full h-[0.5px]"></span>
                            <h1 className="text-blueTitle text-3xl mx-3 md:mx-8 lg:mx-24 whitespace-nowrap">{el.title}</h1>
                            <span className="bg-[#18315354] w-full h-[0.5px]"></span>
                        </div>

                        {/* tip card---------------------------------------------------- */}
                        <TipCarousel section={el.section} session={session} />
                    </section>
                )
            })}
        </div>
    )
}

export default Rubrique