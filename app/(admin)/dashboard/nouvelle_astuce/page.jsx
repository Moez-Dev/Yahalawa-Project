import FormData from "./_components/FormData"
import prisma from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


const NewTips = async () => {

    const session = await auth()
    const role = session?.user?.role
    const author = session?.user?.name

    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      redirect('/')
  }

    const categoryList = await prisma.categoryTips.findMany({ where: { status: 'Active' } })

    return (
        <main className='ml-12 mt-8'>

            <h1 className="text-2xl font-semibold tracking-wide mb-4">Ajouter une astuce</h1>
            <FormData categoryList={categoryList} author={author} />

        </main>
    )
}

export default NewTips







