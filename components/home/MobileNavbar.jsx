import prisma from "@/lib/db"
import { auth } from "@/auth"
import MobileMenu from "./MobileMenu";


const MobileNavbar = async () => {

    //get session
    const session = await auth();

    //get menu data
    const menu = await await prisma.editableMenu.findMany({
        include: {
            subtitle: true
        },
        orderBy: {
            id: 'desc',
        }
    });


    return (
        <nav className="block lg:hidden">
            <MobileMenu menu={menu} session={session} />
        </nav>
    )
}

export default MobileNavbar