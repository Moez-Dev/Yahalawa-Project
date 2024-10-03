'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

const SearchBar = () => {

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const  handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if(term) {
      params.set('query', term)
      params.set('page', '1')
    }else {
      params.delete('query')
    }
    replace(`${pathName}?${params.toString()}`)
  },300);


  //clear input
  const inputRef = useRef()

  const clearInput = () => {
    handleSearch('')
    inputRef.current.value = ''
  };


  return (
    <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-72 md:w-96 rounded-md border border-gray py-2 px-5 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          ref={inputRef}
        />
        {
        searchParams.get('query') !== null && 
        <span className="absolute top-5 right-2 cursor-pointer" onClick={clearInput}>&#10005;</span>
        }
    </div>
  )
}

export default SearchBar