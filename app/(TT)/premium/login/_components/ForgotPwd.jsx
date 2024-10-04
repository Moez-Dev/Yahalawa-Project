'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useFormStatus } from "react-dom"
import { useState } from "react"
import { Smartphone } from "lucide-react"



const ForgotPwd = ( ) => {


    const { pending } = useFormStatus()


    const [open, setOpen] = useState(false)
    const [checkMSg, setCheckMsg] = useState(false)
    const [phone_number, setPhone] = useState("")


    const handleAction = async () => {

        try {
            const response = await fetch('http://localhost:3000/api/premiumAuth/forgotPwd', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ phone_number }),
            });
        
            const data = await response.json();
            
            if (!response.ok) {
              throw new Error(data.error || 'Erreur lors de la réinitialisation du mot de passe');
            }
            
            if(response.status === 200){
                setCheckMsg(true)
                setTimeout(()=> {
                    setOpen(false)
                },3000)
            }
           
          } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe:', error);
            alert(error.message);
          }

    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <p className="text-blue mt-2 cursor-pointer hover:underline duration-300">نسيت كلمة المرور ؟</p>
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl">إعادة تعيين كلمة المرور</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                {!checkMSg ?
                <form action={handleAction} className="grid gap-4 p-4 overflow-y-auto ">

                    <div dir="rtl" className="relative">
                        <input 
                        type="number" 
                        placeholder="رقم الجوال إتصالات تونس" 
                        className="bg-[#007AFF0D] border border-[#1831536E] rounded-md py-3 px-4 w-80 lg:w-96 outline-none focus:ring-[0.8px] focus:ring-ringblue"
                        onChange={(e) => setPhone(e.target.value)}
                         />
                        <Smartphone className="absolute left-4 top-[17.5px] text-[#1831536E] size-4" />
                    </div>

                    <input type="text" name="address" placeholder="address" className="hidden bg-[#007AFF0D] border-2 border-[#1831536E] rounded-md py-3 px-4 w-full outline-none focus:ring-[1.5px] focus:ring-ringblue" />


                    <div className="flex flex-col items-center justify-center mt-4">
                        <DialogFooter>
                            <button className="green-btn" type="submit" disabled={pending} >
                                {pending
                                    ?
                                    <div className="flex items-center space-x-1">
                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                        <span>إرسال</span>
                                    </div>
                                    :
                                    'إرسال'
                                }
                            </button>
                        </DialogFooter>
                    </div>
                </form>
                :
                <div dir="rtl" className=" text-lg">
                    <p>تم إرسال كلمة المرور عبر إرسالية قصير.</p>
                </div>
                }
            </DialogContent>

        </Dialog>
    )
}

export default ForgotPwd






