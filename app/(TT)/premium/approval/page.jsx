
import Image from "next/image"
import Link from "next/link"
import logo from '@/public/telecom.svg'
import Navbar from "@/components/home/Navbar"
import ApprovalBtn from "./_components/ApprovalBtn"
import MobileNavbar from "@/components/home/MobileNavbar"
import { auth } from '@/auth'
import { redirect } from "next/navigation";



const Approval = async () => {

  //get session
  const session = await auth();

  const userId = session?.user?.id
  const approved = session?.user?.approuveTerms

  if(approved === true) {
    redirect('/premium/home')
  }


    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

            <header className="w-full mb-8">
                <Navbar />
                <MobileNavbar />
            </header>

            <Image
                src={logo}
                className='w-28 lg;w-36 mb-4'
                alt="logo"
            />

            <div className="flex items-center w-full mb-5">
                <p className="bg-[#18315366] w-full h-[1px]"></p>
                <h1 className="text-blueTitle text-2xl mx-8 whitespace-nowrap"> مرحبا بيك</h1>
                <p className="bg-[#18315366] w-full h-[1px]"></p>
            </div>

                <p className="w-full text-center whitespace-nowrap text-[#183153BA] mb-16 lg:mb-10">يرجى تسجيل الدخول للاستمتاع بالمحتوى</p>

                <div className="text-center">
                    <p className="text-darkblue mb-2">لقد قرأت و وافقت على</p>
                    <Link href="/terms_of_TT" className="hover:text-blue duration-300">الشروط العامة للبيع والإستخدام الخدمات <br/>Yahalawa by TT</Link>
                </div>

                <ApprovalBtn userId={userId} />

        </main>
    )
}

export default Approval