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

  return (
    <div>
      <h1>URL Shortener</h1>
      {shortenedUrl}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      jhbjjj
      <p><a href={shortenedUrl}>{shortenedUrl}</a> </p>
      {shortenedUrl && (
        <p>
          Shortened URL: <a href={originalUrl}>{shortenedUrl}</a>

        </p>
      )}
    </div>
  );
}
