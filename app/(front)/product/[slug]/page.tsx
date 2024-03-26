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
import Swal from 'sweetalert2'

import { useSearchParams } from 'next/navigation'
import Delete from './Delete'

// export const metadata = {
//   title: 'Sdasdasdadasds'
// }
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



export default async function ProductDetails({ params} : {params : {slug: string}}) {
  const product = await productService.getBySlug(params.slug)


  if (!product) {
    return <div>Product not found</div>
  }



  const handleUploadPics = () => {
    Swal.fire({
        title: 'Upload Pics',
        input: 'file',
        inputAttributes: {
            multiple: 'multiple'
        },
        showCancelButton: true,
        confirmButtonText: 'Upload',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: (files) => {
            // Here you can handle the uploaded files
            console.log(files);
        }
    });
};

  return (
        <>
          <div className="my-2 flex flex-row">
            <Link href="/"><RiArrowGoBackLine /></Link>
          </div>
          <div className="grid md:grid-cols-2 md:gap-3 bg-blue-100 ">
            <div className='flex flex-col'>
            <div className="flex flex-row justify-around p-2 relative ">


                {/* Left arrow */}
                {/* <button
                  className=' w-full'
                >
                    <FaChevronLeft />
                </button> */}

                {/* Image */}
                <img
                  className="max-h-[15em] rounded-lg"
                  src={product.image}
                  alt=""
                />

                {/* Right arrow */}
                                  {/* <button
                    className='flex items-center justify-end w-full '
                  >

                      <FaChevronRight />
                  </button> */}

              </div>
              <div className='inline-block mt-5'>

              {/* {product.otherimages?.map((prod)=>
                 <div className='inline-block mt-5'>{prod}</div>
                )} */}
                </div>
            <div className="flex items-center justify-center ">
              <Delete slug={params.slug} prodstore={product.store}/>
        {/* <Link href={`/product/addPhotos/prod?slug=${params.slug}`}>
                <span>Upload Pics</span>
        </Link> */}
    </div>



              </div>

            <div className='text-center'>
              <ul className="space-y-4">
                <li>
                  <h1 className="text-xl">{product.name}</h1>
                </li>

                {/* <li>
                {product.rating} of {product.numReviews} reviews
                </li> */}
                {/* <li> {product.brand}</li> */}
                <li>
                  <div className="divider"></div>
                </li>
                <li>
                  P {product.price}
                </li>

              {/* </ul> */}
              {/* <div> */}
              {/* <ul> */}
            <li>
                  Description: <p>{product.description}</p>
                </li>
                <li>
                  Stock: <p>{product.countInStock}</p>
                </li>
              </ul>
            {/* </div> */}
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


          </div>
        </>
      )
    }