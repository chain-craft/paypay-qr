// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0cE1Ok7HX8zKCvJG02Oijfq706sGhkYU",
  authDomain: "paypay-qr.firebaseapp.com",
  projectId: "paypay-qr",
  storageBucket: "paypay-qr.appspot.com",
  messagingSenderId: "190902572847",
  appId: "1:190902572847:web:851678edf976a1568373da",
  measurementId: "G-LTF3TSV8JG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };