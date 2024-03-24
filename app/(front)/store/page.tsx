'use client'

import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

import useSWR from 'swr'
import { useRouter } from 'next/navigation';

function DigitalStoreForm() {
    const [user, setUser] = useState(false)
    const [notif, setNotif] = useState(<p> <br></br></p>)
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState<any[]>([]) //-> Setting it like this solve the  issue of type never
                                      // when mapping items



    useEffect(() => {
      const fetchData = async () => {
          const userId = localStorage.getItem('id');
          if (userId) {
              try {
                  const response = await axios.get(`/api/store/${userId}`);
                  console.log('Data:', response.data);
                  setData(response.data.store);
                  setShowForm(false); // Assuming you want to hide the form after fetching data
                  // throw response.data.message
                  // Handle the data here, e.g., set it to state
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          }
      };

      const localuser = localStorage.getItem('id')
      if (!localuser) {setNotif(<div> <a href="/signin" style={{ color: 'blue', textDecoration: 'underline' }}>
      Sign in
    </a> Required to Manage Stores</div>) ;
        setUser(true)
    }

      fetchData();
  }, []); // Make sure to include an empty dependency array to ensure useEffect runs only once


    // const { data: store, error } = useSWR(`/api/store/${payload.userid}`, async (url) => {
    //   try {
    //     // Make a POST request using Axios with the payload
    //     async const response = await axios.get(url, {user: payload.userid } );

    //     // Return the response data
    //     return response.data;
    //   } catch (error) {
    //     // Handle errors
    //     console.log('waiting while in err')
    //     // Now i see that 'throw' throws a  small notification like a pop-up. It throws a pop-up
    //     // throw new Error('Failed to fetch data');
    //   }
    // });

    // const data = async ()


  const router = useRouter();
  // We don't need to pud user here as part of our payload since we will be getting it through
  // localStorage and not in the form
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    zip: '',
    City: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/store/${formData.Name}`, {
        name:formData.Name,
        address: formData.Address,
        zip: formData.zip,
        city: formData.City,
        user: localStorage.getItem('id'),
        banner: 'https://firebasestorage.googleapis.com/v0/b/delsa-profiling.appspot.com/o/images%2FG%20E%20N%20S%20A%20N%20S%20H%20O%20P_1711211136435.webp?alt=media&token=e92a21db-e14e-4bab-a554-afffbfab1c55'
      });
      alert(res.data.message); // Log the response data
    } catch (error) {
      alert( error);
    }
  };

    const handleDelete = async (_id: any, name: string) => {
      // e.preventDefault();
      try {
        const res = await axios.delete(`/api/store/${name}/delete`,
          // {data: {name: name}}
        )
        alert (res.data.message)
      } catch (err) {
        alert(err)
      }
    }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
     {notif}
     <div className='h-[3em] m-2 bg-pink-600 flex fex-row justify-start p-1 gap-x-3'>
        <button className='bg-blue-400 p-3 rounded-lg' onClick={() => setShowForm(false)}>Manage</button>
        <button className='bg-blue-400 p-3 rounded-lg' onClick={() => setShowForm(true)}>Create</button>
      </div>

      {!showForm && data && (
    <div className=' gap-2 flex flex-col'>
        {/* Render your data here */}
        {data.map((item, index) => (
         <div
         key={index}
         className='m-2 flex bg-green-700 justify-between items-center'

       >
         <Link className='flex items-center min-h-20 rounded-md' href={`/store/store?name=${encodeURIComponent(item.name)}`}>
           {/* Render each item */}
           <div className='bg-pink-300 p-2 rounded-md mx-5'>{item?.name || ''}</div>
           {/* <p>Address: {item?.address || ''}</p> */}
           {/* Add more fields as needed */}
         </Link>
         <button
            className='bg-pink-300 p-2 rounded-md mr-5 hover:bg-red-500 transition duration-300 ease-in-out'
            onClick={()=>handleDelete(item._id, item.name)}
          >
            Delete
          </button>

       </div>

        ))}
    </div>
)}

            {/* Your form */}
            {showForm && (
                <div>
                    {/* Your form JSX */}
                </div>
            )}

      { showForm && (
      <div>
      <form onSubmit={handleSubmit} className="p-6 bg-slate-400">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <input type="text" name="Address" value={formData.Address} onChange={handleChange} required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
            zip Code:
          </label>
          <input type="" name="zip" value={formData.zip} onChange={handleChange} required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City:
          </label>
          <input type="text" name="City" value={formData.City} onChange={handleChange} required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button disabled={user? true: false} title={user?'Sign In Required': ''} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
      </div> ) }
    </div>
  );
}

export default DigitalStoreForm;
