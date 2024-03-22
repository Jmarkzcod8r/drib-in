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
import { useEffect } from 'react'


export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Next Amazona V2',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}

export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()

  // if (typeof window == "undefined") { window.location.reload()}

  return (
    <div className='bg-black-200'>
      <div className="w-full carousel rounded-box mt-4 bg-pink-400">
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/product/${product.slug}`}>
              <img src={product.banner} className="w-full" alt={product.name} />
            </Link>

            <div
              className="absolute flex justify-between transform
               -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide-${
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-row gap-2 justify-start pb-1 '>
        {/* Justify-end is like having an anchor on the right side and justify-start on the left*/}
      <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md w-full">All Products</h4>
      {/* <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md">Products</h4>
      <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md">About</h4> */}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 ">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
        <div className='card bg-base-300 shadow-xl p-1'>
                  <figure className='text-sm w-full'>
            <a href={`/add`} target="_blank" rel="noopener noreferrer">
              <Image
                src={`/images/add.png`}
                alt={`sdasd`}
                // objectFit='cover'
                //So far, I think the grid CSS is better for cards and width and height inside it is best
                // The width and height seems to set the maximum allowable dimensions
                width={2000}
                height={2000}
                className='w-full'
              />
            </a>
          </figure>
        </div>
      </div>
    </div>
  )
}