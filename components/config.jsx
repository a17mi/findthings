// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {get, getDatabase, GetDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2MGXDUrTzQHHIVkHgLpLwFAsW0rSPPeQ",
  authDomain: "findthings-674c5.firebaseapp.com",
  databaseURL: "https://findthings-674c5-default-rtdb.firebaseio.com",
  projectId: "findthings-674c5",
  storageBucket: "findthings-674c5.appspot.com",
  messagingSenderId: "108864174193",
  appId: "1:108864174193:web:6148362add69aa3f32c3d0",
  measurementId: "G-D66NNV0X4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize database
export const db = getDatabase(app);