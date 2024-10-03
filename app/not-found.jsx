import Link from 'next/link'
import { ShieldX } from 'lucide-react'

export default function NotFound() {


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex items-center justify-center mb-10'>
        <p className='lg:text-2xl font-bold'> .الصفحة التي تحاول الوصول إليها غير موجودة</p>
        <ShieldX className='text-red ml-2 size-7' />
      </div>
      <Link href="/" className='green-btn'>الرجوع</Link>
    </div>
  )
}