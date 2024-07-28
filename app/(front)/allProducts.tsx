'use client';
import React, { useState } from 'react';
import ProductItem from '@/components/products/ProductItem';

const ShowAllProducts = ({ allProducts }) => {
    const [showReversed, setShowReversed] = useState(false);
    const [sortOption, setSortOption] = useState('none');
    const [itemsToShow, setItemsToShow] = useState(14); // Start with 14 items

    const toggleView = () => setShowReversed(!showReversed);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        setItemsToShow(14); // Reset to 14 items when sorting changes
    };

    // Sort products based on the selected criteria
    let sortedProducts = [...allProducts];

    if (sortOption === 'rating') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'price') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'numReviews') {
        sortedProducts.sort((a, b) => b.numReviews - a.numReviews);
    } else if (sortOption === 'countInStock') {
        sortedProducts.sort((a, b) => b.countInStock - a.countInStock);
    } else if (sortOption === 'name') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Reverse the sorted products if the view is toggled
    if (showReversed) {
        sortedProducts.reverse();
    }

    // Determine the products to display based on the current number of items to show
    const productsToDisplay = sortedProducts.slice(0, itemsToShow);

    const handleLoadMore = () => {
        setItemsToShow(itemsToShow + 14); // Show 14 more items
    };

    return (
        <div className=' p-1'>
            {/* Toggle button for mobile and larger screens */}
            <div className="block md:hidden">
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
                    className="p-2 bg-white text-black rounded "
                >
                    <option value="none">Sort Options</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="price">Sort by Price</option>
                    <option value="numReviews">Sort by Reviews</option>
                    <option value="countInStock">Sort by Stock Count</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            {/* Buttons for larger screens */}
            <div className='hidden md:grid grid-cols-4 gap-6 pb-4'>
                <button
                    onClick={toggleView}
                    className={`p-2 text-white rounded ${showReversed ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50' : 'bg-green-500 hover:bg-green-600 shadow-green-500/50'} transition-shadow duration-300`}
                >
                    {showReversed ? 'Reverse Order' : 'Normal Order'}
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
                <button
                    onClick={() => setSortOption('name')}
                    className={`p-2 rounded ${sortOption === 'name' ? 'bg-sky-500 text-white scale-110' : 'bg-blue-500 text-white'} transition-all duration-300`}
                >
                    Sort by Name
                </button>
            </div>

            {/* Mapped product items */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {productsToDisplay.map((product) => (
                    <ProductItem key={product.slug} product={product} />
                ))}
            </div>

            {/* Load More button */}
            {itemsToShow < sortedProducts.length && (
                <button onClick={handleLoadMore} className=" p-2 bg-blue-500 text-white rounded">
                    Load More
                </button>
            )}
        </div>
    );
};

export default ShowAllProducts;
