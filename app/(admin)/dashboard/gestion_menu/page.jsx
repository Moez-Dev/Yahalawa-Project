import prisma from "@/lib/db"
import Column from "./_components/Column"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


const GestionMenu = async () => {

  //get user
  const session = await auth()
  const role = session?.user?.role

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect('/')
};

//get menu 
  const editableMenu =  await prisma.editableMenu.findMany({
    include: {
      subtitle: true
    },
    orderBy: {
      id: 'desc', 
    }
  });


  return (
    <main className='ml-12 mt-8'>

    <h1 className="text-2xl font-semibold tracking-wide mb-4">Gestion menu</h1>

      <div className="bg-white rounded-md flex items-start justify-between p-8">
          {
            Array.isArray(editableMenu) && editableMenu.map((el) => {
              return <Column key={el.id} menuList={el} />
            })
          }
      </div>

    </main>
  )
}

export default GestionMenu