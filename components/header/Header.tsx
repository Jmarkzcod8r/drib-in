import React from 'react'
import Link from 'next/link'
import Menu from './Menu'
import Menumid from './Menumid'

const Header = () => {
  return (
    <header>
   <nav>
    <div className='navbar justify-between bg-base-300 '>
        <Link href="/" className='btn btn-ghost text-lg hidden sm:block'>
            Next Amazona V2
        </Link>
        <Menumid/>




       <Menu/>
    </div>
   </nav>
   </header>
  )
}

export default Header
