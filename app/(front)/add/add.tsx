'use client'

import React, { useState } from 'react';

const AddProductForm: React.FC<{ onSubmit: (formData: any) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    image: '',
    price: '',
    brand: '',
    rating: '',
    numReviews: '',
    countInStock: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // You can reset the form fields here if needed
    setFormData({
      name: '',
      slug: '',
      category: '',
      image: '',
      price: '',
      brand: '',
      rating: '',
      numReviews: '',
      countInStock: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col bg-blue-400 gap-3 p-4 rounded-lg'>
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>NAME:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>SLUG:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="slug"
          type="text"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
        />
      </div> */}
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>IMAGE:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="image"
          type="file"
          accept="image/*"
          multiple // Enable multi-file upload
          // onChange={handleImageChange}
        />
      </div>
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>CATEGORY:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="category"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>PRICE:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="price"
          type="text"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>BRAND:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="brand"
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>RATING:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="rating"
          type="text"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div> */}
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>NUMBER OF REVIEWS:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="numReviews"
          type="text"
          placeholder="Number of Reviews"
          value={formData.numReviews}
          onChange={handleChange}
        />
      </div> */}
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>COUNT IN STOCK:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="countInStock"
          type="text"
          placeholder="Count in Stock"
          value={formData.countInStock}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className='bg-white text-blue-400 py-2 px-4 rounded-md hover:bg-blue-200 transition duration-300 self-center'
      >
        Submit
      </button>
    </form>
  );
};

const MyComponent: React.FC = () => {
  const handleSubmit = (formData: any) => {
    // Handle form submission, e.g., sending data to server
    console.log('Form data:', formData);
  };

  return (
    <div>
      <AddProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default MyComponent;
