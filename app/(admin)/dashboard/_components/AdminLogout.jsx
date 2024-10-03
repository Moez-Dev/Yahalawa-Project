'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useFormStatus } from "react-dom"
import { LogOut } from "lucide-react"
import { adminLogout } from "@/app/actions/adminAuth"


const AdminLogout = () => {

    const { pending } = useFormStatus()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='flex items-center py-1.5 px-2.5 w-fit hover:bg-[#374c69] rounded-md cursor-pointer'>
                    <LogOut  className="size-5 ml-2 text-white" />
                </button>
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Sign out</DialogTitle>
                    <DialogDescription className="text-base text-center">
                        <p className="mt-4">Vous souhaitez quitter la session ?</p>
                    </DialogDescription>
                </DialogHeader>

                <DialogTrigger asChild>
                    <form action={adminLogout} className="mt-2">
                        <button className="red-btn text-base" type="submit" disabled={pending} >
                            {pending
                                ?
                                <div className="flex items-center space-x-1">
                                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                    <span>Logout</span>
                                </div>
                                :
                                'Logout'
                            }
                        </button>
                    </form>
                </DialogTrigger>

            </DialogContent>

        </Dialog>
    )
}

export default AdminLogout







