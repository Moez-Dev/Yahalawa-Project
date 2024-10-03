import prisma from "@/lib/db";
import FormData from "../_components/FormData"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


const Updatetips = async ({params}) => {

  const session = await auth()
  const role = session?.user?.role

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect('/')
  }
  const tips = await prisma.tips.findUnique({
    where: { id: Number(params.id) },
    include: {category: true}
  });

  const categoryList = await prisma.categoryTips.findMany({ where: { status: 'Active'}});


  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">Tips</h1>

      <FormData categoryList={categoryList} el={tips} />

    </main>
  )
}

export default Updatetips