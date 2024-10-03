import prisma from "@/lib/db"
import Menu from "./Menu";
import { auth } from "@/auth"


const Navbar = async () => {

    //get menu data
    const menu =  await await prisma.editableMenu.findMany({
        include: {
          subtitle: true
        },
        orderBy: {
          id: 'desc', 
        }
      });


    //get session
    const session = await auth();



    return (
        <nav>
            <Menu menu={menu} session={session} />
        </nav>
    )
}

export default Navbar