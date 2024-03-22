'use client'

import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

import axios from 'axios';
import { useRouter } from 'next/navigation';

function DigitalStoreForm() {
    const [localemail, setLocalemail] = useState('')
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
        user: localStorage.getItem('id')
      });
      console.log(res.data); // Log the response data
      // Reset the form after successful submission
    //   setFormData({
    //     Name: '',
    //     Address: '',
    //     zip: '',
    //     City: ''
    //   });
      // Redirect to a success page or any other page after successful submission
    //   router.push('/success'); // Change '/success' to the desired success page route
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error, show toast message, etc.
    }
  };

  // Rest of the component remains the same


//   const formSubmit: SubmitHandler<Inputs> = async (form) => {
//     const { name, email, password } = form

//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       })
//       if (res.ok) {
//         return router.push(
//           `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
//         )
//       } else {
//         console.log('error')
//         const data = await res.json()
//         throw new Error(data.message)
//       }
//     } catch (err: any) {
//       const error =
//         err.message && err.message.indexOf('E11000') === 0
//           ? 'Email is duplicate'
//           : err.message
//       toast.error(error || 'error')
//     }
//   }
// useEffect(() => {
//     if (localStorage.getItem('email')) {
//         setLocalemail(localStorage.getItem('email'))
//     }

// })

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className='h-[3em] m-2 bg-pink-600 flex fex-row justify-around'>
          {/* <button>Manage</button> */}
          <button className='bg-blue-400 p-3 rounded-lg'>Create</button>
          <button className='bg-blue-400 p-3 rounded-lg'>Create</button>

      </div>
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DigitalStoreForm;
