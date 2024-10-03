'use client'

import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import { sendEmail } from "@/app/actions/sendEmail"
import { useRef } from "react"


const FormData = () => {

    const { pending } = useFormStatus()

    const formRef = useRef(null)

    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handleAction = async (formData) => {
        
        let name = formData.get('name')
        let email = formData.get('email')
        let subject = formData.get('subject')
        let message = formData.get('message')
        let address = formData.get('address')

        if(address) { return }

        if(!name) {
            return toast.error('الاسم مفقود من القائمة')
        }

       if (!validEmail.test(email) || email == "") {
            return toast.error('البريد الإلكتروني غير صالح')
        }

       if (!message) {
           return toast.error(' كلمة المرور لا تلبي المتطلبات')
        }

        const result = await sendEmail(formData)
        if(result?.success) {
            formRef.current.reset()
            toast.success('تم استلام رسالتك بنجاح! سنعود إليك في أقرب وقت ممكن. شكراً لتواصلك معنا.')
        }

    };


    return (
        <form dir="rtl" ref={formRef} action={handleAction} className="mt-8 mb-10 p-8 border border-gray rounded-md shadow-xl w-full md:w-auto">

            <div className="flex flex-col space-y-8">
                <input type="text" name="name" placeholder="الإسم" className="w-72 md:w-96 bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />

                <input type="email" name="email" placeholder="عنوان البريد الإلكتروني" className="w-72 md:w-96 bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />
               
                <input type="text" name="subject" placeholder="الموضوع" className="w-72 md:w-96 bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />

                <textarea
                    rows="4"
                    className="p-2.5 w-72 md:w-96 resize-none bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue"
                    name='message'
                    placeholder="الرسالة">
                </textarea>

                <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />
            </div>

            <div className="text-center mt-10">
                <button type="submit" disabled={pending} className="py-3 w-48 bg-blue text-white text-lg rounded-md border border-blue hover:text-blue hover:bg-white duration-300">
                    {pending
                        ?
                        <div className="flex items-center space-x-1">
                            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                            <span>إرسال الرسالة</span>
                        </div>
                        :
                        'إرسال الرسالة'
                    }
                </button>
            </div>
        </form>
    )
}

export default FormData