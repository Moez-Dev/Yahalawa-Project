import { auth } from '@/auth'
import Navbar from '@/components/home/Navbar'
import { User, Mail } from 'lucide-react'
import FormData from './_components/FormData';
import { redirect } from "next/navigation";

const Compte = async () => {

    //get session
    const session = await auth();

    if(!session) {
        redirect("/")
    }

    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

            <header className="w-full mb-8">
                <Navbar />
            </header>

            <div className='w-full mt-2'>
                <div className="w-full flex items-center justify-end text-blueTitle text-2xl mb-2">
                    <p href="/compte">حسابي</p>
                    <User className="size-5" />
                </div>
                <p className="bg-blueTitle w-full h-[1px]"></p>
            </div>

            <section dir="rtl" className='w-72'>
                <div className='mt-8'>
                    <p className='text-[#1831536E] mb-2 mr-2'>عنوان البريد الإلكتروني</p>
                    <div className='relative border-2 border-darkblue rounded-md py-3 px-6 w-full'>
                        <p className='text-darkblue text-base'>{session?.user?.email}</p> 
                        <Mail className="absolute left-4 top-4 size-4 text-darkblue" />
                    </div>
                </div>

               <FormData email={session?.user?.email} />
            </section>

        </main>
    )
}

export default Compte