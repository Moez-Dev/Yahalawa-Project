'use client'

import { useState, useRef } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useFormStatus } from "react-dom"
import { editPwd } from "@/app/actions/auth"
import { toast } from "sonner"


const FormData = ({ email }) => {

    const { pending } = useFormStatus()

    const [showPassword, setShowPassword] = useState(false)

    const formRef = useRef()

    const validPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const handleAction = async (formData) => {

        let pwd = formData.get('new_password')
        let address = formData.get('address')

        if (address) { return }

        if (!validPwd.test(pwd) || pwd == "") {
            return toast.error(' كلمة المرور لا تلبي المتطلبات')
        }

        formData.append('email', JSON.stringify(email))

        const result = await editPwd(formData)

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            formRef.current.reset()
            toast.success('لقد تم تغيير كلمة المرور الخاصة بك')
        }
};


    return (
        <form action={handleAction} ref={formRef} className='mt-8'>

            <div className='text-darkblue'>
                <p className='text-lg'>هل تريد تغيير كلمة المرور؟</p>
                <p className="text-sm">يرجى إنشاء كلمة مرور مكونة على الاقل من 8 أحرف (مزيج من الأحرف الكبيرة و الصغيرة والأرقام )</p>

                <div className="relative mt-4">
                    <input type={showPassword ? 'text' : 'password'} name="current_password" placeholder="كلمة المرور الحالية" className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-3 text-[#1831536E] cursor-pointer">
                    {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                    </div>
                </div>

                <div className="relative mt-4">
                    <input type={showPassword ? 'text' : 'password'} name="new_password" placeholder="كلمة المرور الجديدة" className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-3 text-[#1831536E] cursor-pointer">
                    {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                    </div>
                </div>

                <div className="relative mt-4">
                    <input type={showPassword ? 'text' : 'password'} name="confirm_password" placeholder="أعد كتابة كلمة المرور الجديدة" className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-3 text-[#1831536E] cursor-pointer">
                    {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                    </div>
                </div>

                <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue" />


                <p className="text-blue mt-2 cursor-pointer hover:underline duration-300">نسيت كلمة المرور ؟</p>
            </div>

            <input type="hidden" name="email" value={email} />

            <button className="yahalawa-btn mt-8 py-3 w-full" type="submit" disabled={pending}>
                {pending
                    ?
                    <div className="flex items-center space-x-1">
                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                        <span>تسجيل التغير</span>
                    </div>
                    :
                    'تسجيل التغير'
                }
            </button>
        </form>
    )
}

export default FormData