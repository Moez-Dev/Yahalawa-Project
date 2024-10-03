'use client'

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner";
import dynamic from 'next/dynamic'
import { deletAdmin } from "@/app/actions/adminAuth";
const Select = dynamic(() => import("react-select"), { ssr: false })


const DeleteForm = ({ admin }) => {

    const { pending } = useFormStatus()
  
    const [selectedOption, setSelectedOption] = useState();
  
    const handleChange = (option) => {
        setSelectedOption(option);
    };

    const handleAction = async (fomData) => {

        if (!selectedOption) {
            return toast.error('Merci de selectionner l\'email')
          }

        await deletAdmin(fomData)
        setSelectedOption('')
        toast.success('Admin supprimé avec succés')
    }

  return (
<form action={handleAction}  className="mt-8">
    
<div className="mt-6">
        <p className="text-sm mb-1 text-[#94a3b8]">Email :</p>
        <Select
          options={admin.map((el, i) => ({
            value: el.email,
            label: el.email,
            id: i
        }))}
          onChange={handleChange}
          value={selectedOption}
          name="email"
          placeholder=""
          className="w-72 md:w-96"
          classNamePrefix="my-react-select"
          isClearable={true}
          components={{ IndicatorSeparator: () => null }}
        />
      </div>

      <div className="text-center mt-10">
        <button type="submit" disabled={pending} className="py-2 w-[200px] yahalawa-btn">
          {pending
            ?
            <div className="flex items-center space-x-1">
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
              <span>Supprimer</span>
            </div>
            :
            'Supprimer'
          }
        </button>
      </div>

</form>
  )
}

export default DeleteForm