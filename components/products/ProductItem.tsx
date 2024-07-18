import React from 'react'

import { Product } from '@/lib/models/ProductModel' // This is the typescript for products
import Link from 'next/link'
import Image from 'next/image'

const Productitem = ({product} : {product: Product }) => {
  return (
    <div className='card bg-red-200 h-auto bg-base-700 shadow-xl p-1 hover:scale-110' draggable='true'>
        {/* <p>{product.image}</p> */}
        <figure className=' text-sm w-full'>
            <Link  href={`/product/${product.slug}`}>
            {/* <Link  href={`/product/prod?slug=${product.slug}&&store=${product.store}`}> */}
                <Image
                    src={product.image}
                    alt={product.name}
                    loading='lazy'
                    // objectFit='cover'
                    //So afr, I think the grid css is better for cards and width and height inside it is best
                    // The width and height seems to set the maximum allowable dimensions
                    width={2000}
                    height={2000}
                            // This max-h-yyy is really useful
                    className='  w-full max-h-[10em]'
                />


            </Link>
        </figure>
        <div className='card-body  p-2 rounded-md'>
            <Link href={`/product/prod?slug=${product.slug}`}>
                <p className='card-title text-sm sm:text-md'>
                    {product.name}
                </p>
            </Link>
            {/* <p className=''>{product.rating}</p> */}
            <div className='card-actions flex items-center justify-between '>
                <span className='text-sm sm:text-md'>₱rice:  {product.price}</span>

            </div>
            <p className=''>Stock: {product.countInStock}</p>
            {/* <div>Pre-Order </div> */}
        </div>

    </div>
  )
}

export default Productitem
