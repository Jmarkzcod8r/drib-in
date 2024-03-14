'use client'

import React, { useState , useEffect } from 'react';
import ImageKit from 'imagekit';
import Image from 'next/image';
import axios from 'axios'
import { storage } from '../../../lib/firebase-config'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

function FileInput() {

  const [fil, setFil] = useState({});

  const handleChange = (event) => {
    const fileList = event.target.files;
    console.log('Selected files:', fileList);
    setFil(fileList);
  };

  const handleChange2 = (event) => {
    const fileList = event.target.files;
    console.log('Selected files:', fileList);
  };

  useEffect(() => {
    console.log(`filzz`,fil[0]);
  }, [fil]); // Adding fil as a dependency to useEffect

  return (
    <div>
      <input id='0' type="file" onChange={handleChange} />
      <input id='1' type="file" onChange={handleChange2} />
    </div>
  );
}

export default FileInput;
