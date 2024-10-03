'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import { useFormStatus } from "react-dom"
import { useState } from "react"
import dynamic from 'next/dynamic'
import { editCategory } from "@/app/actions/category-action"
const Select = dynamic(() => import("react-select"), { ssr: false })
import { Pencil } from "lucide-react"
import { toast } from "sonner"


const EditCatgeory = ({ el }) => {


    const { pending } = useFormStatus()

    const [selectedOption, setSelectedOption] = useState(el.status ? { value: el.status, label: el.status } : null);

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    const [open, setOpen] = useState(false)

    const handleAction = async (formData) => {
        const result = await editCategory(formData)

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            setOpen(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className='border-2 rounded-md p-1.5 hover:border-blue duration-300'>
                <Pencil className="size-5" />
                </button>
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Editer catégorie</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form action={handleAction} className="grid gap-4 p-4 overflow-y-auto h-[80vh]">
                    <div>
                        <p className="text-sm text-[#94a3b8]">Titre : <span className='text-red text-lg'>*</span></p>
                        <input
                            placeholder="Titre"
                            name="title"
                            defaultValue={el.title}
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        />
                    </div>

                    <div className="my-3">
                        <p className="text-sm mb-1 text-[#94a3b8]">Description :</p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            placeholder="Description"
                            name='description'
                            defaultValue={el.description}>
                        </textarea>
                    </div>

                    <div className="mb-3">
                        <p className="text-sm mb-1 text-[#94a3b8]">Statut : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={[{ value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' }
                            ]}
                            onChange={handleChange}
                            value={selectedOption}
                            name="status"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                        />
                    </div>

                    {/*Référencement Google----------------------------------------------------------- */}

                    <p className="font-semibold">Référencement Google :</p>
                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
                        <input
                            placeholder="Titre"
                            name="seoTitle"
                            defaultValue={el.seoTitle}
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        />
                    </div>

                    <div className="my-3">
                        <p className="text-sm mb-1 text-[#94a3b8]">Description : </p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            placeholder="Description"
                            name='seoDescription'
                            defaultValue={el.seoDescription}>
                        </textarea>
                    </div>

                    <input type="hidden" name="id" value={el.id} />

                    <div className="flex flex-col items-center justify-center">
                        <DialogFooter>
                            <button className="green-btn text-sm" type="submit" disabled={pending} >
                                {pending
                                    ?
                                    <div className="flex items-center space-x-1">
                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                        <span>Sauvgarder</span>
                                    </div>
                                    :
                                    'Sauvgarder'
                                }
                            </button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default EditCatgeory






