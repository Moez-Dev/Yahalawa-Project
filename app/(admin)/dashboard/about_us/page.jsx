import prisma from "@/lib/db"
import FormData from "./_components/FormData"


const Page = async () => {

  const content = await prisma.footer.findMany()
  const terms = content.map(el => el.about)
  const id = content.map(el => el.id)



  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">About us</h1>
      <FormData terms={terms} id={id}/>

    </main>
  )
}

export default Page