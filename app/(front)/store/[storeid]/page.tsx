'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const name = searchParams.get('name')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        {/* Add your search component here */}
      </div>
    </div>
  )

}