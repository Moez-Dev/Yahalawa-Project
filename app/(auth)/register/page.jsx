import Navbar from "@/components/home/Navbar";
import RegisterForm from "./_components/RegisterForm"
import { auth } from '@/auth'
import { redirect } from "next/navigation"
import MobileNavbar from "@/components/home/MobileNavbar";

const Register = async () => {

    //get session
    const session = await auth();

    if (session) {
        redirect("/")
    };

    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

            <header className="w-full mb-8">
                <Navbar />
                <MobileNavbar />
            </header>

            <div className="flex items-center w-full mt-4 lg:mt-0">
                <p className="bg-[#18315366] w-full h-[1px]"></p>
                <h1 className="text-blueTitle text-2xl mx-8 whitespace-nowrap">! مرحبا بيك في ياحلاوة </h1>
                <p className="bg-[#18315366] w-full h-[1px]"></p>
            </div>

            <p className="my-6 text-darkblue font-semibold"> .باش تستمتع بالوظائف، يمكنك فتح حساب من الآن</p>

            <RegisterForm />
            
        </main>
    )
}

export default Register

