// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6X4olEwrcC9CCmmvrzUQHjtTS9aYfRaM",
  authDomain: "alumni-7d13e.firebaseapp.com",
  projectId: "alumni-7d13e",
  storageBucket: "alumni-7d13e.firebasestorage.app",
  messagingSenderId: "310461416657",
  appId: "1:310461416657:web:0b4069db2864099395f1f0",
  measurementId: "G-FE0D5P01LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase App Initialized: ", app);

export { auth, db };

