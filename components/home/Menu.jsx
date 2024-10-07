'use client'

import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo.svg"
import DropDown from "./DropDown"
import { usePathname } from "next/navigation"
import { User, Bell, Bookmark, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { doLogout } from "@/app/actions/auth"

const Menu = ({ menu, session }) => {

    const pathname = usePathname();

    return (
        <div className="hidden lg:flex items-center justify-between">
            <Link href="/">
                <Image
                    src={logo}
                    className='w-36 cursor-pointer'
                    alt="logo"
                />
            </Link>

            <ul className="flex items-center justify-between text-lg w-[75%] text-[#183153D4]">
                {menu.map((el) => {
                    return <DropDown key={el.id} items={el} />
                })}
                <li>
                    <Link href={session?.user !== undefined ? "/myrecipes" : "/login"} 
                        className={`${pathname === "myrecipes" || pathname.startsWith(`${"/myrecipes"}/`) ? 'menu-item' : 'bg-white'} flex items-center hover:text-blue duration-300`}
                    >
                        <span>وصفاتي</span>
                        <Bookmark className="size-3 ml-1" />
                    </Link>
                </li>
                <li>
                    <Link href="/premium/home" className= {`${pathname === "/premium/home" || pathname.startsWith(`${"/premium/home"}/`) ? 'text-[#F33BD6]' : 'text-[#183153D4'} hover:text-blue duration-300`}>
                        By TT ياحلاوة
                    </Link>
                </li>
                <li>
                    <Link href="" className="flex items-center hover:text-blue duration-300">
                        <span>إشعار</span>
                        <Bell className="size-3 ml-1" />
                    </Link>
                </li>

                {!session?.user
                    ?
                    (
                        <li>
                            <Link href="/login" className={`${pathname === "/login" || "/regsiter" || pathname.startsWith(`${"/login" || "/regsiter"}/`) ? 'menu-item' : 'bg-white'} flex items-center`}>
                                <span>تسجيل الدخول</span>
                                <User className="size-4 ml-1" />
                            </Link>
                        </li>
                    )
                    :
                    (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="outline-none flex items-end menu-item text-white">
                                    <p className="capitalize">{session?.user?.name}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" d="m7 10l5 5l5-5" /></svg>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="p-3 text-center">

                                    <form action={doLogout}>
                                        {session?.user?.role == "SUPER_ADMIN" || "ADMIN" || "T_TELECOM" &&
                                            <div className="w-full flex items-center justify-end cursor-pointer hover:text-blue duration-300">
                                                <Link href="/compte">حسابي</Link>
                                                <User className="size-4" />
                                            </div>}
                                        <button type="submit" className="mt-3 w-full flex items-center justify-end space-x-2 cursor-pointer hover:text-blue duration-300">
                                            <p>خروج</p>
                                            <LogOut className="size-4" />
                                        </button>
                                    </form>

                                </DropdownMenuContent>
                            </DropdownMenu>

                        </>
                    )
                }
            </ul>


        </div>
    )
}

export default Menu