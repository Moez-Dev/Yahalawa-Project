'use client'

import { useState } from "react"
import SwitchBtn from "../../_components/SwitchBtn"

const FaitNutri = ({ recette }) => {

    console.log(recette)
    const [nutriOn, setNutriOn] = useState(false)

    return (
        <section>
            <p className="font-semibold mb-3">Fait nutritionnels :</p>
            <SwitchBtn setValue={setNutriOn} value={nutriOn} id="nutri" label="Afficher les faits nutritionnels" />

            <div className="md:flex items-center justify-between flex-wrap space-y-8">
                <div className="flex items-center space-x-6">
                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Glucides :</p>
                        <input
                            type="number"
                            name="glucides"
                            className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            disabled={!nutriOn}
                            defaultValue={recette.glucides === 0 ? null : recette.glucides}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Protéines :</p>
                        <input
                            type="number"
                            name="proteines"
                            className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            disabled={!nutriOn}
                            defaultValue={recette.proteines === 0 ? null : recette.proteines}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Graisses :</p>
                        <input
                            type="number"
                            name="graisses"
                            className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            disabled={!nutriOn}
                            defaultValue={recette.graisses  === 0 ? null : recette.graisses}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Kcal :</p>
                        <input
                            type="number"
                            name="kcal"
                            className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            disabled={!nutriOn}
                            defaultValue={recette.kcal === 0 ? null : recette.kcal}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaitNutri