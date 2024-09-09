// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import App from "../App";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCT6MeuaX5aWaDyY48aRgZ1RWxRfFEsdRY",
authDomain: "vite-contact-70933.firebaseapp.com",
projectId: "vite-contact-70933",
storageBucket: "vite-contact-70933.appspot.com",
messagingSenderId: "944344445861",
appId: "1:944344445861:web:90f66c45330252a9a2ee4c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);