import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"



const DropDown = ({ items }) => {

    const { title, subtitle } = items;


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none flex items-end hover:text-blue duration-300">
                <p>{title}</p>
                <ChevronDown className="size-4 ml-0.5 mb-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 h-80 custom-scrollbar">

                <div dir="rtl">
                    {
                        subtitle.map((el) => {
                            return (
                                <DropdownMenuItem key={el.id} className="text-md">
                                    <Link href={`/recipe_category/${el.title}`}>
                                        {el.title}
                                    </Link>
                                </DropdownMenuItem>)
                        })
                    }
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown