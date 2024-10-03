import prisma from "@/lib/db"
import PaginationControls from "../../_components/PaginationControls"
import DeleteCategory from "./DeleteTag";
import EditCatgeory from "./EditCatgeory";


export const GetCategory = async ({ query, page }) => {

  const pageSize = 100

  const whereCategory = query
  ? {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          status: {
            contains: query,
            mode: 'insensitive',
          },
        }
      ]
    }
  : {};


  const totalItems = await prisma.category.count({
    where: whereCategory,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  const categories = await prisma.category.findMany({
    where: whereCategory,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray bg-white">
                 <thead className="text-sm lg:text-base">
                     <tr>
                         <th className="px-4 py-2 text-left">Id</th>
                         <th className="px-4 py-2 text-left">Titre</th>
                         <th className="px-4 py-2 text-left">Status</th>
                         <th className="px-4 py-2 w-40 text-left">Actions</th>
                     </tr>
                 </thead>

                 {
                    Array.isArray(categories) && categories.map((el) => {
                        return (
                            <tbody key={el.id} className="bg-white text-base divide-y divide-gray text-darkgray">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">{el.id}</td>
                                    <td className="px-4 py-2">{el.title}</td>
                                    <td className="px-4 py-2">
                                        <span className={`${el.status === 'Active' ? 'yellow-badge' : 'gray-badge'}`}>{el.status}</span>
                                    </td>
                                    <td className="px-4 py-2 w-40 flex items-center space-x-3">
                                        <EditCatgeory el={el} />
                                        <DeleteCategory el={el} />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }

            </table>

      {(Array.isArray(categories) && categories.length === 0) && (
        <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
      )}

      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  )
}
