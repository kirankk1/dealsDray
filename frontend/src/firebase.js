// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dealsdray-6c191.firebaseapp.com",
  projectId: "dealsdray-6c191",
  storageBucket: "dealsdray-6c191.appspot.com",
  messagingSenderId: "965956017513",
  appId: "1:965956017513:web:7daece2337a44f9e1ef1f8",
  measurementId: "G-E336DLREMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { storage }; // Export the storage instance for use in other files
