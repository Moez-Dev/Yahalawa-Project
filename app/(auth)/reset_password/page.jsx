'use client'

import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import { useState } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { Eye, EyeOff, User } from "lucide-react"
import { resetPwd } from "@/app/actions/auth"
import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo.svg"



const ResetPwd = () => {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const { pending } = useFormStatus()

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const validPwd = /^[a-zA-Z0-9]{6,}$/;


    const handleAction = async (formData) => {

        if (!token) return toast.error('no token')

        let password = formData.get('password')
        let address = formData.get('address')

        if (address) { return }

        if (!validPwd.test(password) || password == "") {
            return toast.error('كلمة المرور لا تلبي المتطلبات')
        }

        try {
            await resetPwd(token, password)
            toast.success('تم تفعيل كلمة المرور الخاصة بك بنجاح')
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

            <header className="flex items-center justify-between w-full">
                <Link href="/">
                    <Image
                        src={logo}
                        className='w-36 cursor-pointer'
                        alt="logo"
                    />
                </Link>

                <div></div>
            </header>

            <div className='w-full mt-6'>
                <div className="w-full flex items-center justify-end text-blueTitle text-2xl mb-2">
                    <p href="/compte">إعادة تعيين كلمة المرور</p>
                    <User className="size-5" />
                </div>
                <p className="bg-blueTitle w-full h-[1px]"></p>
            </div>

            <form action={handleAction} className=" mt-24 lg:mt-36">
                <div dir="rtl" className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password" placeholder="كلمة المرور"
                        className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-80 lg:w-96 outline-none focus:ring-[0.8px] focus:ring-ringblue"
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-4 text-[#1831536E] cursor-pointer">
                        {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                    </div>
                </div>

                <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />

                <div className="text-center mt-8">
                    <button type="submit" disabled={pending} className="py-3 w-48 yahalawa-btn">
                        {pending
                            ?
                            <div className="flex items-center space-x-1">
                                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                <span>تسجيل كلمة المرور</span>
                            </div>
                            :
                            'تسجيل كلمة المرور'
                        }
                    </button>
                </div>
            </form>
        </main>
    )
}

export default ResetPwd

