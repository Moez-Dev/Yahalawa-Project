'use client'

import { adminRegister } from "@/app/actions/adminAuth";
import { useRef } from "react";
import { useFormStatus } from "react-dom"
import { toast } from "sonner";

const AddForm = () => {

    const { pending } = useFormStatus()

    const formRef  = useRef()

    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validPwd = /^[a-zA-Z0-9]{6,}$/;


    const handleAction = async (formData) => {
        
        let email = formData.get('email')
        let name = formData.get('name')
        let pwd = formData.get('password')
        let address = formData.get('address')

        if(address) { return }

        if(!name) {
            return toast.error('Merci de renseigner le nom')
        }

       if (!validEmail.test(email) || email == "") {
            return toast.error('Merci de renseigner un email valide')
        }

       if (!validPwd.test(pwd) || pwd == "") {
           return toast.error('Merci de renseigner un mot de passe avec au moin 6 (lettres / chiffres)')
        }

        const result = await adminRegister(formData)

        if (result?.error) {
            toast.error(result?.error)
        }
        else {
            formRef.current.reset()
            toast.success('L\'admin a été ajouté avec succés')
        }
    };


    return (
        <form action={handleAction} ref={formRef} className="mt-8">
            <div>
                <p className="text-sm text-[#94a3b8]">Name :</p>
                <input
                    type='text'
                    name="name"
                    className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                />
            </div>

            <div className="mt-6">
                <p className="text-sm text-[#94a3b8]">Email :</p>
                <input
                    type='email'
                    name="email"
                    className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                />
            </div>

            <div className='mt-6'>
                <p className="text-sm text-[#94a3b8]">Mot de passe : </p>
                <input
                    type='password'
                    name="password"
                    className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                />
            </div>

            <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />

            <div className="text-center mt-8">
                    <button type="submit" disabled={pending} className="py-2 w-[200px] yahalawa-btn">
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
                </div>
        </form>
    )
}

export default AddForm