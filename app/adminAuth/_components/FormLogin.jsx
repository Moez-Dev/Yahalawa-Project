'use client'

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { adminLog } from "@/app/actions/adminAuth"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"


const FormLogin = () => {

    const router = useRouter()
    const { pending } = useFormStatus()

    const [showPassword, setShowPassword] = useState(false)

    const handleAction = async (formData) => {

        const email = formData.get('email')
        const password = formData.get('password')
        const address = formData.get('address')

        if (address) { return }

        if (!email || !password) {
            toast.error('Veuillez renseigner vos identifiants.')
            return
        };

        const result = await adminLog(formData)

        if (result?.error) {
            return toast.error("Identifiants incorrects !!")
        } else {
            router.push('/dashboard/home')
        }
    };


    return (
        <form action={handleAction} className='flex flex-col items-center justify-center'>
            <input type="email" name="email" placeholder="Email" className="bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-72 md:w-96 outline-none focus:ring-[1.5px] focus:ring-ringblue" />

            <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="mt-6 bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-72 md:w-96 outline-none focus:ring-[1.5px] focus:ring-ringblue" />
                <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-[#1831536E] cursor-pointer">
                    {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </div>
            </div>

            <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />
            
            <button type="submit" disabled={pending} className="mt-10 w-48 tracking-wide blue-btn">
                {pending
                    ?
                    <div className="flex items-center space-x-1">
                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                        <span>LOGIN</span>
                    </div>
                    :
                    'LOGIN'
                }
            </button>
        </form>
    )
}

export default FormLogin