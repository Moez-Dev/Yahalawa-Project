import Footer from "@/components/home/Footer"
import Navbar from "@/components/home/Navbar"
import FormData from "./_components/FormData"
import { Mail } from "lucide-react"
import MobileNavbar from "@/components/home/MobileNavbar"

const Page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8 mt-2 lg:mt-0">

            <header className="w-full">
                <Navbar />
                <MobileNavbar />
            </header>

            <div className='w-full mt-10'>
                <div className="w-full flex items-center justify-end text-blueTitle text-2xl mb-2">
                    <p href="/compte">للتواصل</p>
                    <Mail className="size-5 ml-2" />
                </div>
                <p className="bg-blueTitle w-full h-[1px]"></p>
            </div>

            <FormData />

            <Footer />
        </main>
    )
}

export default Page