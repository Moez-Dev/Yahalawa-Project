import { GetOrigine, GetTags } from "./_components/GetOrigine"
import SearchBar from "../_components/SearchBar"
import NewOrigine from "./_components/NewOrigine"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const OriginePage = async ({ searchParams }) => {

  const session = await auth()
  const role = session?.user?.role

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect('/')
}
  const query = searchParams?.query || ''

  const page = parseInt(searchParams.page || '1')
 
  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">Origines</h1>

      <div className="bg-white rounded-md mb-2">
        <div className="md:flex items-center justify-between px-2 py-1.5">
          <SearchBar />
          <NewOrigine />
        </div>
      </div>

      <GetOrigine page={page} query={query} />
    </main>
  )
}

export default OriginePage

