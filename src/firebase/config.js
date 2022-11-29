// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmRDwbpA3LcRW6S9Ve3I2bD_rUg2mHsno',
  authDomain: 'react-curso-d80d8.firebaseapp.com',
  projectId: 'react-curso-d80d8',
  storageBucket: 'react-curso-d80d8.appspot.com',
  messagingSenderId: '70929598473',
  appId: '1:70929598473:web:6fa73e3d36108ec3ab50d8',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
