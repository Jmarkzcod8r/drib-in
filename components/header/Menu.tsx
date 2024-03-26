'use client'
import useCartService from '@/lib/hooks/useCartStore'
// import useLayoutService from '@/lib/hooks/useLayout'
import { signIn, signOut, useSession } from 'next-auth/react'

import Link from 'next/link'
// import router from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
// import { SearchBox } from './SearchBox'

import { useRouter } from 'next/navigation'


const Menu = () => {

const router = useRouter()
  const { items, init } = useCartService()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState('')
  const [stores, setStores] = useState<string[]>([]);

  const [storelenth, setStoreslength] = useState(0)


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

  const [reloadOnce, setReloadOnce] = useState(false);

  useEffect(() => {
    setStoreslength(stores.length)
    if (session) {
      console.log(session)
    }
    const getUser = localStorage.getItem('name')
    if (getUser) {
      setUser(getUser)
    }
    const storedStores = localStorage.getItem('stores');
    storedStores ? setStores(storedStores.split(',')) : [];
    // if( storedStores !== undefined) { return storedStores}

      // if (getUser && stores.length === 0) {
      //   window.location.reload()
      // }
      // Using this can set an infinite re-render
    // if (!reloadOnce) {
      // Reload the page once
      // setReloadOnce(true);
      // window.location.reload();
  // }

    // Mounted here is used to identify if the page has loaded completely
    setMounted(true)
  }, [session,stores.length ]) //--> making it like this `}, [session])` seems to resolve my issue of stores in the dropdown

  const handleChange = (e) => {
    const selectedStore = e.target.value;
    router.push(`/store/store?name=${selectedStore && mounted?selectedStore:''}`);

};

const CustomDropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
      setSelectedOption(option);
  };

  return (
      <div className="relative">
        <div className='min-w-[10em] flex justify-end'>
          <button className="block appearance-none  bg-gray-300 border hover:border-gray-400 px-4 py-2 pr-8 rounded shadow" onClick={() => setSelectedOption(selectedOption === 'open' ? '' : 'open')}>
              {selectedOption ? selectedOption : 'Select a store'}
              <svg className="fill-current h-4 w-4 absolute right-0 top-0 mt-3 mr-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M14.293 7.293a1 1 0 0 0-1.414 1.414L10 11.414l-2.879-2.88a1 1 0 1 0-1.414 1.414l3.586 3.585a1 1 0 0 0 1.414 0l3.586-3.585a1 1 0 0 0 0-1.414z"/>
              </svg>
          </button>
          </div>
          {selectedOption === 'open' && (
              <div className="absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5 flex flex-col">
                  {options.map((option, index) => (

                      <Link href={`/store/store?name=${option}`} key={index} target="_blank" className='bg-pink-300 mb-2 p-2 rounded-md z-10 w-auto'>
                          {/* <a onClick={() => handleOptionSelect(option)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> */}
                            {option}

                            {/* </a> */}
                      </Link>
                  ))}
              </div>
          ) }
      </div>
  );
};

  return (
    <>
      <div className="hidden md:block">
        {/* <SearchBox /> */}
      </div>
      <div>
        <ul className="flex items-stretch">
          <li>
          {/* <div className="btn btn-ghost rounded-btn" >asd
          </div> */}
        {/* <button className="inline-block relative btn-ghost rounded-btn  bg-gray-300">
        <select
            id="storesDropdown"
            onChange={handleChange}
            className="block appearance-none w-full bg-gray-300 border hover:border-gray-400 px-4 py-2 pr-8 rounded shadow"
        >
            <option value="">Select a store</option>
            {stores.map((store, index) => (
                    <option key={index} value={store}>{store}</option>
                ))}

        </select>



    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.293 7.293a1 1 0 0 0-1.414 1.414L10 11.414l-2.879-2.88a1 1 0 1 0-1.414 1.414l3.586 3.585a1 1 0 0 0 1.414 0l3.586-3.585a1 1 0 0 0 0-1.414z"/></svg>
    </div>
</button> */}
      {stores.length === 0 ? <div></div> : <CustomDropdown options={stores} />}


          </li>

          {/* {stores[0]} */}
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

                    {/* <li onClick={handleClick}>
                      <Link href="/order-history">Order history </Link>
                    </li> */}
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