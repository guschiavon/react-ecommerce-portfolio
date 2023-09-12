import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  // method to make request to Google for accessToken
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup(); // abstract the user object as it is all we need  
    const userDocRef = await createUserDocumentFromAuth(user) // Async method from firebase.utils to create new user record upon auth
  }
  return (
    <div>     
      <button onClick={logGoogleUser}>Google Sign In</button>
    </div>
  )
}

export default SignIn;