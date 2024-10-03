'use client'

import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { editAbout } from "@/app/actions/footer-action"



const FormData = ({ terms, id }) => {

    const { pending } = useFormStatus()

    //send data
    const handleAction = async (formData) => {

        const result = await editAbout(formData)

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            toast.success('La section a été mis a jour');
        }
    };


    return (

        <form action={handleAction} className="bg-white rounded-md h-screen p-4 mb-2">
            <textarea
                rows="20"
                className="p-2.5 w-full resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                name='about'
                defaultValue={terms}
            >
            </textarea>

            <input type="hidden" name="id" value={id} />

            <div className="flex flex-col items-center justify-center mt-12">
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
            </div>
        </form>
    )
}

export default FormData