import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
        <p className='mb-2 text-accent-foreground'>Go to the home plage by clicking bellow 👇 </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href={"/"} 
            className='flex items-center justify-center bg-primary text-white mt-2 border-2 rounded-md px-4 py-2 border-none hover:bg-primary/80 transition-colors'>
              <ArrowLeft className='w-4 h-4 mr-2'/>
              Back to Dashboard
          </Link>
        </div>
        <div className="mt-12 text-center">
          <p  className="text-sm text-muted-foreground">
            If you beleive this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage