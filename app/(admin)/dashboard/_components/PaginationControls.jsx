
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import ScrollToTop from "./ScrollToTop"


const PaginationControls = ({ currentPage, totalPages }) => {

    const prevPage = currentPage > 1 ? currentPage - 1 : 1
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages

    return (
        <div className="flex items-center justify-between rounded-md bg-white p-2 mt-2">
            <div className="w-[25%] flex items-start">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={`?page=${prevPage}`} className={currentPage === 1 && 'pointer-events-none opacity-50'} />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href={`?page=${1}`}>1</PaginationLink>
                        </PaginationItem>

                        {currentPage !== 1 &&
                            <PaginationItem>
                                <PaginationLink className='border-gray' href="#" isActive>
                                    {currentPage}
                                </PaginationLink>
                            </PaginationItem>
                        }

                        {(currentPage !== totalPages && totalPages > 2 && currentPage !== totalPages - 1) &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }

                        {currentPage !== totalPages &&
                            <PaginationItem>
                                <PaginationLink className='border-gray' href={`?page=${totalPages}`}>
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        }

                        <PaginationItem>
                            <PaginationNext href={`?page=${nextPage}`} className={currentPage === totalPages && 'pointer-events-none opacity-50'} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <div className="w-[50%] text-center text-sm font-semibold">page {currentPage} / {totalPages}</div>

            <ScrollToTop />
        </div>
    )
}

export default PaginationControls
