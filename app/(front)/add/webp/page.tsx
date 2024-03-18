'use client'

import React, { useRef } from 'react';
import { storage } from '../../../../lib/firebase-config';
import { ref, uploadBytes } from "firebase/storage";

const YourComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target) {
          const image = new Image();
          image.onload = async () => {
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext('2d');
              if (ctx) {
                // Clear previous content on the canvas
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);

                // Convert canvas content to WebP format
                const webpDataUrl = canvasRef.current.toDataURL('image/webp');
                const webpDataBlob = dataURLtoBlob(webpDataUrl);

                // Save the WebP data to Firebase Storage
                const storageRef = ref(storage, `images/${selectedFile.name.replace(/\.[^/.]+$/, "")}.webp`);
                await uploadBytes(storageRef, webpDataBlob);

                console.log('WebP image uploaded to Firebase Storage');
              }
            }
          };
          image.src = e.target.result as string;
        }
      };

      reader.readAsDataURL(selectedFile);
    } else {
      console.log("No file selected");
      // Handle the case when no file is selected
    }
  };

  // Function to convert data URL to Blob
  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className='flex flex-row items-center'>
      {/* <canvas ref={canvasRef} id='canvas' className='h-[20em] w-auto bg-red-400'></canvas> */}
      <p className='mr-4 text-white'>IMAGE:</p>
      <input
        className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
        type="file"
        placeholder='01'
        onChange={handleFileChange}
      />
    </div>
  );
};

export default YourComponent;
