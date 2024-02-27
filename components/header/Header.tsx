import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
   <nav>
    <div className='navbar justify-between bg-base-300'>
        <Link href="/" className='btn btn-ghost text-lg'>
            Next Amazona V2
        </Link>
        <ul className='flex'>
            <li>
                <Link className='btn btn-ghost rounded-btn' href='/cart'>
                    Cart
                </Link>
            </li>
            <li>
                <Link className='btn btn-ghost rounded-btn' href='/Signin'>
                    Sign in
                </Link>
            </li>

        </ul>
    </div>
   </nav>
   </header>
  )
}

export default Header
