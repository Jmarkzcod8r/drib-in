'use client'
import useCartService from '@/lib/hooks/useCartStore'
// import useLayoutService from '@/lib/hooks/useLayout'
import { signIn, signOut, useSession } from 'next-auth/react'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { FaHome } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import { HiMiniPhoto } from "react-icons/hi2";
import { RiFeedbackLine } from "react-icons/ri";

// import { SearchBox } from './SearchBox'

const Menumid = () => {
  const { items, init } = useCartService()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState('')

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' }),
    localStorage.clear()
    init()
  }

  const { data: session } = useSession() //-> I guess you can put the session in the useEffect dependency

  // const { theme, toggleTheme } = useLayoutService()

  const handleClick = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  useEffect(() => {
    if (session) {
      console.log(session)
    }
    const getUser = localStorage.getItem('name')
    if (getUser) {
      setUser(getUser)
    }



    setMounted(true)
  }, [])

  return (
    <>

<div>
  <ul className="flex items-stretch sm:hidden">
    <i>
      {mounted && (
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            // checked={theme === 'light'}
            // onChange={toggleTheme}
          />
        </label>
      )}
    </i>

    {(session && session.user) || user ? (
      // {user ? (
      <>
        <li>
          <div className="dropdown dropdown-bottom dropdown-start">
            {/* {session.user.name} */}
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              {/* {session? session.user.name : user} */}
              {/* {user} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {/* Top line */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
                {/* Middle line */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                {/* Bottom line */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52"
            >
              {/* <li>
                <Link href="/order-history">Order History</Link>
              </li> */}


              {/* {session.user.isAdmin && (
                <li onClick={handleClick}>
                  <Link href="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )} */}

              <li onClick={handleClick}>
                <Link href="/">Home </Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/profile">Profile</Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/store">Store</Link>
              </li>
              <li onClick={handleClick}>
                <button type="button" onClick={signoutHandler}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </li>
      </>
    ) : null}
  </ul>

</div>


<div className=' w-[50%] justify-around sm:flex h-auto'>
<Link className='scale-150' title='Home' href="/">
  <FaHome className='scale-150' />
</Link>

{/* <Link className='scale-150' title='Products' href="/products">
  <BsBoxes className='scale-150' />
</Link> */}

<Link className='scale-150' title='Photos' href="/photos">
  <HiMiniPhoto className='scale-150' />
</Link>

{/* <Link className='scale-150' title='Contacts' href="/contacts">
  <IoMdContact className='scale-150' />
</Link> */}

{/* <Link className='scale-150' title='Testimonials' href="/feedback">
  <RiFeedbackLine  className='scale-150' />
</Link> */}

  </div>

    </>
  )
}

export default Menumid