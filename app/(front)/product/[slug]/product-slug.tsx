// 'use client'

import React from 'react'
import data from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import productService from '@/lib/services/productService'
import AddToCart from '@/components/products/AddtoCart'
import { convertDocToObj } from '@/lib/utils'


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
///


export default async function ProductDetails({ params,} : {params : {slug: string}}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return <div>Product not found</div>
  }
  return (
        <>

          <div className="my-2">
            <Link href="/">back to productss</Link>
          </div>

          {/* <div className="grid md:grid-cols-4 md:gap-3 bg-blue-300 ">
            <div className="md:col-span-1  p-2">
            <img
              className="w-[100%] rounded-lg "
              src={product.image}
              height={300}
              width={400}
              alt=""
            />
            <div className='h-[4em]'>
            <button type="button" >
              Click me
              <input type="file" placeholder="Enter text" />
            </button>
            </div>

            </div>
            <div className='text-center'>
              <ul className="space-y-4">
                <li>
                  <h1 className="text-xl">{product.name}</h1>
                </li>
                <li>
                {product.rating} of {product.numReviews} reviews
                </li>
                <li> {product.brand}</li>
                <li>
                  <div className="divider"></div>
                </li>
                <li>
                  Description: <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div>
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

                          qty: 0,
                          color: 'new',
                          size: '',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
        </>
      )
    }