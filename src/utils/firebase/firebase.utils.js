import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

// Your web app's Firebase configuration copied from Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJvLW2mJ50y_T4HHH4zRJsLc1m2rXGyAM",
  authDomain: "ecommerce-portfolio-a24e3.firebaseapp.com",
  projectId: "ecommerce-portfolio-a24e3",
  storageBucket: "ecommerce-portfolio-a24e3.appspot.com",
  messagingSenderId: "939983918126",
  appId: "1:939983918126:web:a817326c07680d52163bbf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// Google Sign In parameters according to their documentation
provider.getCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth() // Doesn't receive parameters as only one auth is required
export const signInWithGooglePopup = () => signInWithPopup(auth, provider) // can be used with multiple providers (Google, Facebook, Github, etc...)