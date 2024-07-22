// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("commencing... firebaseAPI");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoCpwp9oblPVacxoWIUmMx3PLoahnypms",
  // apiKey: process.env.Firebase,
  authDomain: "delsa-profiling.firebaseapp.com",
  projectId: "delsa-profiling",
  storageBucket: "delsa-profiling.appspot.com",
  messagingSenderId: "347224768864",
  appId: "1:347224768864:web:ae022f66198a86972d9e05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);