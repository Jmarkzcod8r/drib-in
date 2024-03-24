"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import Search from '../../search';
import axios from 'axios';

import Gensanshop from './Gensanshop.png'
import ProductItem from '@/components/products/ProductItem';

const Front = () => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const [owner, setOwner] = useState(false)
  const [user, setUser]= useState(false)
  const [storeNames, setStoreNames] = useState<string[]>([]); // This resolve the issue of arument
                                      //type string not assignable to type never.
  const [productslist, setProductslist] = useState<any[]>([])


  const fetchData = async () => {
    const userId = localStorage.getItem('id');
    if (userId) {
        try {
            const response = await axios.get(`/api/store/${userId}`);
            console.log('Data:', response.data.store);

            const names = response.data.store.map((store) => store.name);
            console.log('names', names)
            localStorage.setItem('Stores',names)
            if (names.includes(name)) {
              console.log(`${name} is present in the names array.`);
              setOwner(true);
            } else {
              console.log(`${name} is not present in the names array.`);
            }

            setStoreNames(names);

            // setData(response.data.store);
            // setShowForm(false); // Assuming you want to hide the form after fetching data
            // throw response.data.message
            // Handle the data here, e.g., set it to state
        } catch (error) {
            console.error('Error fetching data:', error);
        }


        try {

          const response = await axios.get(`/api/store/${name}/products`);
          setProductslist(response.data.products)
            console.log('store products:', response.data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
};


  useEffect(() => {
    const getuser = async () => {
      const localuser = localStorage.getItem('id') ;
      if (localuser) {setUser (true)}
    }
    fetchData()
    // storecred()
    // This empty array stops useEfffect from re-renders
  },[])







  return (
    <div>

      <button className="banner-placeholder"
        onClick={()=> [console.log(name)]}
        >
          {/* <input type='file'></input> */}

        <Image
        src={Gensanshop}
        alt=''
       />
      </button>
      {/* Content of the component */}
      <div>
       <Search/>
      </div>
      {/* {latestProducts?.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))} */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          { productslist.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
       {/* { user && name && storeNames.includes(name)? */}
       {owner?
        <div className='card bg-base-300 shadow-xl p-1'>
                  <figure className='text-sm w-full'>
            <a href={`/add?store=${name}`} target="_blank" rel="noopener noreferrer">
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
        </div> : ''}
        {/* // : ''}  */}
               </div>
    </div>
  );
}

export default Front;
