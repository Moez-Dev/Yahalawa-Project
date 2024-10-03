import Navbar from "@/components/home/Navbar"
import MobileNavbar from "@/components/home/MobileNavbar"
import RegisterForm from "./_components/RegisterForm"
import { auth } from '@/auth'
import { redirect } from "next/navigation"



const Login = async () => {

  //get session
  const session = await auth();

  if (session) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

      <header className="w-full mb-8">
        <Navbar />
        <MobileNavbar />
      </header>

      <div className="flex items-center w-full mt-4 lg:mt-0 mb-8">
        <p className="bg-[#18315366] w-full h-[1px]"></p>
        <h1 className="text-blueTitle text-2xl mx-8 whitespace-nowrap"> مرحبا بيك</h1>
        <p className="bg-[#18315366] w-full h-[1px]"></p>
      </div>

      <RegisterForm />

    </main>
  )
}

export default Login