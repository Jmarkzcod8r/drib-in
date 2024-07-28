"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Search from '../../search';
import axios from 'axios';

import Gensanshop2 from './GensanHomeBIds2.png';
import Gensanshop from './Gensanshop.png';
import ProductItem from '@/components/products/ProductItem';
import ShowAllProducts from '../../allProducts';
import Link from 'next/link';
import CommentPopup from '../../commentpopup/CommentPopup';

const Front = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const targetid = searchParams.get('id');
  const store = searchParams.get('store');
  const [owner, setOwner] = useState(false);
  const [user, setUser] = useState(false);
  const [storeNames, setStoreNames] = useState<string[]>([]);
  const [productslist, setProductslist] = useState<any[]>([]); // any is used for objects
  const [comments, setComments] = useState<any[]>([]); // State for storing comments
  const [storedata, setStoredata] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for managing pop-up

  const [currsection, setCurrsection] = useState('products')

  const fetchData = async () => {
    const userId = localStorage.getItem('id');
    if (userId) {
      try {
        const response = await axios.get(`/api/store/${userId}`);
        console.log('Data:', response.data.store);
        const names = response.data.store.map((store) => store.name);
        console.log('names', names);
        localStorage.setItem('Stores', names);
        if (names.includes(name)) {
          console.log(`${name} is present in the names array.`);
          setOwner(true);
        } else {
          console.log(`${name} is not present in the names array.`);
        }
        setStoreNames(names);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const getCards = async () => {
    try {
      const response = await axios.get(`/api/store/${name}/products`);
      setProductslist(response.data.products.reverse());
      console.log('store products:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${targetid}`);
      setComments(response.data.comments.reverse());
      console.log('comments:', response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    // const getuser = async () => {
    //   const localuser = localStorage.getItem('id');
    //   if (localuser) {
    //     setUser(true);
    //   }
    // };
    fetchData();
    getCards();
    getComments();

    const getStoredata = async () => {
      try {
        const response = await axios.get(`/api/store/${targetid}/data`);

        console.log('storedetails', response.data.store);

        // Check if response.data.store is an array or a single object
        const store = Array.isArray(response.data.store) ? response.data.store : [response.data.store];
        setStoredata(store);
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };


    getStoredata()

    // This empty array stops useEffect from re-renders
  }, [targetid]);

  const plainProducts = productslist.map((product) => ({
    name: product.name,
    slug: product.slug,
    category: product.category,
    image: product.image,
    otherimages: product.otherimages || [],
    price: product.price,
    brand: product.brand,
    rating: product.rating,
    numReviews: product.numReviews,
    countInStock: product.countInStock,
    description: product.description,
    isFeatured: product.isFeatured,
    banner: product.banner,
  }));

  const categoryImages = [
    // { src: '/categories/note.png', alt: 'bulletin', link: 'bakery-shops' },

    { src: '/images/box.png', alt: 'products', link: 'products' },
    // { src: '/categories/Thumb2.png', alt: 'comments', link: 'bakery-shops' },
    { src: '/categories/ABout.png', alt: 'info', link: 'bakery-shops' },
    { src: '/categories/Telephone.jpg', alt: 'contacts', link: 'bakery-shops' },
    // { src: '/categories/Gallery.png', alt: 'photos', link: 'bakery-shops' },
  ];

  const Informations = [
    { label: 'category' , value: 'bakery' },
    { label: 'name' , value: 'JM-Hardware' },
    { label: 'name' , value: 'JM-Hardware' },
  ]

  // const labels = [`category`, `name`, `city`, `zip code`, `Opens`, `Closes`]
  const Contacts = [
    { label: 'email' , value: 'bakery' },
    { label: 'phone' , value: 'JM-Hardware' },
    { label: 'telephone' , value: 'JM-Hardware' },
  ]

  const handleCommentSubmit = async (comment) => {
    try {
      const response = await axios.post('/api/comments', comment);
      if (response.status >= 200 && response.status < 300) {
        console.log('Comment submitted:', response.data);
        setIsPopupOpen(false);
        getComments(); // Refresh comments after submission
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className='min-h-[100rem]'>
      <div className='parent flex items-center justify-between w-full bg-gray-100 p-4'>

</div>

      <button className="banner-placeholder" onClick={() => console.log(name)}>
        <Image src={Gensanshop2} alt="" />
      </button>

      <div>
        <div className='divider text-2xl font-serif text-brown-700'><h1>{name}</h1></div>
        <div>
        {/* <div
            className='flex flex-wrap gap-4'
            style={{ justifyContent: categoryImages.length <= 2 ? 'center' : 'space-between' }}
          > */}
           <div
            className='flex flex-wrap gap-4 justify-center'

          >
            <div className='gap-5 flex'>
                   {categoryImages.map((image, index) => (

              <button
                title={image.alt}
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrsection(image.alt);
                }}
                type="button" // Ensure the button type is "button"
              >
                 {/* <figure key={index} className='text-sm w-full sm:w-auto'> */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  loading='lazy'
                  width={2000}
                  height={2000}
                  className="w-full h-[2em] sm:h-[5em] lg:h-[7em]"
                />
                 {/* </figure> */}
              </button>

          ))} </div>


          </div>
          <div className='divider text-2xl font-serif text-brown-700'></div>
        </div>
      </div>

      {currsection === 'bulletin' ? (
  <div className='Products flex justify-center items-center flex-col'>
    <div className='max-w-[600px] min-h-[300px] w-full bg-violet-200 flex items-center justify-center text-center p-4 rounded-xl shadow-2xl'>
  <p className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>
    Welcome to our bakery, where the aroma of freshly baked goods greets you at the door. We take pride in using only the finest ingredients to create delicious treats that bring joy to every bite. Whether you're here for a warm pastry or a custom cake, our friendly staff is eager to help you find the perfect choice. Each item is crafted with love and attention to detail, ensuring a delightful experience for all. We believe that every visit should feel special, so we invite you to relax and enjoy our cozy atmosphere. Thank you for being part of our bakery family; we can’t wait to serve you!
  </p>
</div>

  </div>
) : ''}

     { currsection ==='comments' ? <div className='Comments flex justify-center flex-col'>

        <button
          className='rounded-sm bg-sky-700 p-4'
          onClick={() => setIsPopupOpen(true)}
        >
          Add a Comment
        </button>

        <div className='comments-section'>
        {comments.map((comment, index) => (
          <div key={index} className='comment-card bg-base-200 p-4 m-2 rounded'>
            <p><strong>User:</strong> {comment.user}</p>
            <p><strong>Comment:</strong> {comment.comment}</p>
            {comment.rating && <p><strong>Rating:</strong> {comment.rating}</p>}
            {comment.pics && comment.pics.length > 0 && (
              <div className='comment-pics'>
                {comment.pics.map((pic, idx) => (
                  <img key={idx} src={pic} alt={`Comment pic ${idx + 1}`} className='max-w-xs' />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      </div> : <div></div> }

      <CommentPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleCommentSubmit}
        target={name}
        targetid={targetid}
        user={'Anonymous'}
      />

      { currsection ==='products' ? <div className='Products flex justify-center flex-col items-center'>

        {/* <Search /> */}
                  <div className='bg-red-400 justify-center flex'>
        <ShowAllProducts allProducts={plainProducts} />
                  </div>
          {owner && (
            <div className='card bg-base-300 shadow-xl p-3 w-full sm:w-[300px] mt-4'>
              <figure className='text-sm w-full'>
                <a href={`/add?store=${name}&id=${targetid}`} rel="noopener noreferrer">Add products
                  {/* <Image
                    src={`/images/add.png`}
                    alt={`Add Product`}
                    width={1000}
                    height={1000}
                    className=''
                  /> */}
                </a>
              </figure>
            </div>
          )}

      </div> : <div></div> }

      {currsection === 'info' ? (
  <div className="Products flex items-center flex-col">
    {Array.isArray(storedata) && storedata.map((info, index) => (
      <div key={index} className="infoboard w-[400px] bg-violet-200 shadow-2xl mt-1 p-5">
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">category</legend>
          <h3 className="text-2xl text-center">{info.category || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">name</legend>
          <h3 className="text-2xl text-center">{info.name || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">address</legend>
          <h3 className="text-2xl text-center">{info.address || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">city</legend>
          <h3 className="text-2xl text-center">{info.city || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">opens</legend>
          <h3 className="text-2xl text-center">{info.opens || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">closes</legend>
          <h3 className="text-2xl text-center">{info.closes || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">days open</legend>
          <h3 className="text-2xl text-center">{info.storedays || '...'}</h3>
        </fieldset>
      </div>
    ))}
  </div>
) : ''}



{currsection === 'contacts' ? (
  <div className="Products flex items-center flex-col">
    {Array.isArray(storedata) && storedata.map((info, index) => (
      <div key={index} className="infoboard w-[400px] bg-violet-200 shadow-2xl mt-1 p-5">
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">email</legend>
          <h3 className="text-2xl text-center">{info.email || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">facebook</legend>
          <h3 className="text-2xl text-center">{info.facebook || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">messenger</legend>
          <h3 className="text-2xl text-center">{info.messenger || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">phone</legend>
          <h3 className="text-2xl text-center">{info.phone || '...'}</h3>
        </fieldset>
        <fieldset className="border border-gray-300 p-4">
          <legend className="px-2 text-sm text-gray-600">telephone</legend>
          <h3 className="text-2xl text-center">{info.telephone || '...'}</h3>
        </fieldset>
      </div>
    ))}
  </div>
) : ''}


      { currsection ==='photos' ? <div className='Products flex justify-center w-full bg-red-600'>
        <div className=' w-[400px]'>
      <fieldset className="border border-gray-300 p-4">
  <legend className="">
    <span className="mx-2 text-sm text-gray-600">Gender</span>
  </legend>
  <h1 className="text-2xl font-bold text-center">Male</h1>
</fieldset>
</div>

      </div> : ''}


            <div>

            </div>

    </div>
  );
}

export default Front;
