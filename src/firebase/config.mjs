// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_GR36I3qXnntk0EZ-hTn_1Hlp97YFBKI",
  authDomain: "supertest-5b0be.firebaseapp.com",
  projectId: "supertest-5b0be",
  storageBucket: "supertest-5b0be.appspot.com",
  messagingSenderId: "379654191067",
  appId: "1:379654191067:web:f8dfb889b398c94aea19fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)