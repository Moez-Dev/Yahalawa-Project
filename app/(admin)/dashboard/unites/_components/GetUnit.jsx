import prisma from "@/lib/db"
import EditUnit from "./EditUnit"
import DeleteUnit from "./DeleteUnit"
import PaginationControls from "../../_components/PaginationControls"

export const GetUnit = async ({ query, page }) => {

  const pageSize = 100

  const whereUnit = query
    ? {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      }
    : {};

  const totalItems = await prisma.unit.count({
    where: whereUnit,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  const units = await prisma.unit.findMany({
    where: whereUnit,
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
            <th className="px-4 py-2 w-40 text-left">Actions</th>
          </tr>
        </thead>

        {
          Array.isArray(units) && units.map((el) => (
            <tbody key={el.id} className="bg-white text-base divide-y divide-gray text-darkgray">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">{el.id}</td>
                <td className="px-4 py-2">{el.title}</td>
                <td className="px-4 py-2 w-40 flex items-center space-x-3">
                  <EditUnit el={el} />
                  <DeleteUnit el={el} />
                </td>
              </tr>
            </tbody>
          ))
        }

      </table>

      {(Array.isArray(units) && units.length === 0) && (
        <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
      )}

      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  )
}
