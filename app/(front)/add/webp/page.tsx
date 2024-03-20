'use client'

import React, { useState } from 'react';
import { storage } from '../../../../lib/firebase-config';
import { ref, uploadBytes } from "firebase/storage";

const Page = () => {
    const [userImageSrc, setUserImageSrc] = useState<string>('');
    const [webpImageSrc, setWebpImageSrc] = useState<string>('');
    const [filename, setFilename] = useState('');

    async function convertImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files;
        if (file && file.length > 0) {
            const src = URL.createObjectURL(file[0]);
            setUserImageSrc(src);
            setFilename(file[0].name);
            await convertToWebp(src,file[0].name);
        }
    }

    async function convertToWebp(src,fil) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const userImage = new Image();
            userImage.src = src;

            userImage.onload = async () => {
                const maxWidth = 800; // Set maximum width for resizing
                const maxHeight = 600; // Set maximum height for resizing

                let width = userImage.width;
                let height = userImage.height;

                // Resize image if it exceeds maximum dimensions
                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    } else {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(userImage, 0, 0, width, height);

                // Convert the resized image to WebP format with compression and quality adjustment
                const webpImage = canvas.toDataURL('image/webp', 0.8); // Adjust quality (0-1)
                setWebpImageSrc(webpImage);
                // The timestamp -> Date.now() makes the file unique in firease storage.
                const storageRef = ref(storage, `images/${fil.slice(0, fil.lastIndexOf('.'))}_${Date.now()}.webp`);
                await uploadBytes(storageRef, dataURLtoBlob(webpImage));

                // Trigger download
                const downloadLink = document.createElement('a');
                downloadLink.href = webpImage;
                downloadLink.download = fil.slice(0, fil.lastIndexOf('.')) + '.webp';
                ()=> downloadLink.click();
            };
        }
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                name="convert"
                id="userImage"
                onChange={convertImage}
                className="mb-4"
            />
             {userImageSrc && (
                <div className="w-full md:w-3/4 lg:w-1/2 border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <div className="bg-gray-300 p-4">
                        <h2 className="text-lg font-bold mb-2">Original Image</h2>
                        <img src={userImageSrc} alt="Uploaded Image" id="Uimage" className="w-full" />
                    </div>
                </div>
            )}
            {webpImageSrc && (
                <div className="w-full md:w-3/4 lg:w-1/2 border border-gray-300 rounded-lg overflow-hidden shadow-md mt-4">
                    <div className="bg-gray-400 p-4">
                        <h2 className="text-lg font-bold mb-2">Webp Image</h2>
                        <img src={webpImageSrc} alt="Converted Image" id="Wimage" className="w-full" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;

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