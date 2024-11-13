import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyA4A0SMYHRAps6qwbKazr8DKhFt9kePaGo",
  authDomain: "fast-share-5189c.firebaseapp.com",
  projectId: "fast-share-5189c",
  storageBucket: "fast-share-5189c.firebasestorage.app",
  messagingSenderId: "535693902276",
  appId: "1:535693902276:web:0b124ddd116afd4c492491",
  measurementId: "G-FK4CQQ1TXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);




export {app, analytics,auth,createUserWithEmailAndPassword}