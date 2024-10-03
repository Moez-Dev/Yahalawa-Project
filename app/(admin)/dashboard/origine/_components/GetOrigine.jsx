import prisma from "@/lib/db"
import Image from "next/image";
import PaginationControls from "../../_components/PaginationControls"
import DeleteOrigine from "./DeleteOrigine";

export const GetOrigine = async ({ query, page }) => {

  const pageSize = 100 

  const whereOrigine = query
  ? {
      title: {
        contains: query,
        mode: 'insensitive',
      },
    }
  : {};


  const totalItems = await prisma.origine.count({
    where: whereOrigine,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  const origines = await prisma.origine.findMany({
    where: whereOrigine,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });



  return (
    <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray bg-white">
                 <thead className="text-sm lg:text-base">
                     <tr>
                         <th className="px-4 py-2 text-left">Id</th>
                         <th className="px-4 py-2 text-left">Nom</th>
                         <th className="px-4 py-2 text-left">Image</th>
                         <th className="px-4 py-2 w-40 text-left">Actions</th>
                     </tr>
                 </thead>

                 {
                    Array.isArray(origines) && origines.map((el) => {
                        return (
                            <tbody key={el.id} className="bg-white divide-y divide-gray text-darkgray">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">{el.id}</td>
                                    <td className="px-4 py-2 text-base">{el.title}</td>
                                    <td className="px-4 py-2">
                                      <Image src={`/flag/${el.img}`} alt='flag' width='80' height="15" />
                                    </td>
                                    <td className="px-4 py-2 w-40 space-x-3">
                                        <DeleteOrigine el={el} />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }

            </table>

      {(Array.isArray(origines) && origines.length === 0) && (
        <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
      )}

      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  )
}
