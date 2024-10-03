'use client'

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { checkEmail } from "@/app/actions/auth"

const Check = ( ) => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const [message, setMessage] = useState('')


    useEffect(() => {
        const verifyEmail = async () => {

            const token = searchParams.get('token')
            if (!token) return;
    
            if (token) {
                try {
                    const response = await checkEmail(token); 
                    setMessage(response?.message);
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000);
                } catch (error) {
                    setMessage('Invalid or expired token.');
                }
            }
        }
    
        verifyEmail();
    
    }, []); 
    


    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <h1 className='text-xl'>{message}</h1>
        </div>
    )
}

export default Check