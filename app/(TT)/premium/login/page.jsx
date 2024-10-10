import Navbar from "@/components/home/Navbar"
import RegisterForm from "./_components/RegisterForm"
import Image from "next/image"
import logo from '@/public/telecom.svg'
import MobileNavbar from "@/components/home/MobileNavbar"

const Register = async () => {



  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

      <header className="w-full mb-8">
        <Navbar />
        <MobileNavbar />

      </header>

      <Image
        src={logo}
        className='w-28 lg;w-36 mb-4 mt-2 lg:mt-0'
        alt="logo"
      />

      <div className="flex items-center w-full mb-5">
        <p className="bg-[#18315366] w-full h-[1px]"></p>
        <h1 className="text-blueTitle text-2xl mx-8 whitespace-nowrap"> مرحبا بيك</h1>
        <p className="bg-[#18315366] w-full h-[1px]"></p>
      </div>

      <RegisterForm />

    </main>
  )
}

export default Register