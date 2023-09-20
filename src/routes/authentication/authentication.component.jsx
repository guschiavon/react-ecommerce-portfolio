// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import './authentication.styles.scss';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Authentication = () => {
  // for the redirect flow, we use useEffect() and invoke a promise in order to get the auth token resulting from the redirect flow; useEffect() runs on the app remount stage and only once due to the empty array 
  // useEffect(() => {
  //   const getResponse = async () => {
  //     const response = await getRedirectResult(auth)
  //     if (response) {        
  //       const userDocRef = await createUserDocumentFromAuth(response.user)
  //     }
  //   };
  //   getResponse().catch(console.error);
  // }, [])
 
 
  return (
    <div className='sign-in-container'>           
      <SignInForm />      
      <SignUpForm />
    </div>
  )
}

export default Authentication;