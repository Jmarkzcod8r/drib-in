'use client'
import useCartService from '@/lib/hooks/useCartStore'
// import useLayoutService from '@/lib/hooks/useLayout'
import { signIn, signOut, useSession } from 'next-auth/react'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
// import { SearchBox } from './SearchBox'

const Menu = () => {
  const { items, init } = useCartService()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState('')

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' }),
    localStorage.clear()
    init()
  }

  const { data: session } = useSession()

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


    // Mounted here is used to identify if the page has loaded completely
    setMounted(true)
  }, [])

  return (
    <>
      <div className="hidden md:block">
        {/* <SearchBox /> */}
      </div>
      <div>
        <ul className="flex items-stretch">

          <li>
            {/* <Link className="btn btn-ghost rounded-btn" href="/cart">
              Cart
              {mounted && items.length != 0 && (
                <div className="badge badge-secondary">
                  {items.reduce((a, c) => a + c.qty, 0)}{' '}
                </div>
              )}
            </Link> */}
              <Link className="btn btn-ghost rounded-btn" href="/store">
              Store
              {/* {mounted && items.length != 0 && (
                <div className="badge badge-secondary">
                  {items.reduce((a, c) => a + c.qty, 0)}{' '}
                </div>
              )} */}
            </Link>
          </li>

          {(session && session.user) || user ? (
            // {user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                {/* {session.user.name} */}
                  <label tabIndex={0} className="btn btn-ghost rounded-btn">
                   {session? session.user.name : user}
                   {/* {user} */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
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
                      <Link href="/order-history">Order history </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
                    </li>
                    {/* <li onClick={handleClick}>
                      <Link href="/store">Store</Link>
                    </li> */}
                    <li onClick={handleClick}>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button
                className="btn btn-ghost rounded-btn"
                type="button"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default Menu