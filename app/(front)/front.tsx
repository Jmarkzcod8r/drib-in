
import ProductItem from '@/components/products/ProductItem'
// import data from '@/lib/data'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Swal from 'sweetalert2';
// import { useEffect } from 'react'
import ShowallProducts from './allProducts'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';


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
  const allProducts = await productService.getAll()
  const latestProducts = await productService.getLatest(7)
  const sampleProducts = [{name:'productt1', color:'red', price:20, image:'../../public/images/brownies.jpeg'},{name:'productt2', color:'gray',price:206, image:''}]


  const categoryImages = [

    // { src: '/categories/petshop.png', alt: 'Brownies' },
    { src: '/categories/coffee-shop.jpg', alt: 'Coffee Shop', link:'Coffee Shop' },
    { src: '/categories/bkzt_6m4b_221020.jpg', alt: 'Bakery' , link:'Bakery' },
    { src: '/categories/Flowers2.png', alt: 'floral-shop' , link:'Floral Shop' },
    { src: '/categories/Pet-shop.png', alt: 'pet-shop' , link:'Pet Shop'  },
    { src: '/categories/electronics-shop-2.1.png', alt: 'Electronics' , link:'Electronics' },
    { src: '/categories/WELLNESS.png', alt: 'Wellness' , link:'Wellness' },

  ];

  const plainProducts = allProducts.map(product => ({
    name: product.name,
    slug: product.slug,
    category: product.category,
    image: product.image,
    otherimages: product.otherimages || [], // Handle empty arrays
    price: product.price,
    brand: product.brand,
    rating: product.rating,
    numReviews: product.numReviews,
    countInStock: product.countInStock,
    description: product.description,
    isFeatured: product.isFeatured,
    banner: product.banner,
}));




  return (
    <>
    <div className='bg-black-200'>

      <div className="w-full carousel rounded-box mt-4 bg-pink-400 z-0">
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
               {/*  <Search/> */} {/* This component utilizes `use client` which is contained only for its use */}

               <div className='flex flex-row gap-2 justify-start pb-1 '>

      <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md w-full">Categories</h4>

      </div>


                <div className='card  h-auto bg-base-700 shadow-xl p-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4' draggable='true'>
      {categoryImages.map((image, index) => (
      <Link key={index} href={`/category/cat?name=${image.link}`}>
      <button className="hover:scale-125  h-full" >
        <div className="flex justify-center items-center">
          <figure className="text-sm p-2">
            <Image
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={10000}
              height={10000}
              className=""
            />
          </figure>
        </div>
      </button>
    </Link>

      ))}
    </div>


      <div className='flex flex-row gap-2 justify-start pb-1 '>
        {/* Justify-end is like having an anchor on the right side and justify-start on the left*/}
      <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md w-full">Latest Products</h4>
      {/* <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md">Products</h4>
      <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md">About</h4> */}

      </div>
      {/* <img src={brownies} className='h-[10em]' alt='Brownies'></img> */}

      <div className=" grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {/* {sampleProducts.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))} */}
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}

      </div>


      <div className='flex flex-row gap-2 justify-start pb-1 mt-5'>
        {/* Justify-end is like having an anchor on the right side and justify-start on the left*/}
      <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md w-full">All Products</h4>
      {/* <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md">Products</h4>
      <h4 className="text-sm sm:text-md md:text-lg py-2 bg-blue-400 p-4 rounded-md">About</h4> */}

      </div>

      <ShowallProducts allProducts={plainProducts}/>

    </div>
    </>
  )
}