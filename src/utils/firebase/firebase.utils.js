import { initializeApp } from 'firebase/app';
// Import Firebase auth methods
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

// Import Firestore auth methods
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

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

// Provider is instatiated as a class; you can use any provider
const provider = new GoogleAuthProvider();

// Google Sign In parameters according to their documentation
provider.getCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth(); // Doesn't receive parameters as only one auth is required
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // can be used with multiple providers (Google, Facebook, Github, etc...)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

// Instantiate the database to interact with Firestore
export const db = getFirestore();

// Instantiate a method to create a user document in database based on the auth flow
// Must be asynchronous as it needs to wait for the auth response (see sign-in component reference)
// doc() takes three arguments:
// 1. the database in which to create the record (in this case, the Firestore instance)
// 2. the collection where the document must be created
// 3. the document unique identifier (in this case the UID but could also be email, name, etc...)

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  // create a user document reference
  const userDocRef = doc(db, 'users', userAuth.uid);
  // create a user snapshot to validate if exists already or not
  const userSnapshot = await getDoc(userDocRef);
  
  // if user data doesnt exist
  // create / set document with the data from userAuth in my Firebase collection
  if (!userSnapshot.exists()) {
    // abstract user object values
    const { displayName, email } = userAuth;
    // date of record creation
    const createAt = new Date();
    // use setDoc on the 
    try {
      await setDoc(userDocRef, { 
        displayName,
        email,
        createAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  // if user exists, return the user doc reference
  return userDocRef;  
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {  
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
  
}
