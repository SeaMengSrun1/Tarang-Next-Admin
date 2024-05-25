// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0yqEqRplRFY0qCXY4uDhWF3GbHBAwNeo",
  authDomain: "tarang-44f42.firebaseapp.com",
  projectId: "tarang-44f42",
  storageBucket: "tarang-44f42.appspot.com",
  messagingSenderId: "50342769771",
  appId: "1:50342769771:web:f54d541eb3885c672f2d2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
