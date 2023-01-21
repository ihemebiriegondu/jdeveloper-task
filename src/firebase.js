// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLK3p4MRp_tk9E_ZeBdApuiNGwCPh4adY",
    authDomain: "jdeveloper-task.firebaseapp.com",
    projectId: "jdeveloper-task",
    storageBucket: "jdeveloper-task.appspot.com",
    messagingSenderId: "473524099976",
    appId: "1:473524099976:web:f10fb993e1b6e4da96b83d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getFirestore(app)

export default app; 