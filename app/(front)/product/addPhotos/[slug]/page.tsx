'use client'

// import { useSearchParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// const page = () => {

//     const [image, setImage] = useState<File |  null>(null)
//     const [photoref, setPhotoref] = useState(``)
//     const [selectedFile, setSelectedFile] = useState<FileList | null>(null);


//     const searchParams = useSearchParams()
//     const slug = searchParams.get('slug')
//     const files = searchParams.get('files')
//     console.log('files:', files)



//     async function ImagetoBlob(event: React.ChangeEvent<HTMLInputElement>) {
//         const files = event.target.files;
//         console.log('Selected files:', files);
//         setSelectedFile(files);

//         if (files && files.length > 0) {
//             // Create an array to store file names
//             const fileNames: string[] = [];

//             // Extract file names from the FileList object
//             for (let i = 0; i < files.length; i++) {
//                 fileNames.push(files[i].name);
//             }

//             // Save file names to local storage
//             // localStorage.setItem('selectedFiles', JSON.stringify(fileNames));

//             // Create blob URLs for the first file
//             const src = URL.createObjectURL(files[0]);
//             setPhotoref(src);
//             setImage(files[0]);
//         }
//     }


//     useEffect(() => {
//         // Retrieve selected files from local storage
//         const storedFiles = localStorage.getItem('selectedFiles');
//         if (storedFiles) {
//             const fileNames = JSON.parse(storedFiles);
//             // You can use the file names to re-render or perform any necessary operations
//         }
//     }, []);



//   return (
//     <div className='flex justify-center items-center flex-col'>
//  <div className='bg-green-200 p-2 min-h-[5%] grid grid-cols-4 gap-4 mb-5'>
//     {Array.from(selectedFile?selectedFile:[]).map((src, index) => (
//         <img
//             key={index} // Ensure to provide a unique key for each image
//             className="bg-blue-300 rounded-md"
//             src={URL.createObjectURL(src)}
//             height={150}
//             width={150}
//             alt={`Image ${index}`} // Provide a meaningful alt text
//         />
//     ))}
// </div>

// <div className="relative bg-pink-400 w-[15em] h-[10em] rounded-md">
//     {/* <label htmlFor="fileInput" className="relative cursor-pointer"> */}
//     <div className="absolute bg-red-200 rounded-md py-1 w-full h-full px-2  flex justify-center items-center">
//         <img src="/images/addPhotos.png" alt="Example Image" className='relative'/>
//             {/* Optionally, you can add text or an icon to indicate file selection */}
//             {/* <span>Select Files</span> */}
//         </div>
//         <input
//             className="relative inset-0 opacity-0 cursor-pointer bg-slate-500 z-20 w-full h-full"
//             id="fileInput"
//             type="file"
//             multiple
//             onChange={ImagetoBlob}
//         />

//     {/* </label> */}
// </div>
// <button>Submit </button>


//     </div>
//   )
// }

// export default page



import React, { useEffect, useState } from 'react';
import ImageKit from 'imagekit';
// import Image from 'next/image';
import axios from 'axios'
import { StoreApi } from 'zustand';
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
import { storage } from '@/lib/firebase-config';


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


  const slug = searchParams.get('slug')



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

                if (image) {
                  // Send a POST request to your backend API endpoint to save the photo reference to MongoDB
                  try {
                      const response = await axios.post(`/api/product/addphoto`, {
                                slug: slug ,
                                url: url

                    /*     //   name: !name ? image.name : name,
                        //   slug: !name ? makeslug(image.name) : makeslug(name),
                        //   category: 'Shirts',
                        //   image: url,
                        //   price: formData.price? formData.price : 37,
                        //   brand: 'brandz',
                        //   otherimages: [],
                        //   store: store? store: '',
                        //   rating: 4.5,
                        //   numReviews: 8,
                        //   countInStock: 20,
                        //   description: 'A popular shirt',
                        //   isFeatured: true,
                        //   banner: '/images/Gensanshop.png', */
                      });
                      console.log(response.data);
                      // Throw a success message on the client side
                      alert('Image uploaded');
                  } catch (error) {
                      console.error(error);
                  }
              }

                console.log("this is firebase url: ",url)
                urllist.push(url)
                // return url
              }) } )

            // Trigger download
            // const downloadLink = document.createElement('a');
            // downloadLink.href = webpImage;
            // downloadLink.download = fil.slice(0, fil.lastIndexOf('.')) + '.webp';
            // ()=> downloadLink.click();
        };
    }

    console.log('urllist:', urllist)
}

const [urllist, setUrllist] = useState<string[]>([])

const handleUpload = async () => {
    console.log('handleupload')
    if (selectedFile) {
        const fileListArray = Array.from(selectedFile); // Convert FileList to array
        const urls: string[] = [];
        for (let i = 0; i < fileListArray.length; i++) {
            const file = fileListArray[i];
            if (file) {
                // Assuming blobtoWebotoFirebase is an asynchronous function
                const url = await blobtoWebotoFirebase(URL.createObjectURL(file), file.name);
                if (url !== null && url !== undefined) {
                    urls.push(url); // Push the returned URL to the array
                }
            }
        }
        setUrllist(urls); // Update the state with the array of URLs
        console.log('urllist:', urls)
    }
    console.log('urllist:')

};



  return (
    <form onSubmit={handleSubmit} className='flex flex-col bg-blue-400 gap-3 p-4 rounded-lg'>

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

      <div className='flex flex-row items-center '>
        {/* <canvas id='canvas'></canvas> */}

        {/* {store ? (
                <input
                    className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
                    id="name"
                    type="file"
                    placeholder="Name"
                    onChange={ImagetoBlob}
                />
            ) : ( */}
                <input
                    className='w-[80%] bg-white rounded-md py-1 px-2 ml-auto'
                    id="name"
                    type="file"
                    multiple
                    onChange={ImagetoBlob}
                />
            {/* )} */}
      </div>


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