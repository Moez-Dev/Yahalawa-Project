'use client'

import Image from "next/image"
import ingredient from "@/public/recipePage/ingredient.svg"
import step from "@/public/recipePage/steps.svg"
import tools from "@/public/recipePage/tools.svg"
import { Minus, Plus } from "lucide-react"
import { useRef, useState } from "react"


const SecondPart = ({ ingredients, ustensiles, nbr_serves, ingredient_title, sortedSteps }) => {

    const setpsRef = useRef(null);

    const [persons, setPersons] = useState(nbr_serves);

    //handle portion
    const handlePersonsChange = (change) => {
        setPersons((prev) => Math.max(1, prev + change));
    };

    // Recalculer les quantités en fonction du nombre de personnes
    const getUpdatedQuantity = (ingredientQuantity) => {
        return (ingredientQuantity / nbr_serves) * persons;
    };

    //format number decimal /entier
    function formatNumber(quantity) {
        if (quantity % 1 !== 0) {
            return quantity.toFixed(2);
        } else {
            return quantity;
        }
    };


    return (
        <div className="mb-20">
            <section className="w-full md:w-3/4 lg:w-2/4 mt-16">
                <div className="flex items-center text-[18px] md:text-[22px]">
                    <div className="relative w-fit cursor-pointer">
                        <p className="text-red">المكونات</p>
                        <p className="w-full h-1 bg-red mt-2 rounded-tr-lg"></p>
                    </div>
                    <div onClick={() =>
                        window.scrollTo({
                            top: setpsRef.current.offsetTop,
                            behavior: "smooth"
                        })
                    } className="relative w-fit mr-6 cursor-pointer group">
                        <p className="text-darkblue group-hover:text-red transition duration-300">الطريقة</p>
                        <p className="w-full h-1 bg-darkblue group-hover:bg-red mt-2 rounded-tr-xl transition duration-300"></p>
                    </div>
                </div>
                <p className="h-[0.3px] w-full bg-gray"></p>

                <div className="flex items-center ingTitle mt-8">
                    <Image src={ingredient} alt="icon" />
                    <p className="text-[32px] mr-2">المكونات</p>
                </div>

                <div className="flex items-center text-darkblue bgNbServes border-b border-gray p-2.5 mt-2">
                    <div className="flex items-center ml-5">
                        <button onClick={() => handlePersonsChange(-1)}
                            className="rounded-r-md bg-white border border-gray p-1 hover:bg-red hover:text-white duration-300"
                        ><Minus />
                        </button>
                        <button onClick={() => handlePersonsChange(1)}
                            className="rounded-l-md bg-white border border-gray p-1 hover:bg-red hover:text-white duration-300">
                            <Plus />
                        </button>
                    </div>

                    <p>عدد الحصص</p>
                    <p className="mr-2 text-[20px]">{persons}</p>
                </div>

                {
                    ingredient_title && <div className="mt-6 text-[16px] md:text-[18px]">
                        <p className="text-[#183153CC]">{ingredient_title}</p>
                        <p className="h-0.5 stepsTitleBorder"></p>
                    </div>
                }

                <div className="mt-2">
                    {
                        Array.isArray(ingredients) && ingredients.map((el) => {
                            return (
                                <div key={el.id} className="flex items-center text-darkblue text-[18px] md:text-[22px] py-2 border-b border-gray space-x-6">
                                    <Plus className="text-red border-2 border-red rounded-sm ml-6" />
                                    <p className="w-12">{formatNumber(getUpdatedQuantity(el.qte_gramme))}</p>
                                    <p>{el.unite}</p>
                                    <p>{el.ingredient}</p>
                                    <p></p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>


            {/* usetnsiles----------------------------------------------------------- */}
            <section className="w-full md:w-3/4 lg:w-2/4 mt-16">
                <div className="flex items-center ingTitle">
                    <Image src={tools} alt="icon" />
                    <p className="text-[32px] mr-2">الأواني</p>
                </div>

                <ol className="mt-4 mr-4 list-decimal marker:text-blue text-[16px] md:text-[18px]">
                    {
                        Array.isArray(ustensiles) && ustensiles.map((el) => {
                            return <li key={el.id} className="my-3">{el.title}</li>
                        })
                    }
                </ol>

            </section>


            {/* steps--------------------------------------------------------------------- */}
            <section ref={setpsRef} className="w-full md:w-3/4 lg:w-2/4 mt-16">
                <div className="flex items-center ingTitle">
                    <Image src={step} alt="icon" />
                    <p className="text-[32px] mr-2">الخطوات</p>
                </div>

                <ol className="mt-4 mr-4 list-decimal marker:text-blue text-[16px] md:text-[18px]">
                    {
                        Array.isArray(sortedSteps) && sortedSteps.map((el) => {
                            return (
                                <li key={el.id} className="my-3">
                                    <p>{el.title && el.title}</p>
                                    <p>{el.description}</p>
                                </li>
                            )
                        })
                    }
                </ol>
            </section>
        </div>
    )
}

export default SecondPart