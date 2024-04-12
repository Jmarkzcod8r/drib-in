// "use client"
/* eslint-disable @next/next/no-img-element */
import ProductItem from '@/components/products/ProductItem'
// import data from '@/lib/data'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Swal from 'sweetalert2';
// import { useEffect } from 'react'
import DropdownExample from './options'

import brownies from 'brownies.jpeg'
import axios from 'axios';
import search from './search'
import Search from './search'

// export const metadata: Metadata = {
//   title: process.env.NEXT_PUBLIC_APP_NAME || 'GenShop',
//   description:
//     process.env.NEXT_PUBLIC_APP_DESC ||
//     'Nextjs, Server components, Next auth, daisyui, zustand',
// }

export default async function Front() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest(7)
  const sampleProducts = [{name:'productt1', color:'red', price:20, image:'../../public/images/brownies.jpeg'},{name:'productt2', color:'gray',price:206, image:''}]

  // if (typeof window == "undefined") { window.location.reload()}

  // const getStores = async() => {
  //   try{
  //     const resStores = await axios.get(`api/store/${localStorage.getItem('id')}`)
  //     console.log(`resSores: `, resStores)
  //   } catch (eror) {
  //     console.error
  //   }
  // }

  // useEffect(()=> {
  //   getStores()
  // })


  return (
    <>
    <div className='bg-black-200'>

      <div className="w-full carousel rounded-box mt-4 bg-pink-400 z-0 p-1">
      <img src='/images/JMLinen2.png' className="max-w-full" alt={''} />
      </div>
                <Search/> {/* This component utilizes `use client` which is contained only for its use */}

                <div className="w-full rounded-box mt-4 p-2 bg-pink-400 z-0 grid grid-ccols-2 sm:grid-cols-3">

    <div className=" sm:w-full w-[16em] flex justify-around p-1">
        <Image src='/images/T-shirt.png' alt={''} width={250} height={250} className='rounded-md'/>
    </div>

   <div className='p-3'><DropdownExample/></div>

   <div className='p-2'>
    <h3>First Name</h3>
    <input style={{ display: 'inline-block' }} />

    <h3>Last Name</h3>
    <input style={{ display: 'inline-block' }} />

    <h3>Remarks</h3>
    <textarea style={{ display: 'inline-block' }} />
</div>
</div>

    </div>
    </>
  )
}