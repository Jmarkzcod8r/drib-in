// pages/index.js
'use client'

// pages/index.js

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('asd');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    // try {
      const response = await axios.post('/api/url-short', { originalUrl });
        setOriginalUrl(response.data.data.originalUrl)
        setShortenedUrl(response.data.data.shortUrl);

    //   if (response.status === 200) {
    //     setShortenedUrl(response.data.shortUrl);
    //     setError('');
    //   } else {
    //     setError(response.data.error);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   setError('Server error');
    // }
  };
  function handleFileUpload(event) {
    const files = event.target.files;
    console.log(files); // This logs a FileList object
    console.log(files.length); // This logs the number of files selected

    // Accessing individual files
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file); // This logs each individual File object
        console.log(file.name); // This logs the name of each file
    }
}

return (
    <div>
        <input type='file' accept='image/*' multiple onChange={handleFileUpload} />
    </div>
);

}
