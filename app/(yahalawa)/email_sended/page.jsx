import MobileNavbar from "@/components/home/MobileNavbar"
import Navbar from "@/components/home/Navbar"


const EmailSended = () => {

    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

            <header className="w-full mb-8">
                <Navbar />
                <MobileNavbar />
            </header>

            <div className="flex items-center w-full">
                <p className="bg-[#18315366] w-full h-[1px]"></p>
                <h1 className="text-blueTitle text-2xl mx-8 whitespace-nowrap">! مرحبا بيك في ياحلاوة </h1>
                <p className="bg-[#18315366] w-full h-[1px]"></p>
            </div>

           <p dir="rtl" className="mt-28 text-lg text-darkblue w-80 text-center">
           تم إرسال رسالة تأكيد إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد والنقر على الزر لتفعيل حسابك.
           </p>
        </main>
    )
}

export default EmailSended