// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-e1a7e.firebaseapp.com",
  projectId: "mern-auth-e1a7e",
  storageBucket: "mern-auth-e1a7e.appspot.com",
  messagingSenderId: "805710340168",
  appId: "1:805710340168:web:54c6727a1ada8a63b1b87d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);