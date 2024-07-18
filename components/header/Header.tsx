// 'use client'

// import React, { useEffect } from 'react'
// import Link from 'next/link'
// import Menu from './Menu'
// import Menumid from './Menumid'
// import { useSearchParams } from 'next/navigation'
// import axios from 'axios'
// import Search from '@/app/(front)/search'
// import Image from 'next/image'



// const Header = ({}) => {
//   const searchParams = useSearchParams()

//   const name = searchParams.get('name')
//   useEffect(()=> {
//     // const dataStores = async() => {
//     //   const response = await axios.post(`/api/store/${localStorage.getItem('email')}/cred`, {
//     //   email:'jasdj'
//     // }) }

//     // dataStores()
//   },[])

//   return (
//     <header>
//    <nav>
//     <div className='navbar justify-between items-center bg-orange-200 '>
//         <Link
//         // href={'/'}
//         href={ '/'}
//         className='btn btn-ghost text-lg sm:block '>
//         {/* <h1> {name? name : 'GensanShop'}</h1> */}
//         <Image
//                     src={'/images/house-small-icon.png'}
//                     alt={''}
//                     loading='lazy'
//                     // objectFit='cover'
//                     //So afr, I think the grid css is better for cards and width and height inside it is best
//                     // The width and height seems to set the maximum allowable dimensions
//                     width={200}
//                     height={200}
//                             // This max-h-yyy is really useful
//                     className='  w-full max-h-[2em]'
//                 />

//         {/* <h1> GensanSweets</h1> */}
//         </Link>
//         {/* <Menumid/> */}
//         {/* <Search/> */}
//         {/* <div className='flex items-center'>
//         <h1> {name? name : ''}</h1></div> */}



//        <Menu />
//     </div>
//    </nav>
//    </header>
//   )
// }

// export default Header


'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Search from '@/app/(front)/search';

import useCartService from '@/lib/hooks/useCartStore'

const CustomDropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="relative ">
      <div className="min-w-[10em] flex justify-end">
        <button
          className="block appearance-none bg-orange-300 border hover:border-gray-400 px-4 py-2 pr-8 rounded shadow"
          onClick={() => setSelectedOption(selectedOption === 'open' ? '' : 'open')}
        >
          {selectedOption ? selectedOption : 'Select a store'}
          <svg
            className="fill-current h-4 w-4 absolute right-0 top-0 mt-3 mr-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M14.293 7.293a1 1 0 0 0-1.414 1.414L10 11.414l-2.879-2.88a1 1 0 1 0-1.414 1.414l3.586 3.585a1 1 0 0 0 1.414 0l3.586-3.585a1 1 0 0 0 0-1.414z" />
          </svg>
        </button>
      </div>
      {selectedOption === 'open' && (
        <div className="absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5 flex flex-col">
          {options.map((option, index) => (
            <Link
              href={`/store/store?name=${option.name}&id=${option.id}`}
              key={index}
              target="_blank"
              className="bg-pink-200 mb-2 p-2 rounded-md z-10 w-auto"
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  const router = useRouter();
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState('');
  const [stores, setStores] = useState<string[]>([]);
  const [storelength, setStoreslength] = useState(0);
  const { data: session } = useSession();

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    localStorage.clear();
    init();
  };

  useEffect(() => {
    setStoreslength(stores.length);
    if (session) {
      console.log(session);
    }
    const getUser = localStorage.getItem('name');
    if (getUser) {
      setUser(getUser);
    }

    const storedStores = localStorage.getItem('storelist');
    if (storedStores) {
      try {
        const parsedStores = JSON.parse(storedStores);
        if (Array.isArray(parsedStores)) {
          setStores(parsedStores);
        } else {
          setStores([]);
        }
      } catch (error) {
        console.error('Failed to parse stores from localStorage:', error);
        setStores([]);
      }
    } else {
      setStores([]); // Set to an empty array if no stores are found
    }

    console.log(stores);
    setMounted(true);
  }, [session]); //--> making it like this `}, [session])` seems to resolve my issue of stores in the dropdown

  const handleChange = (e) => {
    const selectedStore = e.target.value;
    router.push(`/store/store?name=${selectedStore && mounted ? selectedStore : ''}`);
  };

  const handleClick = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  return (
    <div className='parent flex items-center w-full p-4 bg-slate-200'>
      <div className='child2 mx-auto bg-green-600'>
        <Search />
      </div>
      <div className='child3 ml-auto bg-slate-500'>
        <ul className="flex items-center">
          <button className='mr-3 p-2 rounded-lg bg-orange-300'>ver. 1.0</button>
          <li className='hidden sm:block'>
            {stores.length === 0 ? <div></div> : <CustomDropdown options={stores} />}
          </li>
          <li>
            <Link className="btn btn-ghost rounded-btn" href="/store">
              Store
            </Link>
          </li>
          {(session && session.user) || user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost rounded-btn">
                    {session ? session.user.name : user}
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
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                  >
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
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
    </div>
  );
};

const Header = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const router = useRouter();
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState('');
  const [stores, setStores] = useState<string[]>([]);
  const [storelength, setStoreslength] = useState(0);
  const { data: session } = useSession();

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    localStorage.clear();
    init();
  };

  useEffect(() => {
    setStoreslength(stores.length);
    if (session) {
      console.log(session);
    }
    const getUser = localStorage.getItem('name');
    if (getUser) {
      setUser(getUser);
    }

    const storedStores = localStorage.getItem('storelist');
    if (storedStores) {
      try {
        const parsedStores = JSON.parse(storedStores);
        if (Array.isArray(parsedStores)) {
          setStores(parsedStores);
        } else {
          setStores([]);
        }
      } catch (error) {
        console.error('Failed to parse stores from localStorage:', error);
        setStores([]);
      }
    } else {
      setStores([]); // Set to an empty array if no stores are found
    }

    console.log(stores);
    setMounted(true);
  }, [session]); //--> making it like this `}, [session])` seems to resolve my issue of stores in the dropdown

  const handleChange = (e) => {
    const selectedStore = e.target.value;
    router.push(`/store/store?name=${selectedStore && mounted ? selectedStore : ''}`);
  };

  const handleClick = () => {
    ;(document.activeElement as HTMLElement).blur()
  }


  useEffect(() => {
    // const dataStores = async () => {
    //   const response = await axios.post(`/api/store/${localStorage.getItem('email')}/cred`, {
    //   email: 'jasdj'
    // }) }

    // dataStores()
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className='bg-orange-200'>

        <div className='parent grid grid-cols-2 md:grid-cols-3 items-center justify-between w-full p-4'>
          <div className='flex flex-row'>
          <Link
            href={'/'}
            className='child1 btn btn-ghost  sm:block items-center '
          >
            <Image
              src={'/images/house-small-icon.png'}
              alt={''}
              loading='lazy'
              width={200}
              height={200}
              className='w-[2em] max-h-[2em] sm:w-[3em] sm:max-h-[3em]'

            />
          </Link>
          <button className='text-[10px] sm:text-sm rounded-lg px-1 my-2 bg-orange-300'>ver. 1.0</button>
          </div>

       <div className='child2 hidden md:block'>
        <Search />
      </div>

      <div className='child3'>
        <ul className="flex justify-end items-center">



          <li className='hidden md:block'>
            {stores.length === 0 ? <div></div> : <CustomDropdown options={stores} />}
          </li>
          {/* <li>
            <Link className="btn btn-ghost rounded-btn" href="/store">
              Store
            </Link>
          </li> */}
          {(session && session.user) || user ? (

              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                <div className="flex flex-row items-center">
                  <button   onClick={toggleDropdown}>
                    <label
                      tabIndex={0}
                      className="flex flex-row rounded-btn p-3 cursor-pointer"

                    >
                      {session ? session.user.name : user}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 items-center"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </label>
                    </button>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                  >
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link className=" rounded-btn" href="/store">
                        Store
                      </Link>
                    </li>
                    <div className='md:hidden'>
                    <Search />
                    </div>
                    <div className=' md:hidden'>
                    <CustomDropdown options={stores} />
                    </div>

                    <li onClick={handleClick}>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>

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
    </div>

      </nav>
    </header>
  );
};

export default Header;
