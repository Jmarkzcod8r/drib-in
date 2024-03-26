"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

const DeleteButton = ({ slug, prodstore }) => {
    const router = useRouter()
    const [stores, setStores] = useState<string[]>([]);

    useEffect(() => {
        const storesFromLocal = localStorage.getItem('stores');
        const storesArray = storesFromLocal?.split(",") ?? [];
        console.log(`storesArray`, storesArray);
        setStores(storesArray);
    }, []);

    const deleteProd = async () => {
        try {
            const response = await axios.post('/api/product', { slug: slug });
            if (response) {
                router.push(`/store/store?name=${prodstore}`)
                alert ('Product Deleted Successfully')
            }

            console.log('Product deleted successfully');
            // You might want to update the UI or state here after successful deletion
        } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error if deletion fails
        }
    }

    return (
        <div className='rounded-md bg-blue-400'>
            {/* {product.store} */}
            {stores.includes(prodstore) ?
             <button onClick={deleteProd} className='p-5 rounded-md w-[15em]'>Delete</button> :
            ''}

        </div>
    );
}

export default DeleteButton;
