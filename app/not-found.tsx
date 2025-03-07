import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className="text-6xl font-bold text-primary mb-4">404</div>
      <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
      <p className='mb-2'>Go to the home plage by clicking bellow 👇 </p>
      <Link href="/" className='mt-2 border-2 rounded-md px-4 py-2 text-l text-emerald-600 border-emerald-600 hover:text-white hover:bg-emerald-600 ease-in'>Home</Link>
    </div>
  )
}

export default NotFoundPage