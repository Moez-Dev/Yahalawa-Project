'use client'

import { useFormStatus } from "react-dom"
import { CircleCheck } from "lucide-react"

const ApprovalBtn = () => {

    const { pending } = useFormStatus()

    return (
        <>
        <button type="submit" disabled={pending} className="py-3 w-40 mt-6 yahalawa-btn">
            {pending
                ?
                <div className="flex items-center space-x-1">
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                    <span>تسجيل</span>
                </div>
                :
                <div className="flex items-center justify-center">
                    <CircleCheck className="size-4 mr-2" />
                    <span>موافق</span>
                </div>
            }
        </button>
        </>
    )
}

export default ApprovalBtn