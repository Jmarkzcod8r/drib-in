// 'use client'

import React from 'react'
import data from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import productService from '@/lib/services/productService'
import AddToCart from '@/components/products/AddtoCart'
import { convertDocToObj } from '@/lib/utils'

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";


export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

// const handleFileChange = (event) => {
//   const fileList = event.target.files;
//   const fileNames = [];

//   for (let i = 0; i < fileList.length; i++) {
//     fileNames.push(fileList[i].name);
//   }

//   console.log("Selected files:", fileNames);
// };


export default async function ProductDetails({ params,} : {params : {slug: string}}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return <div>Product not found</div>
  }
  return (
        <>
          <div className="my-2 flex flex-row">
            <Link href="/"><RiArrowGoBackLine /></Link>
          </div>
          <div className="grid md:grid-cols-3 md:gap-3 bg-blue-100 ">
          <div className="flex flex-row justify-around p-2 relative ">
                {/* Left arrow */}
                <button
                  className=' w-full'
                  // className=" top-1/2 left-0 transform -translate-y-1/2 h-full bg-slate-400"
                  /* onClick={handlePreviousImage} */
                >
                    <FaChevronLeft />
                  {/* Insert your left arrow icon here */}
                  {/* Example: <LeftArrowIcon /> */}
                </button>

                {/* Image */}
                <img
                  className="max-h-[15em] rounded-lg"
                  src={product.image}
                  alt=""
                />

                {/* Right arrow */}
                                  <button
                    className='flex items-center justify-end w-full '
                    /* onClick={handleNextImage} */
                  >
                    {/* Icon */}
                    {/* <div className="flex-shrink-0"> */}
                      <FaChevronRight />
                      {/* Insert your right arrow icon here */}
                      {/* Example: <RightArrowIcon /> */}
                    {/* </div> */}
                    {/* Optional text */}
                    {/* <span>Next</span> */}
                  </button>

              </div>

            <div className='text-center'>
              <ul className="space-y-4">
                <li>
                  <h1 className="text-xl">{product.name}</h1>
                </li>
                <li>
                {product.rating} of {product.numReviews} reviews
                </li>
                {/* <li> {product.brand}</li> */}
                <li>
                  <div className="divider"></div>
                </li>

              </ul>
            </div>

            {/* <div>
              <div className="card  bg-base-300 shadow-xl mt-3 md:mt-0">
                <div className="card-body">
                  <div className="mb-2 flex justify-between">
                    <div>Price</div>
                    <div>${product.price}</div>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </div>
                  </div>
                  {product.countInStock !== 0 && (
                    <div className="card-actions justify-center">
                      <AddToCart
                        item={{
                          ...convertDocToObj(product),
                          // ...product,
                          qty: 0,
                          color: 'new',
                          size: '',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            <div>
              <ul>
            <li>
                  Description: <p>{product.description}</p>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    }