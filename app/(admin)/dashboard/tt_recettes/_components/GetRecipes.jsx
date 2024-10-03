import prisma from "@/lib/db"
import PaginationControls from "../../_components/PaginationControls"
import Image from "next/image"
import DeleteRecipes from "./DeleteRecipes"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const GetRecipes = async ({ query, page }) => {

    const pageSize = 100


    const whereTips = query
        ? {
            AND: [
                {
                    is_paying: "T-Telecom",
                },
                {
                    OR: [
                        {
                            title: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            is_paying: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            status: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            id_intern: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            category: {
                                some: {
                                    title: {
                                        contains: query,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                    ]
                }
            ]
        }
        : {
            is_paying: "T-Telecom"
        };


    const totalItems = await prisma.recipes.count({
        where: whereTips,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const recipes = await prisma.recipes.findMany({
        where: whereTips,
        orderBy: {
            id: "desc",
          },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            category: true,
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
                        <th className="px-4 py-2 text-left">Id</th>
                        <th className="px-3 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Titre</th>
                        <th className="px-4 py-2 text-left">Catégorie</th>
                        <th className="px-4 py-2 text-left">Difficulté</th>
                        <th className="px-4 py-2 text-left">Auteur</th>
                        <th className="p-2 text-left">Ajoutée le</th>
                        <th className="p-2 text-left">MAJ</th>
                        <th className="px-4 py-2 text-left">Note</th>
                        <th className="px-4 py-2 text-left">IDI</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>

                {
                    Array.isArray(recipes) && recipes.map((el) => {
                        return (
                            <tbody key={el.id} className="bg-white text-base divide-y divide-gray text-darkgray">
                                <tr>
                                    <td className="px-4 py-2 text-left">{el.id}</td>
                                    <td className="px-3 py-2 text-left">
                                        {el.imgPath
                                            ?
                                            <Suspense fallback={<Skeleton className="w-12 h-8" />}>
                                                <Image src={`${el.imgPath}`} alt="img" width='70' height='70' />
                                            </Suspense>
                                            :
                                            <span>&#128683;</span>
                                        }
                                    </td>
                                    <td className="px-4 py-2 text-left">{el.title}</td>
                                    <td className="px-4 py-2 text-left">
                                        {el.category && el.category.map((el) => { return <p key={el.id}>{el.title}</p> })}
                                    </td>
                                    <td className="px-4 py-2 text-left">{el.difficulty}</td>
                                    <td className="px-4 py-2 text-left">Auteur</td>
                                    <td className="p-2 text-sm text-left">{formatDate(el.createdAt)}</td>
                                    <td className="p-2 text-sm text-left">{el.updatedAt && formatDate(el.updatedAt)}</td>
                                    <td className="px-4 py-2 text-left">{el.note && el.note}</td>
                                    <td className="px-4 py-2 text-left">{el.id_intern}</td>
                                    <td className="px-4 py-2 text-left whitespace-nowrap">
                                        {el.status === 'publiée' && <span className='border-2 border-green p-1 rounded-md'>{el.status}</span>}
                                        {el.status === 'non publiée' && <span className='border-2 border-red p-1 rounded-md'>{el.status}</span>}
                                        {el.status === 'brouillon' && <span className='border-2 border-gray p-1 rounded-md'>{el.status}</span>}
                                        {el.status === 'programmée' && <span className='border-2 border-blue p-1 rounded-md'>{el.status}</span>}
                                    </td>
                                    <td className="px-4 py-2 w-32 text-left">
                                        <DeleteRecipes el={el} />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }

            </table>

            {
                (Array.isArray(recipes) && recipes.length === 0) && (
                    <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
                )
            }

            <PaginationControls currentPage={page} totalPages={totalPages} />
        </div >
    )
}
