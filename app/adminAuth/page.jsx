import Image from "next/image"
import logo from "@/public/logo.svg"
import FormLogin from "./_components/FormLogin"
import { auth } from "@/auth"
import { redirect } from "next/navigation";

const AdminAuth = async () => {

    const session = await auth();

    if(session) {
        redirect("/")
    }

    return (
        <main className='flex items-center justify-center bg-lightgray h-screen'>

            <div className='flex flex-col items-center justify-center bg-white rounded-md shadow-lg p-6'>
                <Image
                    src={logo}
                    className="w-48 mb-12"
                    alt="logo"
                />

                <FormLogin />

            </div>
        </main>
    )
}

export default AdminAuth