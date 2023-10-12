// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp5YbZKoJizjzJz8QWiuLMm6qAs2BVNog",
  authDomain: "appointmentmanagementsys-1f92a.firebaseapp.com",
  projectId: "appointmentmanagementsys-1f92a",
  storageBucket: "appointmentmanagementsys-1f92a.appspot.com",
  messagingSenderId: "543895316294",
  appId: "1:543895316294:web:2679a095b2f14015b76747",
  measurementId: "G-ZV2DS393LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);