import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from 'firebase/auth';


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
 
  // measurementId:import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID

  // viteを使用する場合はimport.meta.envをしようする
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
// firebaseSDKの初期化を行い、認証情報を使用できるようにしているgetAuthを使用して。
export const provider = new GoogleAuthProvider();



