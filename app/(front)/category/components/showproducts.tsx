import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type ShowProductsProps = {
  showstore: string;
};

const ShowProducts: React.FC<ShowProductsProps> = ({ showstore }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState('none');
  const [showReversed, setShowReversed] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.post(`/api/category/storeproducts`, {
        storeid: showstore,
      });
      setProducts(response.data.products);
      console.log('Response to store products:', response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (showstore) {
      getProducts();
    }
  }, [showstore]);

  // Sort products based on the selected criteria
  let sortedProducts = [...products];

  if (sortOption === 'name') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'countInStock') {
    sortedProducts.sort((a, b) => b.countInStock - a.countInStock);
  }

  // Reverse the sorted products if the view is toggled
  if (showReversed) {
    sortedProducts.reverse();
  }

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const toggleView = () => setShowReversed(!showReversed);

  return (
    <div className='mt-1 w-full'>
      {/* Toggle button for mobile and larger screens */}
      <div className="flex md:hidden mb-4">
        <button
          onClick={toggleView}
          className={`p-2 text-white rounded ${showReversed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition-shadow duration-300`}
        >
          {showReversed ? 'Normal Order' : 'Reverse Order'}
        </button>

        {/* Dropdown for sorting options */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          className=" ml-2 bg-white text-black rounded-sm w-[100px]"
        >
          <option value="none">Sort</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="countInStock">Stock</option>
        </select>
      </div>

      {/* Buttons for larger screens */}
      <div className='hidden md:grid grid-cols-4 gap-4 p-4 w-full'>
        <button
          onClick={toggleView}
          className={`p-2  text-white rounded ${showReversed ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50' : 'bg-green-500 hover:bg-green-600 shadow-green-500/50'} transition-shadow duration-300`}
        >
          {showReversed ? 'Reverse Order' : 'Normal Order'}
        </button>
        <button
          onClick={() => setSortOption('name')}
          className={`p-2 rounded ${sortOption === 'name' ? 'bg-sky-500 text-white scale-110' : 'bg-blue-500 text-white'} transition-all duration-300`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortOption('price')}
          className={`p-2 rounded ${sortOption === 'price' ? 'bg-sky-500 text-white scale-110' : 'bg-blue-500 text-white'} transition-all duration-300`}
        >
          Sort by Price
        </button>
        <button
          onClick={() => setSortOption('countInStock')}
          className={`p-2 rounded ${sortOption === 'countInStock' ? 'bg-sky-500 text-white scale-110' : 'bg-blue-500 text-white'} transition-all duration-300`}
        >
          Sort by Stock Count
        </button>
      </div>

      {/* Mapped product items */}
      <div className='w-full p-3 rounded-md grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 '>
        {sortedProducts.map((product, index) => (
          <div key={index} className='card max-w-[200px] bg-red-200 h-auto shadow-xl p-1 hover:scale-110' draggable='true'>
            <figure className='text-sm w-full'>
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  loading='lazy'
                  width={2000}
                  height={2000}
                  className='w-full max-h-[10em] object-cover'
                />
              </Link>
            </figure>
            <div className='card-body  p-2 rounded-md'>
              <Link href={`/product/prod?slug=${product.slug}`}>
                <p className='card-title text-sm sm:text-md'>
                  {product.name}
                </p>
              </Link>
              <div className='card-actions flex items-center justify-between '>
                <span className='text-sm sm:text-md'>₱rice: {product.price}</span>
              </div>
              <p className=''>Stock: {product.countInStock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
