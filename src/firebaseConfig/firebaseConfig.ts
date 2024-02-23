// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import {getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd6pHwJhiqR9Gsprfc01jZqnzNEMiUdxk",
  authDomain: "managementapp-f54c9.firebaseapp.com",
  projectId: "managementapp-f54c9",
  storageBucket: "managementapp-f54c9.appspot.com",
  messagingSenderId: "1002507048396",
  appId: "1:1002507048396:web:edf0f24b602e54edbc3969",
  measurementId: "G-EFS2B8D0L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider();