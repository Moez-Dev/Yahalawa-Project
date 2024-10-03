import googlePlay from "@/public/footer/googlePlay.svg"
import appStore from "@/public/footer/appStore.svg"
import Image from "next/image"
import Link from "next/link"
import facebook from "@/public/footer/facebook.svg"
import instagram from "@/public/footer/instagram.svg"
import tiktok from "@/public/footer/tiktok.svg"
import youtube from "@/public/footer/youtube.svg"



const Footer = () => {
    return (
        <footer dir='rtl' className='w-full text-darblue'>

            <p className="bg-gray w-full h-[1px]"></p>

            <section className="lg:flex items-center justify-between mt-12">
                <div>
                    <p>كانك شاف في الطبخ ولا بادي جديد ! </p>
                    <p>كانك شاف في الطبخ ولا بادي جديد !
                        ياحلاوة، هو الموقع، إلي تلقى فيه أحسن وصفات الطبخ والحلويات !
                    </p>
                </div>
                <div>
                    <div className="flex items-center mt-8 lg:mt-0">
                        <Link href="" className="hover:scale-[1.03] duration-300">
                            <Image
                                src={googlePlay}
                                alt="icon"
                                className="ml-4"
                            />
                        </Link>

                        <Link href="" className="hover:scale-[1.03] duration-300">
                            <Image
                                src={appStore}
                                alt="icon"
                            />
                        </Link>
                    </div>
                    <p className="text-sm mt-1">إحصل الآن على تطبيق ياحلاوة !</p>
                </div>
            </section>

            <section className="mt-8">
                <div className="flex items-center">
                    <a href="https://www.youtube.com/@Yahalawa" target="_blank" rel="noopener">
                        <Image src={youtube} alt="icon" className="bg-red rounded-full p-2 ml-3 hover:bg-blue duration-300" />
                    </a>
                    <a href="https://www.tiktok.com/@yahalawaofficial" target="_blank" rel="noopener">
                        <Image src={tiktok} alt="icon" className="bg-red rounded-full p-2 hover:bg-blue duration-300" />
                    </a>
                    <a href="https://www.instagram.com/yahalawaofficial/" target="_blank" rel="noopener">
                        <Image src={instagram} alt="icon" className="bg-red rounded-full p-2 mx-3 hover:bg-blue duration-300" />
                    </a>
                    <a href="https://www.facebook.com/yahalawaofficial" target="_blank" rel="noopener">
                        <Image src={facebook} alt="icon" className="bg-red rounded-full p-2 hover:bg-blue duration-300" />
                    </a>
                </div>
                <p className="text-sm mt-1">تابعنا على مواقعنا الاجتماعية</p>
            </section>

            <section className="flex mt-8">
                <Link href="/contact" className="border-l border-darkblue pl-2 md:pl-4 hover:text-blue duration-300">إتصل بنا</Link>
                <Link href="/about_us" className="border-l border-darkblue px-2 md:px-4 hover:text-blue duration-300">معلومات عنا</Link>
                <Link href="/terms_of_service" className="px-2 md:px-4 hover:text-blue duration-300">سياسة الخصوصية</Link>
            </section>

            <section className="text-sm mt-8"> 
                <Link href="/terms_of_TT" className="hover:text-blue duration-300">الشروط العامة للبيع والإستخدام الخدمات ياحلاوة TT by </Link>
                <p className="text-[#183153BA]">يمكنك إلغاء إشتراكك في خدمات ياحلاوة TT by  بإرسال STOP إلى 85198.</p>
            </section>

            <section className="text-sm mt-8">
                <p>جميع حقوق النشر محفوظة لموقع ياحلاوة. ياحلاوة, علامة ليدر بوب <span>{new Date().getFullYear()}-2017©</span></p>
                
            </section>

        </footer>
    )
}

export default Footer