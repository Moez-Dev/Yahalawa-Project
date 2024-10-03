import prisma from "@/lib/db"
import PaginationControls from "../../_components/PaginationControls"
import DeleteTag from "./DeleteTag";
import EditTag from "./EditTag";

export const GetTags = async ({ query, page }) => {

  const pageSize = 100 

  const whereTags = query
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


  const totalItems = await prisma.tags.count({
    where: whereTags,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  const tags = await prisma.tags.findMany({
    where: whereTags,
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
                    Array.isArray(tags) && tags.map((el) => {
                        return (
                            <tbody key={el.id} className="bg-white text-base divide-y divide-gray text-darkgray">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">{el.id}</td>
                                    <td className="px-4 py-2">{el.title}</td>
                                    <td className="px-4 py-2">
                                        <span className={`${el.status === 'Active' ? 'yellow-badge' : 'gray-badge'}`}>{el.status}</span>
                                    </td>
                                    <td className="px-4 py-2 w-40 flex items-center space-x-3">
                                        <EditTag el={el} />
                                        <DeleteTag el={el} />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }

            </table>

      {(Array.isArray(tags) && tags.length === 0) && (
        <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
      )}

      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  )
}
