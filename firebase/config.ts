// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj_UceUBx4OzxrsyxE2muBzaXJfO5JFVE",
  authDomain: "apppagos-e318f.firebaseapp.com",
  projectId: "apppagos-e318f",
  storageBucket: "apppagos-e318f.firebasestorage.app",
  messagingSenderId: "604035090055",
  appId: "1:604035090055:web:25f43676b3a466cb6e1a22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);