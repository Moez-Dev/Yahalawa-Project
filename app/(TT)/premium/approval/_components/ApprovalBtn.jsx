'use client'

import { approvedUser } from "@/app/actions/auth"
import { CircleCheck } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"


const ApprovalBtn = ({ userId }) => {

    const router = useRouter()

    const [loading, setLoading] = useState(false)


    const approved = async () => {
        setLoading(true)

        const res = await approvedUser(userId)
        if(res?.message == 'Approved') {
            setLoading(false)
            router.push('/premium/home')
        }
    };

    return (
        <form action={approved}>
        <button type="submit" disabled={loading} className="py-3 w-40 mt-6 yahalawa-btn">
            {loading
                ?
                <div className="flex items-center justify-center space-x-1">
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                    <span>موافق</span>
                </div>
                :
                <div className="flex items-center justify-center">
                    <CircleCheck className="size-4 mr-2" />
                    <span>موافق</span>
                </div>
            }
        </button>
        </form>
    )
}

export default ApprovalBtn