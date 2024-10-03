'use client'

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SidebarItem from "../_components/SidebarItem"
import logo from "@/public/logo.svg"
import chevronLeft from "@/public/chevron/chevron-left.svg"
import chevronRight from "@/public/chevron/chevron-right.svg"
import chevronDown from "@/public/chevron/chevron-down.svg"
import { ScrollArea } from "@/components/ui/scroll-area"
import AdminLogout from "./AdminLogout"


const Sidebar = ({ session }) => {

  const pathname = usePathname()

  const [navExpanded, setNavExpanded] = useState(false)
  const [sideExpanded, setsideExpanded] = useState({})


  const toggleExpand = (title) => {
    setsideExpanded((prevState) => ({
      ...prevState,
      [title]: !prevState[title]
    }))
  }


  useEffect(() => {
    if (!navExpanded) {
      setsideExpanded({})
    }
  }, [navExpanded])

  //handle expand
  const sidebarRef = useRef()
  useEffect(() => {
    function handler(e) {
      if (!sidebarRef.current.contains(e.target)) {
        setNavExpanded(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)

  }, []);


  return (
    <aside ref={sidebarRef} className={`h-screen  fixed top-0 left-0 transition-all duration-300 ease-in-out transform z-50 ${!navExpanded ? 'w-[55px]' : 'w-[224px]'}`}>
      <nav className="h-full flex flex-col bg-darkblue">

        <div className="flex justify-between items-center p-4 h-16">
          <Image
            src={logo}
            className={` ${navExpanded ? "block" : "hidden"} overflow-hidden width-transform duration-300 ease-in-out transform w-32`}
            alt="logo"
          />
          <button
            onClick={() => setNavExpanded(!navExpanded)}
            className="absolute right-[-8px] bg-darkblue rounded-full p-1"
          >
            {navExpanded ? <Image src={chevronLeft} alt="icon" /> : <Image src={chevronRight} alt="icon" />}
          </button>
        </div>

        {/* items *************************************************/}
        <ScrollArea className="rounded-md">
          <ul className="px-1.5 text-white overflow-x-hidden overflow-y-auto">
            {
              SidebarItem.map((el, i) => {
                const { subtitle, icon, title, href } = el
                const isActive = pathname === href || pathname.startsWith(`${href}/`)
                const isSubActive = subtitle && subtitle.some(e => e.href === pathname)
                return (
                  <li key={i}
                    className="my-3"
                    onClick={() => subtitle && toggleExpand(title)}
                  >
                    {subtitle ?
                      <div onClick={() => { !navExpanded && setNavExpanded(true) }} className={`${isSubActive ? 'bg-[#374c69]' : ''} flex items-center whitespace-nowrap py-1.5 px-2.5 hover:bg-[#374c69] rounded-md cursor-pointer`}>
                        <Image src={icon} alt="icon" />
                        <div className={`w-36 overflow-hidden flex items-end justify-between ml-4 overflow-hidden width-transform duration-300 ease-in-out transform ${navExpanded ? 'block' : 'hidden'}`}>
                          <p>{title}</p>
                          {subtitle && <Image src={chevronDown} alt="icon" className="items-end" />}
                        </div>
                      </div>
                      :
                      <Link href={href} className={`${isActive ? 'bg-[#374c69]' : ''} flex items-center py-1.5 px-2.5 w-fit hover:bg-[#374c69] rounded-md cursor-pointer`}>
                        <Image src={icon} alt="icon" />
                        <div className={`w-36 overflow-hidden flex items-end justify-between ml-4 overflow-hidden width-transform duration-300 ease-in-out transform  ${navExpanded ? 'block' : 'hidden'}`}>
                          <p>{title}</p>
                          {subtitle && <Image src={chevronDown} alt="icon" className="items-end" />}
                        </div>
                      </Link>}

                    {/* subtitle *************************************************/}
                    <ul className={`overflow-hidden width-transform duration-300 ease-in-out transform  ${navExpanded ? 'block' : 'hidden'}`}>
                      {subtitle && sideExpanded[title] &&
                        subtitle.map((el, i) => {
                          const isActive = pathname === el.href || pathname.startsWith(`${el.href}/`)
                          return (
                            <Link href={el.href} key={i}>
                              <li className={`${isActive ? 'text-blue' : ''} flex items-center ml-8 w-fit py-1 px-2.5 hover:bg-[#374c69] rounded-md cursor-pointer`}>
                                <p className="size-1.5 bg-white rounded-full mr-2"></p>
                                <p>{el.title}</p>
                              </li>
                            </Link>
                          )
                        })
                      }
                    </ul>
                  </li>
                )
              })
            }
          </ul>

          {/* ADMIN PART----------------------------------------------- */}
          <AdminLogout />

        </ScrollArea>
      </nav>
    </aside>
  )
}

export default Sidebar