'use client'

import { useState } from "react"
import Link from "next/link"
import { Mail, Eye, EyeOff } from "lucide-react"
import { doSocialLogin, register } from "@/app/actions/auth"
import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"



const RegisterForm = () => {

    const { pending } = useFormStatus()

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;



    const handleAction = async (formData) => {

        let name = formData.get('name')
        let email = formData.get('email')
        let pwd = formData.get('password')
        let address = formData.get('address')

        if (address) { return }

        if (!name) {
            return toast.error('الاسم مفقود من القائمة')
        }

        if (!validEmail.test(email) || email == "") {
            return toast.error('البريد الإلكتروني غير صالح')
        }

        if (!validPwd.test(pwd) || pwd == "") {
            return toast.error(' كلمة المرور لا تلبي المتطلبات')
        }

        const result = await register(formData)

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            router.push('/email_sended')
        }
    };


    return (
        <section className="w-72 mb-4">

            <form action={doSocialLogin} className="space-y-5 mb-5">
                <button
                    className="flex items-center justify-center space-x-3 border-2 border-[#1831536E] rounded-md py-2 px-8 w-full"
                    type="submit"
                    name="action"
                    value="google"
                >
                    {pending
                        ?
                        (<div className="flex items-center space-x-2">
                            <LoaderCircle className="animate-spin text-blue" />
                            <p className="text-darkblue font-semibold">التسجيل عبر جوجل</p>
                        </div>)
                        :
                        (<>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <p className="text-darkblue font-semibold">التسجيل عبر جوجل</p>
                        </>)
                    }

                </button>

                <button
                    className="flex items-center justify-center space-x-3 border-2 border-[#1831536E] rounded-md py-2 px-8 w-full"
                    type="submit"
                    name="action"
                    value="facebook"
                >
                    {pending
                        ?
                        <div className="flex items-center space-x-2">
                            <LoaderCircle className="animate-spin text-blue" />
                            <p className="text-darkblue font-semibold">التسجيل عبر فيسبوك</p>
                        </div>
                        :
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                            </svg>
                            <p className="text-darkblue font-semibold">التسجيل عبر فيسبوك</p>
                        </>
                    }
                </button>
            </form>

            {/* with email************************************************************************/}
            <div className="flex items-center w-full mb-5">
                <p className="bg-darkblue w-full h-[1px]"></p>
                <p className="mx-8 whitespace-nowrap">أو</p>
                <p className="bg-darkblue w-full h-[1px]"></p>
            </div>

            <form action={handleAction} dir="rtl" className="space-y-5">
                <input type="text" name="name" placeholder="الإسم" className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />

                <div className="relative">
                    <input type="email" name="email" placeholder="عنوان البريد الإلكتروني" className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />
                    <Mail className="absolute left-4 top-[17.5px] text-[#1831536E] size-4" />
                </div>

                <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="كلمة المرور" className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-4 text-[#1831536E] cursor-pointer">
                        {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                    </div>
                </div>

                <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />


                <div dir="rtl" className="mt-2 space-y-2">
                    <p className="text-sm">يرجى إنشاء كلمة مرور مكونة على الاقل من 8 أحرف (مزيج من الأحرف الكبيرة و الصغيرة والأرقام )</p>
                    <p className="text-darkblue text-sm"> بإنشائك لحساب، أنت توافق على <Link href="/terms_of_service" className="text-blue underline">شروط الاستخدام وسياسة الخصوصية</Link></p>
                </div>

                <div className="text-center">
                    <button type="submit" disabled={pending} className="py-3 w-full bg-blue text-white text-lg rounded-md border border-blue hover:text-blue hover:bg-white duration-300">
                        {pending
                            ?
                            <div className="flex items-center space-x-1">
                                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                <span>فتح حساب جديد</span>
                            </div>
                            :
                            'فتح حساب جديد'
                        }
                    </button>
                </div>
            </form>

        </section>

    )
}

export default RegisterForm