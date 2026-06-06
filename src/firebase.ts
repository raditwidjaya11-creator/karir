import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configured from user-provided Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBNt24_ZHW4K48VK6NgENQBUeuAd8wJFqE",
  authDomain: "karir-cce5b.firebaseapp.com",
  projectId: "karir-cce5b",
  storageBucket: "karir-cce5b.firebasestorage.app",
  messagingSenderId: "333009736810",
  appId: "1:333009736810:web:4c4040eda1fd479d546613",
  measurementId: "G-7RJM9E4MT0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
