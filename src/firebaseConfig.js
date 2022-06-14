// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVcLw-f_kLTL-6gZl22OENK0hRvUEiBXA",
  authDomain: "fir-basics-45b45.firebaseapp.com",
  projectId: "fir-basics-45b45",
  storageBucket: "fir-basics-45b45.appspot.com",
  messagingSenderId: "462283871582",
  appId: "1:462283871582:web:9612a9e46be9003089ebcf",
  measurementId: "G-QT6Z68FB15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
const analytics = getAnalytics(app);
