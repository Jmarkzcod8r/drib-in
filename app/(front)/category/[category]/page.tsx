'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CatList from '../components/categorylist';
import Showproducts from '../components/showproducts';
import ShowProducts from '../components/showproducts';

const CategoryList = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get('name') || ''; // by putting an 'or' into '' which is an empty string, we solve the error of null
    const [showstore, setShowstore] = useState('gfxcg');
  const [currentCategory, setCurrentCategory] = useState('');


  return (
    <div className='flex flex-col md:flex-row w-full bg-pink-100 rounded-md'>
    <CatList category={category} setShowstore={setShowstore} />
    <ShowProducts showstore={showstore} />
  </div>

  );
}

export default CategoryList;

