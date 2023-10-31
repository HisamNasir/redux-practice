import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBim2SLtTFBHgZEzJK9u0x8_nckVZ2E3gs",
  
    authDomain: "redux-onlinestore.firebaseapp.com",
  
    projectId: "redux-onlinestore",
  
    storageBucket: "redux-onlinestore.appspot.com",
  
    messagingSenderId: "184090922353",
  
    appId: "1:184090922353:web:b649d9589b67385e36fad0"
  
  };
  

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
