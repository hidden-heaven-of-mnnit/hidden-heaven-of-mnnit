// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnJ8ZC_Jhus-WBaPa2bwkZtupWZo2Ynzg",
  authDomain: "hidden-heaven-of-mnnit-94fab.firebaseapp.com",
  projectId: "hidden-heaven-of-mnnit-94fab",
  storageBucket: "hidden-heaven-of-mnnit-94fab.firebasestorage.app",
  messagingSenderId: "750803545130",
  appId: "1:750803545130:web:62bae3529172fe4f03a753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider();
const auth=getAuth();
export const authWithGoogle=async()=>{
    let user=null;
    await signInWithPopup(auth,provider)
    .then((result)=>{
        user=result.user
    })
    .catch((err)=>{
        console.log(err)
    })
    return user
}