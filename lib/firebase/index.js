// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-Q9GYNr0EMjr1Fctxyl_WLldtaE_8awo",
  authDomain: "inventori-c977d.firebaseapp.com",
  projectId: "inventori-c977d",
  storageBucket: "inventori-c977d.appspot.com",
  messagingSenderId: "99324239915",
  appId: "1:99324239915:web:3e48de57cfcb6e03994a6e",
  measurementId: "G-S9F5B1RXD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth}