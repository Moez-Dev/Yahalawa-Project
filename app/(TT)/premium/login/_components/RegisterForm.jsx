'use client'

import { useState } from "react"
import { Smartphone, Eye, EyeOff } from "lucide-react"
import { login } from "@/app/actions/auth"
import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import ForgotPwd from "./ForgotPwd"



const RegisterForm = () => {

    const { pending } = useFormStatus()

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)


    const handleAction = async (formData) => {

        let phone_number = formData.get('phone_number')
        let pwd = formData.get('password')
        let address = formData.get('address')

        if (address) { return }


        if (!pwd) {
            return toast.error(' كلمة المرور لا تلبي المتطلبات')
        }

        if (!phone_number) {
            return toast.error(' كلمة المرور لا تلبي المتطلبات')
        }

        try {
            const result = await login(formData, 'phone')

            if (result?.error) {
                return toast.error("بيانات اعتماد غير صالحة")
            } else {
                router.push('/premium/home')
            }
        } catch (error) {
            console.log(error)
        }
    };
    


    return (
        <section className="w-72 mb-2">

            <p className="w-full text-center whitespace-nowrap text-[#183153BA] mb-8">يرجى تسجيل الدخول للاستمتاع بالمحتوى</p>

            <form action={handleAction} dir="rtl">

                <div className="relative">
                    <input 
                        type="number"
                        name="phone_number"
                        placeholder="رقم الجوال إتصالات تونس"
                        className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue"
                    />
                    <Smartphone className="absolute left-4 top-[17.5px] text-[#1831536E] size-4" />
                </div>

                <div className="relative mt-5">
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="كلمة المرور"
                        className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue"
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-4 text-[#1831536E] cursor-pointer">
                        {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <button type="submit" disabled={pending} className="py-3 w-full yahalawa-btn">
                        {pending
                            ?
                            <div className="flex items-center space-x-1">
                                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                <span>تسجيل</span>
                            </div>
                            :
                            'تسجيل'
                        }
                    </button>
                </div>

                <ForgotPwd />

                <p className="text-[#5E5DC0] mt-4">تحب تستمتع بالخدمة ؟ </p>
                <p className="text-[#5E5DC0] text-lg">إتصل بالرقم التالي #1*403*</p>

                <div className="text-sm mt-4 text-[#666666]">
                    <p>Yahalawa by TT</p>
                    <p>عرض خاص بمشتركي إتصالات تونس.</p>
                    <p>أول 3 أيام مجانية ثم يصبح السعر 0,5 دت/يوم فقط.</p>
                </div>


                <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />

            </form>

        </section>

    )
}

export default RegisterForm