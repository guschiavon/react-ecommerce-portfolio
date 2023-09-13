import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  // for the redirect flow, we use useEffect() and invoke a promise in order to get the auth token resulting from the redirect flow; useEffect() runs on the app remount stage and only once due to the empty array 
  useEffect(() => {
    const getResponse = async () => {
      const response = await getRedirectResult(auth)
      if (response) {        
        const userDocRef = await createUserDocumentFromAuth(response.user)
      }
    };
    getResponse().catch(console.error);
  }, [])
  // method to make request to Google for accessToken
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup(); // abstract the user object as it is all we need  
    const userDocRef = await createUserDocumentFromAuth(user) // Async method from firebase.utils to create new user record upon auth
  }
 
  return (
    <div>     
      <button onClick={logGoogleUser}>Google Sign In</button>
      <button onClick={signInWithGoogleRedirect}>Sign In With Redirect</button>
    </div>
  )
}

export default SignIn;