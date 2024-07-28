'use client'

import React, { useEffect, useState } from 'react';
import ImageKit from 'imagekit';
// import Image from 'next/image';
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
import { POST } from '@/lib/auth';
import { makeslug } from '@/lib/utils';

import { useSearchParams } from 'next/navigation'


const AddProductForm: React.FC<{ onSubmit: (formData: any) => void }> = ({ onSubmit }) => {


const [image, setImage] = useState<File |  null>(null)
const [photoref, setPhotoref] = useState(``)

const [imagelist, setImagelist] = useState<File |  null>(null)
const [photoreflist, setPhotoreflist] = useState([])

const [name, setName] = useState(null)
const [filename, setFilename]= useState('')
const [imglist, setImglist] = useState([])
const [file, setFile] = useState<File |  null>(null)

const searchParams = useSearchParams()

  const store = searchParams.get('store')
  const storeid = searchParams.get('id')


const handleUpload = async () => {
  if (selectedFile) {
      const fileListArray = Array.from(selectedFile); // Convert FileList to array
      for (let i = 0; i < fileListArray.length; i++) {
          const file = fileListArray[i];
          if (file && store !== null) {
              // Assuming blobtoWebotoFirebase is an asynchronous function
              await blobtoWebotoFirebase(URL.createObjectURL(file), file.name);
          } else {
            alert("Error uploading image: Store required")
          }
      }
  }
};

  const [formData, setFormData] = useState({
    name: '',
    slug: '',

    description:'',
    category: '',
    image: '',
    price: '',
    brand: '',
    rating: '',
    numReviews: '',
    countInStock: '',
    storeid: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // You can reset the form fields here if needed
    // setFormData({
    //   name: '',
    //   slug: '',
    //   category: '',
    //   description: '...',
    //   image: '',
    //   price: '',
    //   brand: '',
    //   rating: '',
    //   numReviews: '',
    //   countInStock: '',
    // });
  };

  useEffect(() => {
    console.log(image) ;
    console.log(`this is photoref`,photoref)
  })

  const handleName = (event) => {
    setName(event.target.value);
  };
                                    // Aside from File there is also Filelist..okay
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  // This is the intitial function for when we put files to input
  async function ImagetoBlob(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files; // file is a list of object/s
    console.log('this is files for input', file?file:'')
    setSelectedFile(file);
    // if (file) {setFile(file) }

    if (file && file.length > 0) {
                  //URL.createObjectURL -> This creates a blob
        const src = URL.createObjectURL(file[0]);

        // console.log(`this is src`, src) // This starts with a blob
        // setUserImageSrc(src);
        // setFilename(file[0].name);
        setPhotoref(src);
        setImage(file[0]) ;
        // await blobtoWebotoFirebase(src,file[0].name);
    }
}

async function blobtoWebotoFirebase(src,fil) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx && store !== '') {
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
            setPhotoref(webpImage);
            // The timestamp -> Date.now() makes the file unique in firease storage.
            const storageRef = ref(storage, `images/${fil.slice(0, fil.lastIndexOf('.'))}_${Date.now()}.webp`);

            await uploadBytes(storageRef, dataURLtoBlob(webpImage)).then((snapshot) => {
              getDownloadURL(snapshot.ref).then(async(url) => {
                // // setCurrentpic(url);
                // setPhotoref(url);
                // Mongoupload(url)
                if (image) {
                  // Send a POST request to your backend API endpoint to save the photo reference to MongoDB
                  try {
                      const response = await axios.post(`/api/addPPhoto`, {
                          name: !name ? image.name : name,
                          slug: !name ? makeslug(image.name) : makeslug(name),
                          category: 'Shirts',
                          image: url,
                          price: typeof formData.price === 'number' ? formData.price : 0 ,
                          brand: 'brandz',
                          otherimages: [],
                          store: store? store: '',
                          storeid: storeid,
                          rating: formData.rating,
                          numReviews: formData.numReviews,
                          countInStock: formData.countInStock,
                          description:  !formData.description ? ' ': formData.description,
                          isFeatured: true,
                          banner: '/images/Gensanshop.png',
                      });


                      if(response.data.success){
                        alert('Image uploaded');
                      } else {
                        alert('Error Uploading image: Store required')
                      }




                  } catch (error) {
                      console.error(error);
                  }
              }

                console.log("this is firebase url: ",url)
              }) } )

            // Trigger download
            // const downloadLink = document.createElement('a');
            // downloadLink.href = webpImage;
            // downloadLink.download = fil.slice(0, fil.lastIndexOf('.')) + '.webp';
            // ()=> downloadLink.click();
        };
    }
}


  return (
    <form onSubmit={handleSubmit} className='flex flex-col bg-blue-400 gap-3 p-4 rounded-lg'>
              {/* <div className='flex justify-center'>

          {photoref && (
            <img
              className=""
              src={photoref}
              height={200}
              width={200}
              alt=""
            />
          )}
        </div>
         */}
         <div className='flex justify-around p-2'>
    {Array.from(selectedFile?selectedFile:[]).map((src, index) => (
        <img
            key={index} // Ensure to provide a unique key for each image
            className=""
            src={URL.createObjectURL(src)}
            height={100}
            width={100}
            alt={`Image ${index}`} // Provide a meaningful alt text
        />
    ))}
</div>

      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>NAME:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="name"
          type="text"
          placeholder="Name"
          multiple
          // value={formData.name}
          onChange={handleName}
        />
      </div>
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>SLUG:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="slug"
          type="text"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
        />
      </div> */}
      <div className='flex flex-row items-center '>
        {/* <canvas id='canvas'></canvas> */}
        <p className='mr-4 text-white'>IMAGE:</p>
        {store ? (
                <input
                    className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
                    id="name"
                    type="file"
                    placeholder="Name"
                    // remove below for single input
                    // multiple

                    onChange={ImagetoBlob}

                />
            ) : (
                <input
                    className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
                    id="name"
                    type="file"
                    multiple
                    onChange={ImagetoBlob}
                />
            )}
      </div>
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>CATEGORY:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="category"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
      </div> */}
       <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>Description:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="description"
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>PRICE:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="price"
          type="text"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>BRAND:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="brand"
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />
      </div> */}
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>RATING:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="rating"
          type="text"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div> */}
      {/* <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>NUMBER OF REVIEWS:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="numReviews"
          type="text"
          placeholder="Number of Reviews"
          value={formData.numReviews}
          onChange={handleChange}
        />
      </div> */}
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>COUNT IN STOCK:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="countInStock"
          type="text"
          placeholder="Type Pre-order for homemade products"
          value={formData.countInStock}
          onChange={handleChange}
        />
      </div>
      {/* <button
        type="submit"
        className='bg-white text-blue-400 py-2 px-4 rounded-md hover:bg-blue-200 transition duration-300 self-center'
      >
        Submit
      </button> */}

      <button onClick={handleUpload} className='bg-white text-blue-400 py-2 px-4 rounded-md hover:bg-blue-200 transition duration-300 self-center'>
        Upload
      </button>


      {/* <button onClick={uploadImage}>Upload Image</button> */}
    </form>
  );
};

const MyComponent: React.FC = () => {
  const handleSubmit = (formData: any) => {
    // Handle form submission, e.g., sending data to server
    console.log('Form data:', formData);
  };

  return (
    <div>
      <AddProductForm onSubmit={handleSubmit} />

      {/* <button onClick={uploadImag}>Upload Image</button> */}
    </div>
  );
};

export default MyComponent;

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
