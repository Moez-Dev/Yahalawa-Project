'use client'

import Image from "next/image"
import step from "@/public/recipePage/steps.svg"


const StepsPart = ({ ingredient_title, sortedSteps }) => {
  return (
    <section className="w-full md:w-2/4 mt-16">
          <div className="flex items-center ingTitle">
            <Image src={step} alt="icon" />
            <p className="text-[32px] mr-2">الخطوات</p>
          </div>

          {
            ingredient_title && <div className="mt-6">
              <p className="text-[#183153CC]">{ingredient_title}</p>
              <p className="h-0.5 stepsTitleBorder"></p>
            </div>
          }

          <ol className="mt-4 list-decimal marker:text-blue">
            {
              sortedSteps.map((el) => {
                return <li key={el.id} className="my-3">{el.title}</li>
              })
            }
          </ol>
        </section>
  )
}

export default StepsPart