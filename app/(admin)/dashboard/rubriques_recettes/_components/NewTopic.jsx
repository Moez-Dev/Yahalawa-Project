'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import dynamic from 'next/dynamic'
import { newTopic } from "@/app/actions/topic-action"
const Select = dynamic(() => import("react-select"), { ssr: false })


const NewTopic = ({ recipes }) => {

    const { pending } = useFormStatus()

    const [open, setOpen] = useState(false)

    //handle recipe
    const [recipe, setRecipe] = useState([])
    const handleRecipe = (option) => {
        setRecipe(option);
    };

    //send data
    const handleAction = async (formData) => {

        const type = "Free"
        const result = await newTopic(formData, type)

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            setOpen(false)
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <button variant="outline" className="green-btn">&#10010; Ajouter une rubrique</button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center lg:h-[55%] custom-scrollbar">

                <DialogHeader>
                    <DialogTitle className="text-2xl">Nouvelle rubrique</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form action={handleAction} className="flex flex-col items-center w-fit">

                    <div>
                        <p className="text-sm text-[#94a3b8]">Titre : <span className='text-red text-lg'>*</span></p>
                        <input
                            name="title"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 mb-6 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        />
                    </div>

                    <div>
                        <p className="text-sm text-[#94a3b8]">Recette : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={recipes.map((el) => ({
                                value: `${el.id}|${el.id_intern}`,
                                label: el.id_intern,
                                id: el.id
                            }))}
                            onChange={handleRecipe}
                            value={recipe}
                            name="recette"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center mt-8">
                        <DialogFooter>
                            <button className="green-btn" type="submit" disabled={pending} >
                                {pending
                                    ?
                                    <div className="flex items-center space-x-1">
                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                        <span>Ajouter</span>
                                    </div>
                                    :
                                    'Ajouter'
                                }
                            </button>
                        </DialogFooter>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default NewTopic







