import prisma from "@/lib/db"
import PaginationControls from "../../_components/PaginationControls"
import EditIngredient from "./EditIngredient"
import DeleteIngredient from "./DeleteIngredient"

export const GetIngredient = async ({ query, page }) => {

  const pageSize = 100

  const whereIngredient = query
  ? {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          type: {
            contains: query,
            mode: 'insensitive',
          },
        }
      ]
    }
  : {};


  const totalItems = await prisma.ingredients.count({
    where: whereIngredient,
  });


  const totalPages = Math.ceil(totalItems / pageSize);

  const ingredients = await prisma.ingredients.findMany({
    where: whereIngredient,
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
                         <th className="px-4 py-2 text-left">Type</th>
                         <th className="px-4 py-2 w-40 text-left">Actions</th>
                     </tr>
                 </thead>

                 {
                    Array.isArray(ingredients) && ingredients.map((el) => {
                        return (
                            <tbody key={el.id} className="bg-white text-base divide-y divide-gray text-darkgray">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">{el.id}</td>
                                    <td className="px-4 py-2">{el.title}</td>
                                    <td className="px-4 py-2">{el.type}</td>
                                    <td className="px-4 py-2 w-40 flex items-center space-x-3">
                                        <EditIngredient el={el} />
                                        <DeleteIngredient el={el} />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }

            </table>

      {(Array.isArray(ingredients) && ingredients.length === 0) && (
        <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
      )}

      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  )
}
