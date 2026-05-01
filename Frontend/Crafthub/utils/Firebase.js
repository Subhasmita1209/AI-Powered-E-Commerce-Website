import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "logincrafthub.firebaseapp.com",
    projectId: "logincrafthub",
    storageBucket: "logincrafthub.firebasestorage.app",
    messagingSenderId: "114433001034",
    appId: "1:114433001034:web:f31b1ca5100504bac548b3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider =new GoogleAuthProvider();
export  { auth, provider };