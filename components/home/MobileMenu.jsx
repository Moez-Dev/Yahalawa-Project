'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import logo from "@/public/logo.svg"
import { User, Bell, Bookmark, LogOut, MoveRight } from "lucide-react"
import { doLogout } from "@/app/actions/auth"
import { ScrollArea } from "@/components/ui/scroll-area"


const MobileMenu = ({ menu, session }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [isSubtitle, setIsSubtitle] = useState(false);
    const [subtitleList, setSubtitleList] = useState([])
    const [title, setTitle] = useState("")

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isSubtitle) {
            setIsSubtitle(false)
        }
    };

    //handle subttile
    const toggleSubTitle = (item) => {
        setIsSubtitle(!isSubtitle)
        const selectedItem = menu.find((el) => el.title === item)

        if (selectedItem) {
            setTitle(selectedItem.title)
            setSubtitleList(selectedItem.subtitle)
        }
    };

    console.log(subtitleList)


    return (
        <>
            <div className="bg-white flex items-center justify-between z-50 fixed top-0 left-0 h-20 w-full p-4">
                <Link href="/">
                    <Image
                        src={logo}
                        className='w-36 cursor-pointer'
                        alt="logo"
                    />
                </Link>

                <button
                    className="relative w-8 h-8 flex flex-col justify-center items-center group"
                    onClick={toggleMenu}
                >
                    <div
                        className={`w-full h-1 bg-[#F33BD6] rounded absolute transition-transform duration-300 ease-in-out transform ${isOpen ? 'rotate-45' : 'translate-y-1.5'
                            }`}
                    />
                    <div
                        className={`w-full h-1 bg-[#F33BD6] rounded absolute transition-transform duration-300 ease-in-out transform ${isOpen ? '-rotate-45' : '-translate-y-1.5'
                            }`}
                    />
                </button>
            </div>

            {/* menu-------------------------------------------- */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-white text-xl text-[#94a3b8] z-20 transition-transform duration-500 ease-in-out transform ${isOpen ? '-translate-x-0' : 'translate-x-full'
                    }`}
            >

                <h1 className='absolute top-28 text-2xl text-end border-b w-full pr-12'>القائمة</h1>
                <ul className="flex flex-col items-end justify-center h-full space-y-6 pr-12 mt-12">
                    <li >
                        <Link href={session?.user !== undefined ? "/myrecipes" : "/login"}
                            className="hover:text-[#F33BD6] duration-300"
                        >
                            <span>وصفاتي</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/premium/home" className="hover:text-[#F33BD6] duration-300">
                            By TT ياحلاوة
                        </Link>
                    </li>
                    <li>
                        <Link href="" className="hover:text-[#F33BD6] duration-300">
                            <span>إشعار</span>
                        </Link>
                    </li>

                    {/* title----------- */}
                    {Array.isArray(menu) && menu.map(el => {
                        return (
                            <li key={el.id} onClick={() => toggleSubTitle(el.title)}
                                className="hover:text-[#F33BD6] duration-300 cursor-pointer">
                                {el.title}
                            </li>)
                    })}

                    {/* account---------- */}
                    {!session?.user
                        ?
                        (<li>
                            <Link href="/login" className="hover:text-[#F33BD6] duration-300">
                                <span>تسجيل الدخول</span>
                            </Link>
                        </li>)
                        :
                        (<li>
                            <form action={doLogout}>
                                {session?.user?.role == "SUPER_ADMIN" && "ADMIN" && "T_TELECOM" &&
                                    <div className="mb-6 w-full flex items-center justify-end cursor-pointer hover:text-[#F33BD6] duration-300">
                                        <Link href="/compte">حسابي</Link>
                                        <User className="size-4" />
                                    </div>}
                                <button type="submit" className=" w-full flex items-center justify-end space-x-2 cursor-pointer hover:text-[#F33BD6] duration-300">
                                    <p>خروج</p>
                                    <LogOut className="size-4" />
                                </button>
                            </form>
                        </li>)
                    }
                </ul>
            </div>

            {/* subtitle--------------------------------------- */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-white text-xl text-[#94a3b8] z-30 transition-transform duration-500 ease-in-out transform ${isSubtitle ? '-translate-x-0' : 'translate-x-full'
                    }`}
            >

                <div className='absolute top-28 right text-2xl border-b w-full pr-12 pb-1 flex items-end justify-end space-x-2'>
                    <h1>{title}</h1>
                    <MoveRight onClick={() => setIsSubtitle(false)} className="cursor-pointer hover:text-blue duration-300 " />
                </div>
                <ul className="flex flex-col items-end justify-start custom-scrollbar h-[65vh] space-y-4 pr-12 mt-48">
                    {subtitleList.map(el => {
                        return (
                            <Link href={`/recipe_category/${el.title}`}>
                                <li key={el.id} className='hover:text-[#F33BD6] duration-300'>{el.title}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default MobileMenu