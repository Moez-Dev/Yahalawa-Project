import prisma from "@/lib/db"
import PaginationControls from "../../_components/PaginationControls"
import DeleteUsers from "./DeleteUsers"


export const GetUsers = async ({ query, page }) => {

  const pageSize = 100

  const sortBy = query.sortBy || "createdAt";

  const isDateQuery = !isNaN(Date.parse(query));


  const whereUser = query
  ? {
    AND: [
      {
        role: "FREE",
      },
      {
        OR: [
          {
            email: {
              contains: query,
              mode: 'insensitive',
            }
          },
          {
            name: {
              contains: query,
              mode: 'insensitive',
            }
          },
          ...(isDateQuery
            ? [
              {
                createdAt: {
                  gte: new Date(query),
                  lte: new Date(new Date(query).setHours(23, 59, 59, 999)),
                },
              },
            ]
            : []),
        ]
      }
    ]
  }
: {
    role: "FREE", 
  };


  const orderBy = sortBy === "lastLogin" ? { lastLogin: "desc" } : { createdAt: "desc" };

  const totalItems = await prisma.user.count({
    where: whereUser,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  const users = await prisma.user.findMany({
    where: whereUser,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy,
    include: {
      accounts: true,
    },
  });


      //Date format
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };



  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray bg-white">
        <thead className="text-sm lg:text-base">
          <tr>
            <th className="px-4 py-2 w-64 text-left">Name</th>
            <th className="px-4 py-2 w-72 text-left">Email</th>
            <th className="px-4 py-2 w-40 text-left">Provider</th>
            <th className="p-2 w-40 text-left">Date d'inscription</th>
            <th className="p-2 w-40 text-left">Dernière connexion</th>
            <th className="px-4 py-2 w-40 text-center">Action</th>
          </tr>
        </thead>

        {
          Array.isArray(users) && users.map((el) => (
            <tbody key={el.id} className="bg-white text-base divide-y divide-gray text-darkgray">
              <tr>
                <td className="px-4 py-2 w-64">{el.name}</td>
                <td className="px-4 py-2 w-72">{el.email}</td>
                <td className="px-4 py-2 w-40">
                  {el.accounts.map(i => i.provider === "google" && <span className="red-badge text-white">Google</span>)}
                  {el.accounts.map(i => i.provider === "facebook"  && <span className="bleu-badge text-white">Facebook</span>)}
                  {el.accounts.length === 0  && <span className="yellow-badge text-white">Email</span>}
                </td>
                <td className="p-2 text-sm text-left">{formatDate(el.createdAt)}</td>
                <td className="p-2 text-sm text-left">{el.lastLogin && formatDate(el.lastLogin)}</td>
                <td className="px-4 py-2 w-40 text-center">
                  <DeleteUsers el={el} />
                </td>
              </tr>
            </tbody>
          ))
        }
      </table>

      {(Array.isArray(users) && users.length === 0) && (
        <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
      )}

      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  )
}
