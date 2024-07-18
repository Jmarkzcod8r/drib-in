'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Store {
  _id: string; // Use string for _id if it's an ObjectId
  name: string;
  // Add other properties of the store object if needed
}

interface CategoryListProps {
  category: string;
  setShowstore: React.Dispatch<React.SetStateAction<string>>; // Add type for setShowstore
}

const CategoryList: React.FC<CategoryListProps> = ({ category, setShowstore }) => {
  const [storeList, setStoreList] = useState<Store[]>([]);

  const getStoreCatList = async () => {
    try {
      const response = await axios.post<{ stores: Store[] }>(`/api/category/${category}`, {
        category: category,
      });
      setStoreList(response.data.stores);
      console.log('Response for catlist:', response);
    } catch (err) {
      console.error('Error fetching store list:', err);
    }
  };

  useEffect(() => {
    if (category) {
      getStoreCatList();
    }
  }, [category]);

  return (
    <div className='bg-pink-100 w-full md:w-[180px] rounded-md p-4 mt-1 mr-1 md:flex'>
      <fieldset className="border border-gray-300 p-4 w-full">
        <legend className="px-2 text-sm text-gray-600">{category}</legend>
        {storeList.map((store) => (
          <button
            key={store._id}
            className='bg-slate-400 px-4 py-2 rounded-md m-1'
            onClick={() => setShowstore(store._id)}
          >
            <h3>{store.name}</h3>
          </button>
        ))}
      </fieldset>
    </div>
  );
};

export default CategoryList;
