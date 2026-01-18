// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5nwiDPQEAOdRhMaPk1pVTbPZfwaT4G7M",
  authDomain: "eco-racer-326a9.firebaseapp.com",
  projectId: "eco-racer-326a9",
  storageBucket: "eco-racer-326a9.firebasestorage.app",
  messagingSenderId: "159065584702",
  appId: "1:159065584702:web:cc86ca6047f76bc9494d6f",
  measurementId: "G-DF0CFWTQX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);