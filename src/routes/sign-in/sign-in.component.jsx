import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  // method to make request to Google for accessToken
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();    
  }
  return (
    <div>
      Sign In Component
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  )
}

export default SignIn;