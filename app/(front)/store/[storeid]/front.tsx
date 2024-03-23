"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import Search from '../../search';

import Gensanshop from './Gensanshop.png'

const Front = () => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  return (
    <div>
      {/* Placeholder for a banner */}
      <button className="banner-placeholder"
        onClick={()=> [console.log(name)]}
        >

        <Image
        src={Gensanshop}
        alt=''
       />
      </button>
      {/* Content of the component */}
      <div>
       <Search/>
      </div>
    </div>
  );
}

export default Front;
