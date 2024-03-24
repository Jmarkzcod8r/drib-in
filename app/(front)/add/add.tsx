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

const [name, setName] = useState(null)
const [filename, setFilename]= useState('')
const [imglist, setImglist] = useState([])

const searchParams = useSearchParams()

  const store = searchParams.get('store')

const folderRef = ref(storage, "images/");

const uploadFile = (image) => {
  if (image == null) return;
  listAll(folderRef).then((response) => {
    console.log("current response: ", response);
    // response.items.forEach((item, index) => {
      // console.log("loc: ", item._location.path_);

      // const deleteRef = ref(storage, item._location.path_);
      // deleteObject(deleteRef);
    // });
  });
  try {
    if (image) {
      console.log('this is image',image.width)




      const imageRef = ref(storage, `images/${image.name + v4()}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setCurrentpic(url);
          setPhotoref(url);
          console.log("this url: ",url)



          // handleUpload();
        });
      });


    }




  } catch (err) {
    console.log(err)
  }

};

const handleUpload = async () => {
  const Mongoupload = async (url) => {
  //   if (image) {
  //     // Send a POST request to your backend API endpoint to save the photo reference to MongoDB
  //     try {
  //         const response = await axios.post(`/api/addPPhoto`, {
  //             name: !name ? image.name : name,
  //             slug: !name ? makeslug(image.name) : makeslug(name),
  //             category: 'Shirts',
  //             image: url,
  //             price: 70,
  //             brand: 'brandz',
  //             otherimages: [],
  //             rating: 4.5,
  //             numReviews: 8,
  //             countInStock: 20,
  //             description: 'A popular shirt',
  //             isFeatured: true,
  //             banner: '/images/Gensanshop.png',
  //         });
  //         console.log(response.data);
  //         // Throw a success message on the client side
  //         alert('Image uploaded');
  //     } catch (error) {
  //         console.error(error);
  //     }
  // }

  }

  await convertToWebp(photoref,image?.name);
};

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    image: '',
    price: '',
    brand: '',
    rating: '',
    numReviews: '',
    countInStock: '',
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
    setFormData({
      name: '',
      slug: '',
      category: '',
      image: '',
      price: '',
      brand: '',
      rating: '',
      numReviews: '',
      countInStock: '',
    });
  };

  useEffect(() => {
    console.log(image) ;
    console.log(`this is photoref`,photoref)
  })

  const handleName = (event) => {
    setName(event.target.value);
  };

  async function convertImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file && file.length > 0) {
        const src = URL.createObjectURL(file[0]);
        // setUserImageSrc(src);
        // setFilename(file[0].name);
        setPhotoref(src);
        setImage(file[0]) ;
        // await convertToWebp(src,file[0].name);
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
            setPhotoref(webpImage);
            // The timestamp -> Date.now() makes the file unique in firease storage.
            const storageRef = ref(storage, `images/${fil.slice(0, fil.lastIndexOf('.'))}_${Date.now()}.webp`);
            await uploadBytes(storageRef, dataURLtoBlob(webpImage)).then((snapshot) => {
              getDownloadURL(snapshot.ref).then(async(url) => {
                // // setCurrentpic(url);
                setPhotoref(url);
                // Mongoupload(url)
                if (image) {
                  // Send a POST request to your backend API endpoint to save the photo reference to MongoDB
                  try {
                      const response = await axios.post(`/api/addPPhoto`, {
                          name: !name ? image.name : name,
                          slug: !name ? makeslug(image.name) : makeslug(name),
                          category: 'Shirts',
                          image: url,
                          price: formData.price? formData.price : 37,
                          brand: 'brandz',
                          otherimages: [],
                          store: store? store: '',
                          rating: 4.5,
                          numReviews: 8,
                          countInStock: 20,
                          description: 'A popular shirt',
                          isFeatured: true,
                          banner: '/images/Gensanshop.png',
                      });
                      console.log(response.data);
                      // Throw a success message on the client side
                      alert('Image uploaded');
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
              <div className='flex justify-center'>
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
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>NAME:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="name"
          type="text"
          placeholder="Name"
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
        <input
  className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto mb-4'
  type="file"
  multiple
  placeholder='01'
  onChange={convertImage}

    //       onChange={
    //         (event) => {
    //         if (event.target.files && event.target.files.length > 0) {
    //           const selectedFile = event.target.files[0];
    //           const fileSizeInBytes = selectedFile.size;
    //           const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    //           console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`);
    //           // This saves our pic to firebase Storage
    //           uploadFile(selectedFile)
    //           // This shows our pic in the front-end
    //           setImage(selectedFile);
    //         } else {
    //           console.log("No file selected");
    //           // Handle the case when no file is selected
    //         }

    //          if (event.target && event.target.files && event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     if (e.target) {
    //       const image = document.createElement('img');
    //       image.src = e.target.result as string;

    //       image.onload = () => {
    //         const width = image.width;
    //         const height = image.height;
    //         console.log('Width:', width);
    //         console.log('Height:', height);
    //       };
    //     }
    //   };

    //   reader.readAsDataURL(file);
    // } else {
    //   console.log("No file selected");
    // }
    //        }

          //  } />
          />
      </div>
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>CATEGORY:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="category"
          type="text"
          placeholder="Category"
          value={formData.category}
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
      <div className='flex flex-row items-center'>
        <p className='mr-4 text-white'>BRAND:</p>
        <input
          className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
          id="brand"
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>
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
          placeholder="Count in Stock"
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