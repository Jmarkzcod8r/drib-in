'use client'

import React from 'react'
import Link from 'next/link'
import Menu from './Menu'
import Menumid from './Menumid'
import { useSearchParams } from 'next/navigation'



const Header = () => {
  const searchParams = useSearchParams()

  const name = searchParams.get('name')

  return (
    <header>
   <nav>
    <div className='navbar justify-between bg-base-300 '>
        <Link
        // href={'/'}
        href={name? `/store/store?name=${name}` : '/'}
        className='btn btn-ghost text-lg sm:block '>
        <h1> {name? name : 'GensanShop'}</h1>
        {/* <h1> GensanSweets</h1> */}
        </Link>
        {/* <Menumid/> */}
        {/* <div className='flex items-center'>
        <h1> {name? name : ''}</h1></div> */}



       <Menu/>
    </div>
   </nav>
   </header>
  )
}

export default Header
